'use client'

import { useEffect, useState, useCallback } from 'react'
import DailyIframe, {
  DailyCall,
  DailyEventObjectParticipant,
  DailyEventObjectActiveSpeakerChange,
  DailyEventObjectNetworkQualityEvent,
} from '@daily-co/daily-js'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/lib/auth/hooks'

export interface Participant {
  session_id: string
  user_id: string
  user_name: string
  role: 'patient' | 'provider' | 'interpreter'
  audio: boolean
  video: boolean
  screen: boolean
  local: boolean
  joined_at: Date
}

export interface VideoCallState {
  roomUrl: string | null
  callObject: DailyCall | null
  participants: Map<string, Participant>
  localParticipant: Participant | null
  activeSpeaker: string | null
  connectionState: 'idle' | 'joining' | 'joined' | 'leaving' | 'error'
  error: string | null
  networkQuality: 'good' | 'low' | 'very-low' | null
}

export function useVideoCall(appointmentId: string) {
  const { user, profile } = useAuth()
  const supabase = createClient()

  const [state, setState] = useState<VideoCallState>({
    roomUrl: null,
    callObject: null,
    participants: new Map(),
    localParticipant: null,
    activeSpeaker: null,
    connectionState: 'idle',
    error: null,
    networkQuality: null,
  })

  // Fetch or create Daily.co room
  const createOrJoinRoom = useCallback(async () => {
    try {
      setState((s) => ({ ...s, connectionState: 'joining' }))

      // Check if room already exists for this appointment
      const { data: session, error: sessionError } = await supabase
        .from('video_sessions')
        .select('*')
        .eq('appointment_id', appointmentId)
        .single()

      let roomUrl: string

      if (sessionError || !session) {
        // Create new Daily.co room
        const response = await fetch('/api/video/create-room', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ appointmentId }),
        })

        if (!response.ok) {
          throw new Error('Failed to create room')
        }

        const data = await response.json()
        roomUrl = data.url

        // Save video session to database
        await supabase.from('video_sessions').insert({
          appointment_id: appointmentId,
          room_url: roomUrl,
          room_name: data.name,
          status: 'active',
        })
      } else {
        roomUrl = session.room_url
      }

      setState((s) => ({ ...s, roomUrl }))

      // Audit log
      if (user) {
        await supabase.from('audit_logs').insert({
          user_id: user.id,
          action: 'join',
          resource_type: 'video_call',
          resource_id: appointmentId,
        })
      }

      return roomUrl
    } catch (error) {
      console.error('Error creating/joining room:', error)
      setState((s) => ({
        ...s,
        connectionState: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      }))
      throw error
    }
  }, [appointmentId, user, supabase])

  // Initialize Daily.co call object
  const initializeCall = useCallback(
    async (containerElement?: HTMLElement) => {
      try {
        const roomUrl = await createOrJoinRoom()

        // Create Daily.co call object
        const callObject = DailyIframe.createCallObject({
          subscribeToTracksAutomatically: true,
        })

        setState((s) => ({ ...s, callObject }))

        // Set up event listeners
        setupEventListeners(callObject)

        // Join the call
        const userName = `${profile?.first_name} ${profile?.last_name} (${profile?.role})`

        await callObject.join({
          url: roomUrl,
          userName,
          videoSource: true,
          audioSource: true,
        })

        setState((s) => ({ ...s, connectionState: 'joined' }))

        return callObject
      } catch (error) {
        console.error('Error initializing call:', error)
        setState((s) => ({
          ...s,
          connectionState: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        }))
        throw error
      }
    },
    [createOrJoinRoom, profile]
  )

  // Event listeners
  const setupEventListeners = (callObject: DailyCall) => {
    // Participant joined
    callObject.on('participant-joined', (event: any) => {
      const participant = mapParticipant(event.participant, false)
      setState((s) => {
        const newParticipants = new Map(s.participants)
        newParticipants.set(event.participant.session_id, participant)
        return { ...s, participants: newParticipants }
      })
    })

    // Participant updated
    callObject.on('participant-updated', (event: any) => {
      const participant = mapParticipant(event.participant, event.participant.local)
      setState((s) => {
        const newParticipants = new Map(s.participants)
        newParticipants.set(event.participant.session_id, participant)

        const localParticipant = event.participant.local ? participant : s.localParticipant

        return {
          ...s,
          participants: newParticipants,
          localParticipant,
        }
      })
    })

    // Participant left
    callObject.on('participant-left', (event: any) => {
      setState((s) => {
        const newParticipants = new Map(s.participants)
        newParticipants.delete(event.participant.session_id)
        return { ...s, participants: newParticipants }
      })
    })

    // Active speaker change
    callObject.on(
      'active-speaker-change',
      (event: DailyEventObjectActiveSpeakerChange) => {
        setState((s) => ({
          ...s,
          activeSpeaker: event.activeSpeaker.peerId || null,
        }))
      }
    )

    // Network quality
    callObject.on(
      'network-quality-change',
      (event: DailyEventObjectNetworkQualityEvent) => {
        const quality = event.threshold
        let networkQuality: 'good' | 'low' | 'very-low' = 'good'

        if (quality === 'low') networkQuality = 'low'
        else if (quality === 'very-low') networkQuality = 'very-low'

        setState((s) => ({ ...s, networkQuality }))
      }
    )

    // Error handling
    callObject.on('error', (event: any) => {
      console.error('Daily.co error:', event)
      setState((s) => ({
        ...s,
        connectionState: 'error',
        error: event.errorMsg || 'Call error occurred',
      }))
    })
  }

  // Helper to map Daily participant to our Participant type
  const mapParticipant = (
    dailyParticipant: any,
    isLocal: boolean
  ): Participant => {
    // Extract role from user name (format: "Name (role)")
    const roleMatch = dailyParticipant.user_name?.match(/\((\w+)\)/)
    const role = roleMatch ? roleMatch[1] : 'patient'

    return {
      session_id: dailyParticipant.session_id,
      user_id: dailyParticipant.user_id || '',
      user_name: dailyParticipant.user_name || 'Unknown',
      role: role as 'patient' | 'provider' | 'interpreter',
      audio: dailyParticipant.audio,
      video: dailyParticipant.video,
      screen: dailyParticipant.screen,
      local: isLocal,
      joined_at: new Date(dailyParticipant.joined_at || Date.now()),
    }
  }

  // Leave call
  const leaveCall = useCallback(async () => {
    if (state.callObject) {
      setState((s) => ({ ...s, connectionState: 'leaving' }))

      // Audit log
      if (user) {
        await supabase.from('audit_logs').insert({
          user_id: user.id,
          action: 'leave',
          resource_type: 'video_call',
          resource_id: appointmentId,
        })
      }

      await state.callObject.leave()
      state.callObject.destroy()

      setState({
        roomUrl: null,
        callObject: null,
        participants: new Map(),
        localParticipant: null,
        activeSpeaker: null,
        connectionState: 'idle',
        error: null,
        networkQuality: null,
      })
    }
  }, [state.callObject, user, appointmentId, supabase])

  // Toggle audio
  const toggleAudio = useCallback(async () => {
    if (state.callObject) {
      const currentAudio = state.localParticipant?.audio
      await state.callObject.setLocalAudio(!currentAudio)
    }
  }, [state.callObject, state.localParticipant])

  // Toggle video
  const toggleVideo = useCallback(async () => {
    if (state.callObject) {
      const currentVideo = state.localParticipant?.video
      await state.callObject.setLocalVideo(!currentVideo)
    }
  }, [state.callObject, state.localParticipant])

  // Start screen share
  const startScreenShare = useCallback(async () => {
    if (state.callObject) {
      await state.callObject.startScreenShare()
    }
  }, [state.callObject])

  // Stop screen share
  const stopScreenShare = useCallback(async () => {
    if (state.callObject) {
      await state.callObject.stopScreenShare()
    }
  }, [state.callObject])

  // Start recording
  const startRecording = useCallback(async () => {
    if (state.callObject) {
      await state.callObject.startRecording()

      // Audit log
      if (user) {
        await supabase.from('audit_logs').insert({
          user_id: user.id,
          action: 'start_recording',
          resource_type: 'video_call',
          resource_id: appointmentId,
        })
      }
    }
  }, [state.callObject, user, appointmentId, supabase])

  // Stop recording
  const stopRecording = useCallback(async () => {
    if (state.callObject) {
      await state.callObject.stopRecording()

      // Audit log
      if (user) {
        await supabase.from('audit_logs').insert({
          user_id: user.id,
          action: 'stop_recording',
          resource_type: 'video_call',
          resource_id: appointmentId,
        })
      }
    }
  }, [state.callObject, user, appointmentId, supabase])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (state.callObject) {
        state.callObject.destroy()
      }
    }
  }, [state.callObject])

  return {
    ...state,
    initializeCall,
    leaveCall,
    toggleAudio,
    toggleVideo,
    startScreenShare,
    stopScreenShare,
    startRecording,
    stopRecording,
  }
}

// Hook for captions (speech-to-text)
export function useCaptions(callObject: DailyCall | null) {
  const [captions, setCaptions] = useState<string[]>([])
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    if (!callObject || !isEnabled) return

    // Use Web Speech API for live captions
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported in this browser')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join(' ')

      setCaptions((prev) => {
        const newCaptions = [...prev, transcript]
        // Keep only last 10 captions
        return newCaptions.slice(-10)
      })
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
    }

    recognition.start()

    return () => {
      recognition.stop()
    }
  }, [callObject, isEnabled])

  const enableCaptions = () => setIsEnabled(true)
  const disableCaptions = () => {
    setIsEnabled(false)
    setCaptions([])
  }

  return {
    captions,
    isEnabled,
    enableCaptions,
    disableCaptions,
  }
}

// Hook for text-to-speech
export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)

  const speak = useCallback((text: string, lang: string = 'en-US') => {
    if (!('speechSynthesis' in window)) {
      console.warn('Text-to-speech not supported in this browser')
      return
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 1.0
    utterance.pitch = 1.0
    utterance.volume = 1.0

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }, [])

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }, [])

  return {
    speak,
    stopSpeaking,
    isSpeaking,
  }
}
