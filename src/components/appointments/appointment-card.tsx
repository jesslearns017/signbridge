'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Video, Users, Calendar, Clock, MapPin, AlertCircle } from 'lucide-react'
import { format, formatDistance } from 'date-fns'
import { es } from 'date-fns/locale'
import Link from 'next/link'
import type { AppointmentWithDetails } from '@/lib/appointments/hooks'

interface AppointmentCardProps {
  appointment: AppointmentWithDetails
  role: 'patient' | 'provider' | 'interpreter'
  onCancel?: (id: string) => void
  onReschedule?: (id: string) => void
}

export function AppointmentCard({
  appointment,
  role,
  onCancel,
  onReschedule,
}: AppointmentCardProps) {
  const scheduledStart = new Date(appointment.appointment_date)
  const scheduledEnd = new Date(new Date(appointment.appointment_date).getTime() + appointment.duration_minutes * 60000)
  const now = new Date()
  const isUpcoming = scheduledStart > now
  const isToday =
    scheduledStart.toDateString() === now.toDateString()
  const isSoon = isUpcoming && scheduledStart.getTime() - now.getTime() < 15 * 60 * 1000 // 15 minutes

  // Determine status badge color
  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
    no_show: 'bg-orange-100 text-orange-800',
  }

  // Get the display name based on user role
  const getDisplayName = () => {
    if (role === 'patient') {
      return `Dr. ${appointment.provider_profile?.last_name}`
    } else if (role === 'provider') {
      return `${appointment.patient_profile?.first_name} ${appointment.patient_profile?.last_name}`
    } else {
      return `${appointment.patient_profile?.first_name} → Dr. ${appointment.provider_profile?.last_name}`
    }
  }

  return (
    <Card className={`${isSoon ? 'border-deaf-yellow border-2' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4 flex-1">
            {/* Date/Time Display */}
            <div className="flex flex-col items-center justify-center min-w-[80px] h-20 bg-deaf-blue/10 rounded-lg px-3">
              <div className="text-xs text-deaf-blue font-medium uppercase">
                {format(scheduledStart, 'MMM')}
              </div>
              <div className="text-2xl font-bold text-deaf-blue">
                {format(scheduledStart, 'd')}
              </div>
              <div className="text-xs text-deaf-blue">
                {format(scheduledStart, 'h:mm a')}
              </div>
            </div>

            {/* Appointment Details */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {getDisplayName()}
                  </h3>
                  {role === 'patient' && appointment.provider_profile?.specialty && (
                    <p className="text-sm text-gray-600 mb-1">
                      {appointment.provider_profile.specialty}
                    </p>
                  )}
                  {role === 'provider' && (
                    <p className="text-sm text-gray-600 mb-1">
                      {appointment.appointment_type}
                    </p>
                  )}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[appointment.status]}`}
                >
                  {appointment.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              {/* Time and Duration */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    {format(scheduledStart, 'h:mm a')} -{' '}
                    {format(scheduledEnd, 'h:mm a')}
                  </span>
                </div>
                {isUpcoming && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {formatDistance(scheduledStart, now, { addSuffix: true })}
                    </span>
                  </div>
                )}
              </div>

              {/* Interpreter Info */}
              {appointment.needs_interpreter && (
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-deaf-turquoise" />
                  <span className="text-sm text-deaf-turquoise font-medium">
                    {appointment.interpreter_profile ? (
                      <>
                        {appointment.preferred_sign_language} Interpreter:{' '}
                        {appointment.interpreter_profile.first_name}{' '}
                        {appointment.interpreter_profile.last_name}
                      </>
                    ) : (
                      <>
                        {appointment.preferred_sign_language} Interpreter requested
                        (pending assignment)
                      </>
                    )}
                  </span>
                </div>
              )}

              {/* Alert for soon appointments */}
              {isSoon && appointment.status === 'scheduled' && (
                <div className="flex items-center gap-2 mt-2 p-2 bg-deaf-yellow/20 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-deaf-yellow" />
                  <span className="text-sm font-medium text-deaf-yellow">
                    Starting soon! Join the call now.
                  </span>
                </div>
              )}

              {/* Notes */}
              {appointment.notes && role !== 'patient' && (
                <div className="mt-2 text-sm text-gray-600">
                  <strong>Notes:</strong> {appointment.notes}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 min-w-[140px]">
            {appointment.status === 'scheduled' && isUpcoming && (
              <>
                {/* Join Call button - available 15 minutes before */}
                {isSoon && (
                  <Link href={`/video-call/${appointment.id}`}>
                    <Button
                      className="w-full bg-deaf-blue hover:bg-deaf-blue/90"
                      size="sm"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Join Call
                    </Button>
                  </Link>
                )}

                {/* Start Call button for providers */}
                {!isSoon && role === 'provider' && isToday && (
                  <Link href={`/video-call/${appointment.id}`}>
                    <Button
                      className="w-full bg-deaf-blue hover:bg-deaf-blue/90"
                      size="sm"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Start Call
                    </Button>
                  </Link>
                )}

                {/* Reschedule button */}
                {onReschedule && role !== 'interpreter' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onReschedule(appointment.id)}
                  >
                    Reschedule
                  </Button>
                )}

                {/* Cancel button */}
                {onCancel && role !== 'interpreter' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onCancel(appointment.id)}
                  >
                    Cancel
                  </Button>
                )}
              </>
            )}

            {appointment.status === 'in_progress' && (
              <Link href={`/video-call/${appointment.id}`}>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Rejoin Call
                </Button>
              </Link>
            )}

            {appointment.status === 'completed' && role === 'provider' && (
              <Button variant="outline" size="sm">
                View Notes
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
