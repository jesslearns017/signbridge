'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Users,
  Calendar,
  Video,
  TrendingUp,
  Clock,
  UserCheck,
  Activity,
  FileText,
} from 'lucide-react'

interface AnalyticsStats {
  totalUsers: number
  totalPatients: number
  totalProviders: number
  totalInterpreters: number
  totalAppointments: number
  appointmentsThisMonth: number
  appointmentsThisWeek: number
  appointmentsToday: number
  completedAppointments: number
  cancelledAppointments: number
  totalVideoSessions: number
  avgSessionDuration: number
  totalMedicalRecords: number
  activeUsers30Days: number
}

export default function AnalyticsPage() {
  const { profile } = useAuth()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<AnalyticsStats>({
    totalUsers: 247,
    totalPatients: 156,
    totalProviders: 67,
    totalInterpreters: 24,
    totalAppointments: 1834,
    appointmentsThisMonth: 312,
    appointmentsThisWeek: 78,
    appointmentsToday: 12,
    completedAppointments: 1623,
    cancelledAppointments: 89,
    totalVideoSessions: 1534,
    avgSessionDuration: 24.5,
    totalMedicalRecords: 2341,
    activeUsers30Days: 203,
  })

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (profile?.role !== 'admin') {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-600">
              This page is only available for administrators.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-deaf-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">
          Platform usage statistics and performance metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Users</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            <p className="text-xs text-green-600 mt-1">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Appointments (Month)</p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.appointmentsThisMonth}
            </p>
            <p className="text-xs text-green-600 mt-1">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-green-100 rounded-lg">
                <Video className="w-6 h-6 text-green-600" />
              </div>
              <Activity className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Video Sessions</p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.totalVideoSessions}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {stats.avgSessionDuration} min avg duration
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <UserCheck className="w-6 h-6 text-yellow-600" />
              </div>
              <Activity className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Active Users (30d)</p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.activeUsers30Days}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {((stats.activeUsers30Days / stats.totalUsers) * 100).toFixed(1)}%
              of total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* User Breakdown */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="w-5 h-5 text-blue-600" />
              Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600 mb-2">
              {stats.totalPatients}
            </p>
            <p className="text-sm text-gray-600">
              {((stats.totalPatients / stats.totalUsers) * 100).toFixed(1)}% of
              users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="w-5 h-5 text-green-600" />
              Providers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600 mb-2">
              {stats.totalProviders}
            </p>
            <p className="text-sm text-gray-600">
              {((stats.totalProviders / stats.totalUsers) * 100).toFixed(1)}% of
              users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="w-5 h-5 text-purple-600" />
              Interpreters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-purple-600 mb-2">
              {stats.totalInterpreters}
            </p>
            <p className="text-sm text-gray-600">
              {((stats.totalInterpreters / stats.totalUsers) * 100).toFixed(1)}%
              of users
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Appointment Statistics */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Appointment Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Total Appointments</span>
                </div>
                <span className="text-2xl font-bold">{stats.totalAppointments}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Completed</span>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {stats.completedAppointments}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-red-600" />
                  <span className="font-medium">Cancelled</span>
                </div>
                <span className="text-2xl font-bold text-red-600">
                  {stats.cancelledAppointments}
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900">
                  Completion Rate
                </span>
                <span className="text-sm font-bold text-blue-900">
                  {(
                    (stats.completedAppointments / stats.totalAppointments) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${
                      (stats.completedAppointments / stats.totalAppointments) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">Appointments This Week</span>
                </div>
                <span className="text-2xl font-bold text-purple-600">
                  {stats.appointmentsThisWeek}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium">Appointments Today</span>
                </div>
                <span className="text-2xl font-bold text-yellow-600">
                  {stats.appointmentsToday}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-teal-600" />
                  <span className="font-medium">Medical Records</span>
                </div>
                <span className="text-2xl font-bold text-teal-600">
                  {stats.totalMedicalRecords}
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-deaf-blue to-deaf-turquoise rounded-lg text-white">
              <p className="text-sm font-medium mb-1">Average Session Duration</p>
              <p className="text-3xl font-bold">
                {stats.avgSessionDuration} minutes
              </p>
              <p className="text-xs opacity-90 mt-1">
                Across {stats.totalVideoSessions} video sessions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card className="bg-gradient-to-br from-deaf-blue to-deaf-turquoise text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-6 h-6" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm opacity-90 mb-1">Uptime</p>
              <p className="text-2xl font-bold">99.9%</p>
            </div>
            <div className="text-center">
              <p className="text-sm opacity-90 mb-1">Response Time</p>
              <p className="text-2xl font-bold">124ms</p>
            </div>
            <div className="text-center">
              <p className="text-sm opacity-90 mb-1">Storage Used</p>
              <p className="text-2xl font-bold">8.2 GB</p>
            </div>
            <div className="text-center">
              <p className="text-sm opacity-90 mb-1">API Calls (Today)</p>
              <p className="text-2xl font-bold">12.4K</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
