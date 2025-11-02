'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/lib/auth/hooks'
import type { Database } from '@/types/database.types'

type Appointment = Database['public']['Tables']['appointments']['Row']
type AppointmentInsert = Database['public']['Tables']['appointments']['Insert']
type AppointmentUpdate = Database['public']['Tables']['appointments']['Update']

export interface AppointmentWithDetails extends Appointment {
  patient_profile?: {
    first_name: string
    last_name: string
    preferred_sign_language: string | null
  }
  provider_profile?: {
    first_name: string
    last_name: string
    specialty: string | null
  }
  interpreter_profile?: {
    first_name: string
    last_name: string
    sign_languages: string[] | null
  }
}

export function useAppointments() {
  const [appointments, setAppointments] = useState<AppointmentWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const { user, profile } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    if (user && profile) {
      fetchAppointments()
    }
  }, [user, profile])

  async function fetchAppointments() {
    try {
      setLoading(true)
      let query = supabase
        .from('appointments')
        .select(`
          *,
          patient_profile:profiles!appointments_patient_id_fkey(first_name, last_name, preferred_sign_language),
          provider_profile:profiles!appointments_provider_id_fkey(first_name, last_name, specialty),
          interpreter_profile:profiles!appointments_interpreter_id_fkey(first_name, last_name, sign_languages)
        `)
        .order('scheduled_start', { ascending: true })

      // Filter based on user role
      if (profile?.role === 'patient') {
        query = query.eq('patient_id', user!.id)
      } else if (profile?.role === 'provider') {
        query = query.eq('provider_id', user!.id)
      } else if (profile?.role === 'interpreter') {
        query = query.eq('interpreter_id', user!.id)
      }

      const { data, error } = await query

      if (error) throw error
      setAppointments(data || [])

      // Audit log for HIPAA compliance
      if (user) {
        await supabase.from('audit_logs').insert({
          user_id: user.id,
          action: 'view',
          resource_type: 'appointments',
          resource_id: null,
        })
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  async function createAppointment(data: {
  provider_id: string
  scheduled_start: string  // Keep this - it's the start time
  scheduled_end: string    // Keep this - it's the end time
  reason: string
  needs_interpreter: boolean
  preferred_sign_language?: string
  notes?: string
}) {
  if (!user) throw new Error('User not authenticated')

  try {
    // Calculate duration from start and end times
    const startTime = new Date(data.scheduled_start)
    const endTime = new Date(data.scheduled_end)
    const durationMinutes = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60))

    const appointmentData: AppointmentInsert = {
      patient_id: user.id,
      provider_id: data.provider_id,
      appointment_date: data.scheduled_start,  // Store start time here
      duration_minutes: durationMinutes,       // Store calculated duration
      status: 'scheduled',
      appointment_type: data.reason,
      requires_interpreter: data.needs_interpreter,
      preferred_sign_language: data.preferred_sign_language || null,
      notes: data.notes || null,
    }

      const { data: appointment, error } = await supabase
        .from('appointments')
        .insert(appointmentData)
        .select()
        .single()

      if (error) throw error

      // Audit log
      await supabase.from('audit_logs').insert({
        user_id: user.id,
        action: 'create',
        resource_type: 'appointment',
        resource_id: appointment.id,
      })

      await fetchAppointments()
      return appointment
    } catch (error) {
      console.error('Error creating appointment:', error)
      throw error
    }
  }

  async function updateAppointment(
    appointmentId: string,
    updates: AppointmentUpdate
  ) {
    if (!user) throw new Error('User not authenticated')

    try {
      const { data: appointment, error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', appointmentId)
        .select()
        .single()

      if (error) throw error

      // Audit log
      await supabase.from('audit_logs').insert({
        user_id: user.id,
        action: 'update',
        resource_type: 'appointment',
        resource_id: appointmentId,
        metadata: updates,
      })

      await fetchAppointments()
      return appointment
    } catch (error) {
      console.error('Error updating appointment:', error)
      throw error
    }
  }

  async function cancelAppointment(appointmentId: string, reason: string) {
    return updateAppointment(appointmentId, {
      status: 'cancelled',
      notes: reason ? `Cancellation reason: ${reason}` : null,
    })
  }

  async function rescheduleAppointment(
    appointmentId: string,
    newStart: string,
    newEnd: string
  ) {
    const startTime = new Date(newStart)
    const endTime = new Date(newEnd)
    const durationMinutes = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60))

    return updateAppointment(appointmentId, {
      appointment_date: newStart,
      duration_minutes: durationMinutes,
      status: 'scheduled',
    })
  }

  async function startAppointment(appointmentId: string) {
    return updateAppointment(appointmentId, {
      status: 'in_progress',
      actual_start: new Date().toISOString(),
    })
  }

  async function completeAppointment(appointmentId: string, notes?: string) {
    return updateAppointment(appointmentId, {
      status: 'completed',
      actual_end: new Date().toISOString(),
      notes: notes || undefined,
    })
  }

  return {
    appointments,
    loading,
    fetchAppointments,
    createAppointment,
    updateAppointment,
    cancelAppointment,
    rescheduleAppointment,
    startAppointment,
    completeAppointment,
  }
}

