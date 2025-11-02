'use client'

import { useAuth } from '@/lib/auth/hooks'
import { Calendar, Video, Users, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardPage() {
  const { profile } = useAuth()

  if (profile?.role === 'provider') {
    return <ProviderDashboard />
  }

  if (profile?.role === 'interpreter') {
    return <InterpreterDashboard />
  }

  return <PatientDashboard />
}

function PatientDashboard() {
  const { profile } = useAuth()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {profile?.first_name}!
        </h1>
        <p className="text-gray-600">
          Manage your appointments and connect with your healthcare providers
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-deaf-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500">
              Next: Tomorrow at 2:00 PM
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Video Consultations
            </CardTitle>
            <Video className="h-4 w-4 text-deaf-turquoise" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">
              Completed this year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              With Interpreter
            </CardTitle>
            <Users className="h-4 w-4 text-deaf-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500">
              {profile?.preferred_sign_language || 'ASL'} preferred
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/appointments/book">
            <Button className="w-full h-auto p-6 flex flex-col items-start gap-2">
              <Calendar className="w-6 h-6" />
              <div className="text-left">
                <div className="font-semibold">Book Appointment</div>
                <div className="text-sm opacity-90">Schedule a video consultation</div>
              </div>
            </Button>
          </Link>

          <Link href="/appointments">
            <Button variant="outline" className="w-full h-auto p-6 flex flex-col items-start gap-2">
              <Clock className="w-6 h-6" />
              <div className="text-left">
                <div className="font-semibold">View Schedule</div>
                <div className="text-sm text-gray-600">See all your appointments</div>
              </div>
            </Button>
          </Link>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div>
        <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
        <div className="space-y-4">
          <AppointmentCard
            date="Tomorrow"
            time="2:00 PM"
            provider="Dr. Sarah Johnson"
            specialty="Primary Care"
            hasInterpreter={true}
            signLanguage="ASL"
          />
          <AppointmentCard
            date="Friday, Nov 8"
            time="10:30 AM"
            provider="Dr. Michael Chen"
            specialty="Cardiology"
            hasInterpreter={true}
            signLanguage="ASL"
          />
        </div>
      </div>
    </div>
  )
}

function ProviderDashboard() {
  const { profile } = useAuth()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Good morning, Dr. {profile?.last_name}!
        </h1>
        <p className="text-gray-600">
          You have 5 appointments scheduled today
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-deaf-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-500">
              Next: 9:00 AM
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Patients
            </CardTitle>
            <Users className="h-4 w-4 text-deaf-turquoise" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-gray-500">
              +12 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              With Interpreter
            </CardTitle>
            <Video className="h-4 w-4 text-deaf-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500">
              Today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Session Time
            </CardTitle>
            <Clock className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28m</div>
            <p className="text-xs text-gray-500">
              -2 min vs last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <div>
        <h2 className="text-xl font-bold mb-4">Today's Schedule</h2>
        <div className="space-y-4">
          <ProviderAppointmentCard
            time="9:00 AM"
            patient="John Smith"
            type="Follow-up"
            hasInterpreter={true}
            signLanguage="ASL"
          />
          <ProviderAppointmentCard
            time="10:00 AM"
            patient="Maria Garcia"
            type="New Patient"
            hasInterpreter={true}
            signLanguage="LSM"
          />
          <ProviderAppointmentCard
            time="11:30 AM"
            patient="David Lee"
            type="Consultation"
            hasInterpreter={false}
          />
        </div>
      </div>
    </div>
  )
}

function InterpreterDashboard() {
  const { profile } = useAuth()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {profile?.first_name}!
        </h1>
        <p className="text-gray-600">
          You have 3 interpretation sessions scheduled today
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Sessions
            </CardTitle>
            <Calendar className="h-4 w-4 text-deaf-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500">
              Next: 9:00 AM
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              This Month
            </CardTitle>
            <Video className="h-4 w-4 text-deaf-turquoise" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-gray-500">
              Sessions completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Rating
            </CardTitle>
            <Users className="h-4 w-4 text-deaf-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.9</div>
            <p className="text-xs text-gray-500">
              Out of 5.0
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Assignments */}
      <div>
        <h2 className="text-xl font-bold mb-4">Today's Assignments</h2>
        <div className="space-y-4">
          <InterpreterSessionCard
            time="9:00 AM"
            patient="John Smith"
            provider="Dr. Sarah Johnson"
            language="ASL"
            specialty="Primary Care"
          />
          <InterpreterSessionCard
            time="2:00 PM"
            patient="Maria Garcia"
            provider="Dr. Michael Chen"
            language="LSM"
            specialty="Cardiology"
          />
        </div>
      </div>
    </div>
  )
}

// Helper Components
function AppointmentCard({
  date,
  time,
  provider,
  specialty,
  hasInterpreter,
  signLanguage,
}: {
  date: string
  time: string
  provider: string
  specialty: string
  hasInterpreter: boolean
  signLanguage?: string
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="flex flex-col items-center justify-center w-16 h-16 bg-deaf-blue/10 rounded-lg">
              <div className="text-xs text-deaf-blue font-medium">{date.split(',')[0]}</div>
              <div className="text-lg font-bold text-deaf-blue">{time}</div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">{provider}</h3>
              <p className="text-sm text-gray-600 mb-2">{specialty}</p>
              {hasInterpreter && (
                <div className="flex items-center gap-1 text-xs text-deaf-turquoise">
                  <Users className="w-3 h-3" />
                  {signLanguage} Interpreter assigned
                </div>
              )}
            </div>
          </div>
          <Link href="/video-call/upcoming-id">
            <Button size="sm">
              <Video className="w-4 h-4 mr-2" />
              Join Call
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

function ProviderAppointmentCard({
  time,
  patient,
  type,
  hasInterpreter,
  signLanguage,
}: {
  time: string
  patient: string
  type: string
  hasInterpreter: boolean
  signLanguage?: string
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="text-lg font-bold text-deaf-blue w-20">{time}</div>
            <div>
              <h3 className="font-semibold">{patient}</h3>
              <p className="text-sm text-gray-600">{type}</p>
              {hasInterpreter && (
                <div className="flex items-center gap-1 text-xs text-deaf-turquoise mt-1">
                  <Users className="w-3 h-3" />
                  {signLanguage} Interpreter
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              View Chart
            </Button>
            <Button size="sm">
              <Video className="w-4 h-4 mr-2" />
              Start Call
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function InterpreterSessionCard({
  time,
  patient,
  provider,
  language,
  specialty,
}: {
  time: string
  patient: string
  provider: string
  language: string
  specialty: string
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="text-lg font-bold text-deaf-blue w-20">{time}</div>
            <div>
              <h3 className="font-semibold">{patient} → {provider}</h3>
              <p className="text-sm text-gray-600">{specialty}</p>
              <div className="flex items-center gap-1 text-xs text-deaf-turquoise mt-1">
                <Users className="w-3 h-3" />
                {language} Interpretation
              </div>
            </div>
          </div>
          <Button size="sm">
            <Video className="w-4 h-4 mr-2" />
            Join Session
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
