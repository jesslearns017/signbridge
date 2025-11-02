import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Daily.co API endpoint
const DAILY_API_URL = 'https://api.daily.co/v1'

export async function POST(request: NextRequest) {
  try {
    const { appointmentId } = await request.json()

    if (!appointmentId) {
      return NextResponse.json(
        { error: 'Appointment ID is required' },
        { status: 400 }
      )
    }

    // Verify user is authenticated
    const supabase = createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify user has access to this appointment
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', appointmentId)
      .or(`patient_id.eq.${user.id},provider_id.eq.${user.id},interpreter_id.eq.${user.id}`)
      .single()

    if (appointmentError || !appointment) {
      return NextResponse.json(
        { error: 'Appointment not found or access denied' },
        { status: 404 }
      )
    }

    // Check if room already exists
    const { data: existingSession } = await supabase
      .from('video_sessions')
      .select('*')
      .eq('appointment_id', appointmentId)
      .single()

    if (existingSession) {
      return NextResponse.json({
        url: existingSession.room_url,
        name: existingSession.room_name,
      })
    }

    // Create Daily.co room
    const dailyApiKey = process.env.DAILY_API_KEY

    if (!dailyApiKey) {
      console.error('DAILY_API_KEY not configured')
      return NextResponse.json(
        { error: 'Video service not configured' },
        { status: 500 }
      )
    }

    const roomName = `signbridge-${appointmentId}-${Date.now()}`

    const roomResponse = await fetch(`${DAILY_API_URL}/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${dailyApiKey}`,
      },
      body: JSON.stringify({
        name: roomName,
        privacy: 'private',
        properties: {
          // Enable high-quality video for sign language
          enable_chat: true,
          enable_screenshare: true,
          enable_recording: 'cloud',
          max_participants: 10,
          // 60fps for sign language clarity
          video_codec: 'VP9',
          // HIPAA compliance
          enable_people_ui: false,
          enable_prejoin_ui: false,
          enable_network_ui: true,
          // Automatic recording consent
          recordings_bucket: {
            bucket_name: process.env.DAILY_RECORDINGS_BUCKET || '',
            bucket_region: process.env.DAILY_RECORDINGS_REGION || 'us-west-2',
            assume_role_arn: process.env.DAILY_RECORDINGS_ROLE_ARN || '',
          },
        },
      }),
    })

    if (!roomResponse.ok) {
      const errorData = await roomResponse.json()
      console.error('Daily.co API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to create video room' },
        { status: 500 }
      )
    }

    const roomData = await roomResponse.json()

    // Save room to database
    await supabase.from('video_sessions').insert({
      appointment_id: appointmentId,
      room_url: roomData.url,
      room_name: roomData.name,
      status: 'active',
    })

    // Audit log
    await supabase.from('audit_logs').insert({
      user_id: user.id,
      action: 'create',
      resource_type: 'video_room',
      resource_id: appointmentId,
      metadata: {
        room_name: roomData.name,
        room_url: roomData.url,
      },
    })

    return NextResponse.json({
      url: roomData.url,
      name: roomData.name,
    })
  } catch (error) {
    console.error('Error creating room:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
