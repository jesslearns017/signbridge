import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Resend API endpoint
const RESEND_API_URL = 'https://api.resend.com/emails'

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html, text } = await request.json()

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured')
      // In development, just log the email
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 Email (Development Mode):')
        console.log('To:', to)
        console.log('Subject:', subject)
        console.log('Body:', text)
        return NextResponse.json({
          success: true,
          message: 'Email logged (development mode)',
        })
      }
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Send email via Resend
    const emailResponse = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'SignBridge <noreply@signbridge.health>',
        to: [to],
        subject,
        html,
        text,
      }),
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json()
      console.error('Resend API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    const emailData = await emailResponse.json()

    // Audit log
    await supabase.from('audit_logs').insert({
      user_id: user.id,
      action: 'send_email',
      resource_type: 'email',
      resource_id: emailData.id,
      metadata: {
        to,
        subject,
      },
    })

    return NextResponse.json({
      success: true,
      id: emailData.id,
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
