'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/hooks'
import {
  useAppointments,
  useProviders,
  useProviderAvailability,
} from '@/lib/appointments/hooks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import {
  Calendar,
  Clock,
  User,
  FileText,
  Users,
  ArrowLeft,
  ArrowRight,
  Check,
} from 'lucide-react'
import { format, addDays, startOfDay } from 'date-fns'

type BookingStep = 'provider' | 'datetime' | 'details' | 'confirm'

export default function BookAppointmentPage() {
  const router = useRouter()
  const { profile } = useAuth()
  const { createAppointment } = useAppointments()
  const { providers, loading: providersLoading } = useProviders()
  const { toast } = useToast()

  // Form state
  const [currentStep, setCurrentStep] = useState<BookingStep>('provider')
  const [selectedProvider, setSelectedProvider] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date>(
    startOfDay(addDays(new Date(), 1))
  )
  const [selectedTime, setSelectedTime] = useState('')
  const [reason, setReason] = useState('')
  const [needsInterpreter, setNeedsInterpreter] = useState(false)
  const [preferredSignLanguage, setPreferredSignLanguage] = useState(
    profile?.preferred_sign_language || 'ASL'
  )
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Get availability for selected provider and date
  const { availability, loading: availabilityLoading } = useProviderAvailability(
    selectedProvider,
    selectedDate
  )

  const steps: BookingStep[] = ['provider', 'datetime', 'details', 'confirm']
  const currentStepIndex = steps.indexOf(currentStep)

  // Generate next 14 days for date selection
  const availableDates = Array.from({ length: 14 }, (_, i) =>
    addDays(new Date(), i + 1)
  )

  const handleNext = () => {
    if (currentStep === 'provider' && !selectedProvider) {
      toast({
        title: 'Provider Required',
        description: 'Please select a healthcare provider.',
        variant: 'destructive',
      })
      return
    }

    if (currentStep === 'datetime' && !selectedTime) {
      toast({
        title: 'Time Required',
        description: 'Please select an appointment time.',
        variant: 'destructive',
      })
      return
    }

    if (currentStep === 'details' && !reason.trim()) {
      toast({
        title: 'Reason Required',
        description: 'Please provide a reason for your visit.',
        variant: 'destructive',
      })
      return
    }

    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex])
    }
  }

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex])
    }
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)

      const provider = providers.find((p) => p.id === selectedProvider)
      if (!provider) throw new Error('Provider not found')

      // Parse the selected date and time
      const [hours, minutes] = selectedTime.split(':').map(Number)
      const appointmentStart = new Date(selectedDate)
      appointmentStart.setHours(hours, minutes, 0, 0)

      const appointmentEnd = new Date(appointmentStart)
      appointmentEnd.setMinutes(appointmentEnd.getMinutes() + 30) // 30-minute appointments

      await createAppointment({
        provider_id: selectedProvider,
        scheduled_start: appointmentStart.toISOString(),  // Keep as scheduled_start
        scheduled_end: appointmentEnd.toISOString(),  // ADD THIS LINE
        reason,
        needs_interpreter: needsInterpreter,
        preferred_sign_language: preferredLanguage,
        notes,
})

      toast({
        title: 'Appointment Booked!',
        description: `Your appointment with Dr. ${provider.last_name} has been scheduled for ${format(appointmentStart, 'MMMM d, yyyy')} at ${format(appointmentStart, 'h:mm a')}.`,
      })

      router.push('/appointments')
    } catch (error) {
      console.error('Error booking appointment:', error)
      toast({
        title: 'Booking Failed',
        description: 'Failed to book appointment. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-deaf-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const selectedProviderData = providers.find((p) => p.id === selectedProvider)

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.push('/appointments')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Appointments
        </Button>
        <h1 className="text-3xl font-bold mb-2">Book an Appointment</h1>
        <p className="text-gray-600">
          Schedule a video consultation with a healthcare provider
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center flex-1">
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    index <= currentStepIndex
                      ? 'bg-deaf-blue text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index < currentStepIndex ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`ml-3 text-sm font-medium ${
                    index <= currentStepIndex
                      ? 'text-deaf-blue'
                      : 'text-gray-500'
                  }`}
                >
                  {step === 'provider'
                    ? 'Provider'
                    : step === 'datetime'
                    ? 'Date & Time'
                    : step === 'details'
                    ? 'Details'
                    : 'Confirm'}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    index < currentStepIndex ? 'bg-deaf-blue' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-8">
          {/* Step 1: Select Provider */}
          {currentStep === 'provider' && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <User className="w-6 h-6 text-deaf-blue" />
                <h2 className="text-2xl font-bold">Select a Provider</h2>
              </div>

              {providersLoading ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 border-4 border-deaf-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading providers...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {providers.map((provider) => (
                    <Card
                      key={provider.id}
                      className={`cursor-pointer transition-all ${
                        selectedProvider === provider.id
                          ? 'border-deaf-blue border-2 bg-deaf-blue/5'
                          : 'hover:border-deaf-blue/50'
                      }`}
                      onClick={() => setSelectedProvider(provider.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">
                              Dr. {provider.first_name} {provider.last_name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {provider.specialty || 'General Practice'}
                            </p>
                            {provider.languages_spoken && (
                              <p className="text-xs text-gray-500 mt-1">
                                Languages:{' '}
                                {Array.isArray(provider.languages_spoken)
                                  ? provider.languages_spoken.join(', ')
                                  : provider.languages_spoken}
                              </p>
                            )}
                          </div>
                          {selectedProvider === provider.id && (
                            <Check className="w-6 h-6 text-deaf-blue" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {currentStep === 'datetime' && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-6 h-6 text-deaf-blue" />
                <h2 className="text-2xl font-bold">Select Date & Time</h2>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">
                  Appointment with Dr. {selectedProviderData?.last_name}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedProviderData?.specialty}
                </p>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Select Date
                </label>
                <Select
                  value={selectedDate.toISOString()}
                  onValueChange={(value) => {
                    setSelectedDate(new Date(value))
                    setSelectedTime('') // Reset time when date changes
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDates.map((date) => (
                      <SelectItem key={date.toISOString()} value={date.toISOString()}>
                        {format(date, 'EEEE, MMMM d, yyyy')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Time
                </label>
                {availabilityLoading ? (
                  <div className="text-center py-8">
                    <div className="w-8 h-8 border-4 border-deaf-blue border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">
                      Loading available times...
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2">
                    {availability
                      .filter((slot) => slot.available)
                      .map((slot) => (
                        <Button
                          key={slot.start}
                          variant={
                            selectedTime === slot.display ? 'default' : 'outline'
                          }
                          className={
                            selectedTime === slot.display
                              ? 'bg-deaf-blue'
                              : ''
                          }
                          onClick={() => setSelectedTime(slot.display)}
                        >
                          <Clock className="w-4 h-4 mr-1" />
                          {slot.display}
                        </Button>
                      ))}
                  </div>
                )}
                {!availabilityLoading &&
                  availability.filter((s) => s.available).length === 0 && (
                    <p className="text-center py-8 text-gray-600">
                      No available times for this date. Please select another
                      date.
                    </p>
                  )}
              </div>
            </div>
          )}

          {/* Step 3: Appointment Details */}
          {currentStep === 'details' && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-6 h-6 text-deaf-blue" />
                <h2 className="text-2xl font-bold">Appointment Details</h2>
              </div>

              <div className="space-y-6">
                {/* Reason for Visit */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Reason for Visit <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g., Annual checkup, Follow-up, Symptoms"
                    className="w-full"
                  />
                </div>

                {/* Interpreter Request */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={needsInterpreter}
                      onChange={(e) => setNeedsInterpreter(e.target.checked)}
                      className="w-4 h-4 text-deaf-blue focus:ring-deaf-blue border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium">
                      Request Sign Language Interpreter
                    </span>
                  </label>
                </div>

                {/* Sign Language Selection */}
                {needsInterpreter && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Preferred Sign Language
                    </label>
                    <Select
                      value={preferredSignLanguage}
                      onValueChange={setPreferredSignLanguage}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ASL">
                          ASL (American Sign Language)
                        </SelectItem>
                        <SelectItem value="LSM">
                          LSM (Mexican Sign Language)
                        </SelectItem>
                        <SelectItem value="LSE">
                          LSE (Spanish Sign Language)
                        </SelectItem>
                        <SelectItem value="LSC">
                          LSC (Colombian Sign Language)
                        </SelectItem>
                        <SelectItem value="LSA">
                          LSA (Argentine Sign Language)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any additional information for your provider..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deaf-blue"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 'confirm' && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Check className="w-6 h-6 text-deaf-blue" />
                <h2 className="text-2xl font-bold">Confirm Appointment</h2>
              </div>

              <div className="space-y-6">
                <Card className="bg-deaf-blue/5">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">
                          Provider
                        </h3>
                        <p className="font-semibold">
                          Dr. {selectedProviderData?.first_name}{' '}
                          {selectedProviderData?.last_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedProviderData?.specialty}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">
                          Date & Time
                        </h3>
                        <p className="font-semibold">
                          {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedTime} (30 minutes)
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">
                          Reason for Visit
                        </h3>
                        <p className="font-semibold">{reason}</p>
                      </div>

                      {needsInterpreter && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-600 mb-1">
                            Interpreter
                          </h3>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-deaf-turquoise" />
                            <p className="font-semibold text-deaf-turquoise">
                              {preferredSignLanguage} Interpreter Requested
                            </p>
                          </div>
                        </div>
                      )}

                      {notes && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-600 mb-1">
                            Notes
                          </h3>
                          <p className="text-sm">{notes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Important:</strong> You will receive a confirmation
                    email with video call details. Please join the call 5 minutes
                    before your scheduled time.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStepIndex === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {currentStep !== 'confirm' ? (
          <Button onClick={handleNext} className="bg-deaf-blue">
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-deaf-blue"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Booking...
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                Confirm Appointment
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
