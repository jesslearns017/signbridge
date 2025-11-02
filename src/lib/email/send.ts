import {
  appointmentConfirmationEmail,
  appointmentReminderEmail,
} from './templates'

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  text: string
}

export async function sendEmail(options: SendEmailOptions) {
  try {
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    })

    if (!response.ok) {
      throw new Error('Failed to send email')
    }

    return await response.json()
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

export async function sendAppointmentConfirmation(
  patientEmail: string,
  appointmentData: {
    patientName: string
    providerName: string
    appointmentDate: Date
    appointmentTime: string
    specialty?: string
    needsInterpreter: boolean
    signLanguage?: string
    reason: string
    appointmentId: string
    videoCallUrl: string
  },
  locale: 'en' | 'es' = 'en'
) {
  const { subject, html, text } = appointmentConfirmationEmail(
    appointmentData,
    locale
  )

  return sendEmail({
    to: patientEmail,
    subject,
    html,
    text,
  })
}

export async function sendAppointmentReminder(
  patientEmail: string,
  appointmentData: {
    patientName: string
    providerName: string
    appointmentDate: Date
    appointmentTime: string
    appointmentId: string
    videoCallUrl: string
    needsInterpreter: boolean
    signLanguage?: string
    reason: string
    specialty?: string
  },
  hoursUntil: number,
  locale: 'en' | 'es' = 'en'
) {
  const { subject, html, text } = appointmentReminderEmail(
    appointmentData,
    hoursUntil,
    locale
  )

  return sendEmail({
    to: patientEmail,
    subject,
    html,
    text,
  })
}