// Hook for fetching available providers
export function useProviders() {
  const [providers, setProviders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchProviders()
  }, [])

  async function fetchProviders() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, specialty, languages_spoken')
        .eq('role', 'provider')
        .order('last_name')

      if (error) throw error
      setProviders(data || [])
    } catch (error) {
      console.error('Error fetching providers:', error)
    } finally {
      setLoading(false)
    }
  }

  return { providers, loading, refetch: fetchProviders }
}

// Hook for fetching available interpreters
export function useInterpreters(signLanguage?: string) {
  const [interpreters, setInterpreters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchInterpreters()
  }, [signLanguage])

  async function fetchInterpreters() {
    try {
      setLoading(true)
      let query = supabase
        .from('profiles')
        .select('id, first_name, last_name, sign_languages, rating')
        .eq('role', 'interpreter')

      // Filter by sign language if specified
      if (signLanguage) {
        query = query.contains('sign_languages', [signLanguage])
      }

      const { data, error } = await query.order('rating', {
        ascending: false,
        nullsFirst: false,
      })

      if (error) throw error
      setInterpreters(data || [])
    } catch (error) {
      console.error('Error fetching interpreters:', error)
    } finally {
      setLoading(false)
    }
  }

  return { interpreters, loading, refetch: fetchInterpreters }
}

// Hook for checking provider availability
export function useProviderAvailability(providerId: string, date: Date) {
  const [availability, setAvailability] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (providerId && date) {
      fetchAvailability()
    }
  }, [providerId, date])

  async function fetchAvailability() {
    try {
      setLoading(true)
      // Get provider's availability slots for the date
      const startOfDay = new Date(date)
      startOfDay.setHours(0, 0, 0, 0)

      const endOfDay = new Date(date)
      endOfDay.setHours(23, 59, 59, 999)

      // Fetch existing appointments for the provider on this date
      const { data: appointments, error } = await supabase
        .from('appointments')
        .select('scheduled_start, scheduled_end')
        .eq('provider_id', providerId)
        .gte('scheduled_start', startOfDay.toISOString())
        .lte('scheduled_start', endOfDay.toISOString())
        .neq('status', 'cancelled')

      if (error) throw error

      // Generate available time slots (9 AM - 5 PM, 30-minute slots)
      const slots = generateTimeSlots(date, appointments || [])
      setAvailability(slots)
    } catch (error) {
      console.error('Error fetching availability:', error)
    } finally {
      setLoading(false)
    }
  }

  return { availability, loading, refetch: fetchAvailability }
}

// Helper function to generate time slots
function generateTimeSlots(date: Date, bookedAppointments: any[]) {
  const slots = []
  const startHour = 9 // 9 AM
  const endHour = 17 // 5 PM
  const slotDuration = 30 // 30 minutes

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotDuration) {
      const slotStart = new Date(date)
      slotStart.setHours(hour, minute, 0, 0)

      const slotEnd = new Date(slotStart)
      slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration)

      // Check if slot overlaps with any booked appointment
      const isBooked = bookedAppointments.some((apt) => {
        const aptStart = new Date(apt.scheduled_start)
        const aptEnd = new Date(apt.scheduled_end)
        return slotStart < aptEnd && slotEnd > aptStart
      })

      slots.push({
        start: slotStart.toISOString(),
        end: slotEnd.toISOString(),
        available: !isBooked,
        display: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
      })
    }
  }

  return slots
}
