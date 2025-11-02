'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth/hooks'
import { useAppointments } from '@/lib/appointments/hooks'
import { AppointmentCard } from '@/components/appointments/appointment-card'
import { Button } from '@/components/ui/button'
import { Calendar, Plus, Filter } from 'lucide-react'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'

export default function AppointmentsPage() {
  const { profile } = useAuth()
  const {
    appointments,
    loading,
    cancelAppointment,
    fetchAppointments,
  } = useAppointments()
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past' | 'cancelled'>('upcoming')
  const { toast } = useToast()

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-deaf-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  // Filter appointments
  const now = new Date()
  const filteredAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.appointment_date)  // Change from scheduled_start

    switch (filter) {
      case 'upcoming':
        return aptDate > now && apt.status !== 'cancelled'
      case 'past':
        return aptDate < now || apt.status === 'completed'
      case 'cancelled':
        return apt.status === 'cancelled'
      case 'all':
      default:
        return true
    }
  })

  // Count appointments by status
  const upcomingCount = appointments.filter(
    (apt) => new Date(apt.appointment_date) > now && apt.status !== 'cancelled'
  ).length
  const pastCount = appointments.filter(
    (apt) => new Date(apt.appointment_date) < now || apt.status === 'completed'
  ).length
  const cancelledCount = appointments.filter(
    (apt) => apt.status === 'cancelled'
  ).length

  const handleCancel = async (appointmentId: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return
    }

    try {
      await cancelAppointment(appointmentId, 'Cancelled by user')
      toast({
        title: 'Appointment Cancelled',
        description: 'Your appointment has been cancelled successfully.',
      })
      fetchAppointments()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to cancel appointment. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleReschedule = (appointmentId: string) => {
    // TODO: Open reschedule modal
    toast({
      title: 'Coming Soon',
      description: 'Rescheduling feature will be available soon.',
    })
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {profile.role === 'patient'
              ? 'My Appointments'
              : profile.role === 'provider'
              ? 'My Schedule'
              : 'My Assignments'}
          </h1>
          <p className="text-gray-600">
            {profile.role === 'patient'
              ? 'View and manage your healthcare appointments'
              : profile.role === 'provider'
              ? 'Manage your patient appointments'
              : 'View your interpretation assignments'}
          </p>
        </div>

        {profile.role === 'patient' && (
          <Link href="/appointments/book">
            <Button className="bg-deaf-blue hover:bg-deaf-blue/90">
              <Plus className="w-5 h-5 mr-2" />
              Book Appointment
            </Button>
          </Link>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter:</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === 'upcoming' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('upcoming')}
            className={filter === 'upcoming' ? 'bg-deaf-blue' : ''}
          >
            Upcoming ({upcomingCount})
          </Button>
          <Button
            variant={filter === 'past' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('past')}
            className={filter === 'past' ? 'bg-deaf-blue' : ''}
          >
            Past ({pastCount})
          </Button>
          <Button
            variant={filter === 'cancelled' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('cancelled')}
            className={filter === 'cancelled' ? 'bg-deaf-blue' : ''}
          >
            Cancelled ({cancelledCount})
          </Button>
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-deaf-blue' : ''}
          >
            All ({appointments.length})
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-deaf-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading appointments...</p>
          </div>
        </div>
      )}

      {/* Appointments List */}
      {!loading && filteredAppointments.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No appointments found
          </h3>
          <p className="text-gray-600 mb-6">
            {filter === 'upcoming'
              ? "You don't have any upcoming appointments."
              : filter === 'past'
              ? "You don't have any past appointments."
              : filter === 'cancelled'
              ? "You don't have any cancelled appointments."
              : "You don't have any appointments yet."}
          </p>
          {profile.role === 'patient' && filter === 'upcoming' && (
            <Link href="/appointments/book">
              <Button className="bg-deaf-blue hover:bg-deaf-blue/90">
                <Plus className="w-5 h-5 mr-2" />
                Book Your First Appointment
              </Button>
            </Link>
          )}
        </div>
      )}

      {!loading && filteredAppointments.length > 0 && (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              role={profile.role as 'patient' | 'provider' | 'interpreter'}
              onCancel={
                profile.role !== 'interpreter' ? handleCancel : undefined
              }
              onReschedule={
                profile.role !== 'interpreter' ? handleReschedule : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}
