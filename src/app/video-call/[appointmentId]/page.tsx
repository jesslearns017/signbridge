'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/hooks'
import { useVideoCall, useCaptions, useTextToSpeech } from '@/lib/video/hooks'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  PhoneOff,
  MessageSquare,
  Volume2,
  VolumeX,
  Circle,
  Users,
  Settings,
  Maximize,
  Minimize,
  AlertCircle,
} from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export default function VideoCallPage() {
  const params = useParams()
  const router = useRouter()
  const { profile } = useAuth()
  const { toast } = useToast()
  const appointmentId = params.appointmentId as string

  // Video call state
  const {
    callObject,
    participants,
    localParticipant,
    activeSpeaker,
    connectionState,
    error,
    networkQuality,
    initializeCall,
    leaveCall,
    toggleAudio,
    toggleVideo,
    startScreenShare,
    stopScreenShare,
    startRecording,
    stopRecording,
  } = useVideoCall(appointmentId)

  // Captions and text-to-speech
  const { captions, isEnabled: captionsEnabled, enableCaptions, disableCaptions } =
    useCaptions(callObject)
  const { speak, stopSpeaking, isSpeaking } = useTextToSpeech()

  // UI state
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: string; message: string; timestamp: Date }>
  >([])
  const [chatInput, setChatInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const videoContainerRef = useRef<HTMLDivElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Initialize call on mount
  useEffect(() => {
    if (profile) {
      initializeCall()
    }
  }, [profile, initializeCall])

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  // Handle leaving call
  const handleLeaveCall = async () => {
    if (confirm('Are you sure you want to leave this call?')) {
      await leaveCall()
      router.push('/appointments')
    }
  }

  // Handle screen share toggle
  const handleScreenShare = async () => {
    if (isScreenSharing) {
      await stopScreenShare()
      setIsScreenSharing(false)
    } else {
      await startScreenShare()
      setIsScreenSharing(true)
    }
  }

  // Handle recording toggle
  const handleRecording = async () => {
    if (isRecording) {
      await stopRecording()
      setIsRecording(false)
      toast({
        title: 'Recording Stopped',
        description: 'The recording has been saved.',
      })
    } else {
      if (
        confirm(
          'This call will be recorded. All participants will be notified. Continue?'
        )
      ) {
        await startRecording()
        setIsRecording(true)
        toast({
          title: 'Recording Started',
          description: 'This call is now being recorded.',
        })
      }
    }
  }

  // Handle fullscreen toggle
  const handleFullscreen = () => {
    if (!isFullscreen) {
      videoContainerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Handle chat message send
  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    const message = {
      sender: `${profile?.first_name} ${profile?.last_name}`,
      message: chatInput,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, message])
    setChatInput('')

    // Broadcast to other participants (simplified - in production use Daily's chat API)
    // For now, just add to local state
  }

  // Handle text-to-speech for chat message
  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      stopSpeaking()
    } else {
      speak(text)
    }
  }

  // Convert participants Map to array
  const participantsList = Array.from(participants.values())

  // Loading state
  if (connectionState === 'idle' || connectionState === 'joining') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-deaf-navy">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-deaf-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Joining call...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (connectionState === 'error') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-deaf-navy">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Connection Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => router.push('/appointments')}>
              Back to Appointments
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
      ref={videoContainerRef}
      className="h-screen bg-deaf-navy flex flex-col overflow-hidden"
    >
      {/* Network quality indicator */}
      {networkQuality && networkQuality !== 'good' && (
        <div className="bg-yellow-500 text-white px-4 py-2 text-sm text-center">
          <AlertCircle className="w-4 h-4 inline mr-2" />
          {networkQuality === 'low'
            ? 'Poor connection quality - video may be affected'
            : 'Very poor connection - call quality severely affected'}
        </div>
      )}

      {/* Recording indicator */}
      {isRecording && (
        <div className="bg-red-600 text-white px-4 py-2 text-sm text-center flex items-center justify-center gap-2">
          <Circle className="w-3 h-3 fill-white animate-pulse" />
          <span className="font-medium">Recording in progress</span>
        </div>
      )}

      {/* Main video area */}
      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        {/* Video grid */}
        <div className="flex-1 relative">
          <div
            className={`grid gap-4 h-full ${
              participantsList.length <= 1
                ? 'grid-cols-1'
                : participantsList.length <= 2
                ? 'grid-cols-2'
                : participantsList.length <= 4
                ? 'grid-cols-2 grid-rows-2'
                : 'grid-cols-3 grid-rows-2'
            }`}
          >
            {/* Local participant */}
            {localParticipant && (
              <div
                className={`relative bg-black rounded-lg overflow-hidden ${
                  activeSpeaker === localParticipant.session_id
                    ? 'ring-4 ring-deaf-yellow'
                    : ''
                }`}
              >
                <video
                  id="local-video"
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {localParticipant.user_name} (You)
                </div>
                {!localParticipant.audio && (
                  <div className="absolute top-4 right-4">
                    <MicOff className="w-6 h-6 text-red-500" />
                  </div>
                )}
              </div>
            )}

            {/* Remote participants */}
            {participantsList
              .filter((p) => !p.local)
              .map((participant) => (
                <div
                  key={participant.session_id}
                  className={`relative bg-black rounded-lg overflow-hidden ${
                    activeSpeaker === participant.session_id
                      ? 'ring-4 ring-deaf-yellow'
                      : ''
                  }`}
                >
                  <video
                    id={`video-${participant.session_id}`}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    <span>{participant.user_name}</span>
                    {participant.role === 'interpreter' && (
                      <Users className="w-4 h-4 text-deaf-turquoise" />
                    )}
                  </div>
                  {!participant.audio && (
                    <div className="absolute top-4 right-4">
                      <MicOff className="w-6 h-6 text-red-500" />
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* Live captions */}
          {captionsEnabled && (
            <div className="absolute bottom-20 left-0 right-0 bg-black/90 text-white p-4 mx-4 rounded-lg max-h-32 overflow-y-auto">
              {captions.length > 0 ? (
                captions.map((caption, index) => (
                  <p key={index} className="text-lg mb-1">
                    {caption}
                  </p>
                ))
              ) : (
                <p className="text-gray-400 italic">
                  Listening for speech...
                </p>
              )}
            </div>
          )}
        </div>

        {/* Chat sidebar */}
        {showChat && (
          <Card className="w-96 flex flex-col h-full">
            <CardContent className="p-4 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Chat
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChat(false)}
                >
                  ✕
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {chatMessages.map((msg, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-semibold text-sm">
                        {msg.sender}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSpeak(msg.message)}
                        className="h-6 w-6 p-0"
                      >
                        {isSpeaking ? (
                          <VolumeX className="w-3 h-3" />
                        ) : (
                          <Volume2 className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm">{msg.message}</p>
                    <span className="text-xs text-gray-500">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Chat input */}
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-deaf-blue">
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Control bar */}
      <div className="bg-deaf-navy border-t border-white/10 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Left controls */}
          <div className="flex items-center gap-2">
            <Button
              onClick={toggleAudio}
              variant={localParticipant?.audio ? 'default' : 'destructive'}
              size="lg"
              className="rounded-full h-14 w-14"
            >
              {localParticipant?.audio ? (
                <Mic className="w-6 h-6" />
              ) : (
                <MicOff className="w-6 h-6" />
              )}
            </Button>
            <Button
              onClick={toggleVideo}
              variant={localParticipant?.video ? 'default' : 'destructive'}
              size="lg"
              className="rounded-full h-14 w-14"
            >
              {localParticipant?.video ? (
                <Video className="w-6 h-6" />
              ) : (
                <VideoOff className="w-6 h-6" />
              )}
            </Button>
          </div>

          {/* Center controls */}
          <div className="flex items-center gap-2">
            <Button
              onClick={handleScreenShare}
              variant={isScreenSharing ? 'default' : 'outline'}
              size="lg"
              className="rounded-full h-12 w-12 bg-white hover:bg-gray-100"
            >
              <MonitorUp className="w-5 h-5 text-deaf-navy" />
            </Button>
            <Button
              onClick={() => setShowChat(!showChat)}
              variant="outline"
              size="lg"
              className="rounded-full h-12 w-12 bg-white hover:bg-gray-100"
            >
              <MessageSquare className="w-5 h-5 text-deaf-navy" />
            </Button>
            <Button
              onClick={captionsEnabled ? disableCaptions : enableCaptions}
              variant={captionsEnabled ? 'default' : 'outline'}
              size="lg"
              className="rounded-full h-12 w-12 bg-white hover:bg-gray-100"
            >
              <span className="text-xl font-bold text-deaf-navy">CC</span>
            </Button>
            {profile?.role === 'provider' && (
              <Button
                onClick={handleRecording}
                variant={isRecording ? 'destructive' : 'outline'}
                size="lg"
                className="rounded-full h-12 w-12 bg-white hover:bg-gray-100"
              >
                <Circle
                  className={`w-5 h-5 ${
                    isRecording ? 'fill-white' : 'text-deaf-navy'
                  }`}
                />
              </Button>
            )}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <Button
              onClick={handleFullscreen}
              variant="outline"
              size="lg"
              className="rounded-full h-12 w-12 bg-white hover:bg-gray-100"
            >
              {isFullscreen ? (
                <Minimize className="w-5 h-5 text-deaf-navy" />
              ) : (
                <Maximize className="w-5 h-5 text-deaf-navy" />
              )}
            </Button>
            <Button
              onClick={handleLeaveCall}
              variant="destructive"
              size="lg"
              className="rounded-full h-14 w-14"
            >
              <PhoneOff className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Participant count */}
        <div className="text-center mt-2">
          <span className="text-white/70 text-sm">
            {participantsList.length + 1} participant
            {participantsList.length !== 0 ? 's' : ''} in call
          </span>
        </div>
      </div>
    </div>
  )
}
