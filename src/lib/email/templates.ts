import { format } from 'date-fns'

interface AppointmentEmailData {
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
}

export function appointmentConfirmationEmail(
  data: AppointmentEmailData,
  locale: 'en' | 'es' = 'en'
) {
  const {
    patientName,
    providerName,
    appointmentDate,
    appointmentTime,
    specialty,
    needsInterpreter,
    signLanguage,
    reason,
    appointmentId,
    videoCallUrl,
  } = data

  const dateFormatted = format(appointmentDate, 'EEEE, MMMM d, yyyy')

  if (locale === 'es') {
    return {
      subject: `Confirmación de Cita - ${dateFormatted}`,
      html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de Cita</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #0055CC 0%, #00BCD4 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">SignBridge</h1>
    <p style="color: #FFD700; margin: 10px 0 0 0;">Conectando la Atención Médica con la Comunidad Sorda</p>
  </div>

  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #0055CC; margin-top: 0;">Confirmación de Cita</h2>

    <p>Estimado/a ${patientName},</p>

    <p>Su cita médica ha sido confirmada con los siguientes detalles:</p>

    <div style="background: white; padding: 20px; border-left: 4px solid #0055CC; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #0055CC;">Detalles de la Cita</h3>
      <p><strong>Proveedor:</strong> Dr. ${providerName}</p>
      ${specialty ? `<p><strong>Especialidad:</strong> ${specialty}</p>` : ''}
      <p><strong>Fecha:</strong> ${dateFormatted}</p>
      <p><strong>Hora:</strong> ${appointmentTime}</p>
      <p><strong>Motivo:</strong> ${reason}</p>
      ${needsInterpreter ? `<p><strong>Intérprete:</strong> ${signLanguage} (Solicitado)</p>` : ''}
    </div>

    <div style="background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h4 style="margin-top: 0; color: #0055CC;">⏰ Recordatorio Importante</h4>
      <p style="margin: 0;">Por favor únase a la videollamada 5 minutos antes de su hora programada.</p>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${videoCallUrl}" style="background: #0055CC; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Unirse a la Videollamada</a>
    </div>

    <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h4 style="margin-top: 0; color: #856404;">Características de Accesibilidad</h4>
      <ul style="margin: 0; padding-left: 20px;">
        <li>Video de alta calidad (60fps) para claridad de lengua de señas</li>
        <li>Subtítulos en vivo disponibles</li>
        <li>Chat de texto con texto-a-voz</li>
        ${needsInterpreter ? '<li>Intérprete de lengua de señas asignado</li>' : ''}
      </ul>
    </div>

    <p style="margin-top: 30px; color: #666; font-size: 14px;">
      Si necesita cancelar o reprogramar su cita, por favor inicie sesión en su cuenta de SignBridge.
    </p>

    <p style="color: #666; font-size: 14px;">
      ID de Cita: ${appointmentId}
    </p>
  </div>

  <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
    <p>Este es un correo automático. Por favor no responda.</p>
    <p>© 2025 SignBridge. Todos los derechos reservados.</p>
  </div>
</body>
</html>
      `,
      text: `
Confirmación de Cita - SignBridge

Estimado/a ${patientName},

Su cita médica ha sido confirmada:

Proveedor: Dr. ${providerName}
${specialty ? `Especialidad: ${specialty}` : ''}
Fecha: ${dateFormatted}
Hora: ${appointmentTime}
Motivo: ${reason}
${needsInterpreter ? `Intérprete: ${signLanguage} (Solicitado)` : ''}

Por favor únase a la videollamada 5 minutos antes de su hora programada:
${videoCallUrl}

ID de Cita: ${appointmentId}

© 2025 SignBridge
      `,
    }
  }

  // English version
  return {
    subject: `Appointment Confirmation - ${dateFormatted}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #0055CC 0%, #00BCD4 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">SignBridge</h1>
    <p style="color: #FFD700; margin: 10px 0 0 0;">Connecting Healthcare with the Deaf Community</p>
  </div>

  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #0055CC; margin-top: 0;">Appointment Confirmation</h2>

    <p>Dear ${patientName},</p>

    <p>Your medical appointment has been confirmed with the following details:</p>

    <div style="background: white; padding: 20px; border-left: 4px solid #0055CC; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #0055CC;">Appointment Details</h3>
      <p><strong>Provider:</strong> Dr. ${providerName}</p>
      ${specialty ? `<p><strong>Specialty:</strong> ${specialty}</p>` : ''}
      <p><strong>Date:</strong> ${dateFormatted}</p>
      <p><strong>Time:</strong> ${appointmentTime}</p>
      <p><strong>Reason:</strong> ${reason}</p>
      ${needsInterpreter ? `<p><strong>Interpreter:</strong> ${signLanguage} (Requested)</p>` : ''}
    </div>

    <div style="background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h4 style="margin-top: 0; color: #0055CC;">⏰ Important Reminder</h4>
      <p style="margin: 0;">Please join the video call 5 minutes before your scheduled time.</p>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${videoCallUrl}" style="background: #0055CC; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Join Video Call</a>
    </div>

    <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h4 style="margin-top: 0; color: #856404;">Accessibility Features</h4>
      <ul style="margin: 0; padding-left: 20px;">
        <li>High-quality video (60fps) for sign language clarity</li>
        <li>Live captions available</li>
        <li>Text chat with text-to-speech</li>
        ${needsInterpreter ? '<li>Sign language interpreter assigned</li>' : ''}
      </ul>
    </div>

    <p style="margin-top: 30px; color: #666; font-size: 14px;">
      If you need to cancel or reschedule your appointment, please log in to your SignBridge account.
    </p>

    <p style="color: #666; font-size: 14px;">
      Appointment ID: ${appointmentId}
    </p>
  </div>

  <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
    <p>This is an automated email. Please do not reply.</p>
    <p>© 2025 SignBridge. All rights reserved.</p>
  </div>
</body>
</html>
    `,
    text: `
Appointment Confirmation - SignBridge

Dear ${patientName},

Your medical appointment has been confirmed:

Provider: Dr. ${providerName}
${specialty ? `Specialty: ${specialty}` : ''}
Date: ${dateFormatted}
Time: ${appointmentTime}
Reason: ${reason}
${needsInterpreter ? `Interpreter: ${signLanguage} (Requested)` : ''}

Please join the video call 5 minutes before your scheduled time:
${videoCallUrl}

Appointment ID: ${appointmentId}

© 2025 SignBridge
    `,
  }
}

export function appointmentReminderEmail(
  data: AppointmentEmailData,
  hoursUntil: number,
  locale: 'en' | 'es' = 'en'
) {
  const {
    patientName,
    providerName,
    appointmentDate,
    appointmentTime,
    appointmentId,
    videoCallUrl,
  } = data

  const dateFormatted = format(appointmentDate, 'EEEE, MMMM d, yyyy')

  if (locale === 'es') {
    return {
      subject: `Recordatorio: Cita en ${hoursUntil} horas`,
      html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recordatorio de Cita</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #001F3F; margin: 0; font-size: 28px;">⏰ Recordatorio de Cita</h1>
  </div>

  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Estimado/a ${patientName},</p>

    <p>Este es un recordatorio amigable de que tiene una cita en <strong>${hoursUntil} ${hoursUntil === 1 ? 'hora' : 'horas'}</strong>.</p>

    <div style="background: white; padding: 20px; border-left: 4px solid #FFD700; margin: 20px 0;">
      <p><strong>Con:</strong> Dr. ${providerName}</p>
      <p><strong>Fecha:</strong> ${dateFormatted}</p>
      <p><strong>Hora:</strong> ${appointmentTime}</p>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${videoCallUrl}" style="background: #0055CC; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Unirse a la Videollamada</a>
    </div>

    <p style="color: #666; font-size: 14px;">ID de Cita: ${appointmentId}</p>
  </div>

  <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
    <p>© 2025 SignBridge</p>
  </div>
</body>
</html>
      `,
      text: `
Recordatorio de Cita - SignBridge

Estimado/a ${patientName},

Su cita es en ${hoursUntil} ${hoursUntil === 1 ? 'hora' : 'horas'}.

Con: Dr. ${providerName}
Fecha: ${dateFormatted}
Hora: ${appointmentTime}

Unirse: ${videoCallUrl}

ID: ${appointmentId}
      `,
    }
  }

  // English version
  return {
    subject: `Reminder: Appointment in ${hoursUntil} hours`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Reminder</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #001F3F; margin: 0; font-size: 28px;">⏰ Appointment Reminder</h1>
  </div>

  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Dear ${patientName},</p>

    <p>This is a friendly reminder that you have an appointment in <strong>${hoursUntil} ${hoursUntil === 1 ? 'hour' : 'hours'}</strong>.</p>

    <div style="background: white; padding: 20px; border-left: 4px solid #FFD700; margin: 20px 0;">
      <p><strong>With:</strong> Dr. ${providerName}</p>
      <p><strong>Date:</strong> ${dateFormatted}</p>
      <p><strong>Time:</strong> ${appointmentTime}</p>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${videoCallUrl}" style="background: #0055CC; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Join Video Call</a>
    </div>

    <p style="color: #666; font-size: 14px;">Appointment ID: ${appointmentId}</p>
  </div>

  <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
    <p>© 2025 SignBridge</p>
  </div>
</body>
</html>
    `,
    text: `
Appointment Reminder - SignBridge

Dear ${patientName},

Your appointment is in ${hoursUntil} ${hoursUntil === 1 ? 'hour' : 'hours'}.

With: Dr. ${providerName}
Date: ${dateFormatted}
Time: ${appointmentTime}

Join: ${videoCallUrl}

ID: ${appointmentId}
    `,
  }
}
