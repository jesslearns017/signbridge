'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth/hooks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Calendar, Clock, Plus, Trash2, Save } from 'lucide-react'
import { format, addDays, startOfWeek } from 'date-fns'

interface TimeSlot {
  id: string
  day_of_week: number // 0-6 (Sunday-Saturday)
  start_time: string // "09:00"
  end_time: string // "17:00"
  is_available: boolean
}

export default function ProviderAvailabilityPage() {
  const { profile } = useAuth()
  const { toast } = useToast()

  // Sample availability data (in production, fetch from database)
  const [availability, setAvailability] = useState<TimeSlot[]>([
    { id: '1', day_of_week: 1, start_time: '09:00', end_time: '12:00', is_available: true },
    { id: '2', day_of_week: 1, start_time: '13:00', end_time: '17:00', is_available: true },
    { id: '3', day_of_week: 2, start_time: '09:00', end_time: '17:00', is_available: true },
    { id: '4', day_of_week: 3, start_time: '09:00', end_time: '17:00', is_available: true },
    { id: '5', day_of_week: 4, start_time: '09:00', end_time: '17:00', is_available: true },
    { id: '6', day_of_week: 5, start_time: '09:00', end_time: '12:00', is_available: true },
  ])

  const [saving, setSaving] = useState(false)

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const handleToggleDay = (dayOfWeek: number) => {
    const daySlots = availability.filter((s) => s.day_of_week === dayOfWeek)

    if (daySlots.length > 0) {
      // Remove all slots for this day
      setAvailability(availability.filter((s) => s.day_of_week !== dayOfWeek))
    } else {
      // Add default slot for this day
      const newSlot: TimeSlot = {
        id: Date.now().toString(),
        day_of_week: dayOfWeek,
        start_time: '09:00',
        end_time: '17:00',
        is_available: true,
      }
      setAvailability([...availability, newSlot])
    }
  }

  const handleUpdateSlot = (
    slotId: string,
    field: 'start_time' | 'end_time',
    value: string
  ) => {
    setAvailability(
      availability.map((slot) =>
        slot.id === slotId ? { ...slot, [field]: value } : slot
      )
    )
  }

  const handleAddSlot = (dayOfWeek: number) => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      day_of_week: dayOfWeek,
      start_time: '09:00',
      end_time: '17:00',
      is_available: true,
    }
    setAvailability([...availability, newSlot])
  }

  const handleRemoveSlot = (slotId: string) => {
    setAvailability(availability.filter((s) => s.id !== slotId))
  }

  const handleSave = async () => {
    try {
      setSaving(true)

      // TODO: Save to database via API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: 'Availability Saved',
        description: 'Your availability schedule has been updated.',
      })
    } catch (error) {
      toast({
        title: 'Save Failed',
        description: 'Failed to save availability. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  if (profile?.role !== 'provider') {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-600">
              This page is only available for healthcare providers.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Availability</h1>
          <p className="text-gray-600">
            Set your weekly schedule for patient appointments
          </p>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-deaf-blue hover:bg-deaf-blue/90"
        >
          {saving ? (
            <>
              <Clock className="w-5 h-5 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Weekly Schedule */}
      <div className="space-y-4">
        {daysOfWeek.map((day, index) => {
          const daySlots = availability.filter((s) => s.day_of_week === index)
          const isActive = daySlots.length > 0

          return (
            <Card key={index}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={() => handleToggleDay(index)}
                      className="w-5 h-5 text-deaf-blue focus:ring-deaf-blue border-gray-300 rounded"
                    />
                    <CardTitle className="text-lg">{day}</CardTitle>
                  </div>

                  {isActive && (
                    <Button
                      onClick={() => handleAddSlot(index)}
                      variant="outline"
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Time Block
                    </Button>
                  )}
                </div>
              </CardHeader>

              {isActive && (
                <CardContent>
                  <div className="space-y-3">
                    {daySlots.map((slot) => (
                      <div
                        key={slot.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <Clock className="w-5 h-5 text-deaf-blue" />

                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="time"
                            value={slot.start_time}
                            onChange={(e) =>
                              handleUpdateSlot(slot.id, 'start_time', e.target.value)
                            }
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deaf-blue"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            value={slot.end_time}
                            onChange={(e) =>
                              handleUpdateSlot(slot.id, 'end_time', e.target.value)
                            }
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deaf-blue"
                          />
                        </div>

                        {daySlots.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveSlot(slot.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      {/* Tips */}
      <Card className="mt-8 bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Tips</h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Appointments are scheduled in 30-minute blocks</li>
            <li>• You can add multiple time blocks per day (e.g., morning and afternoon)</li>
            <li>• Changes will apply to all future appointments</li>
            <li>• Patients will only see your available time slots</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
