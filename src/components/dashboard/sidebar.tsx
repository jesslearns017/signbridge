'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Calendar,
  Video,
  User,
  Settings,
  LogOut,
  Users,
  FileText,
  Languages
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth/hooks'
import { Button } from '@/components/ui/button'

export function Sidebar() {
  const pathname = usePathname()
  const { profile, signOut } = useAuth()

  const patientLinks = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/appointments', icon: Calendar, label: 'Appointments' },
    { href: '/profile', icon: User, label: 'Profile' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ]

  const providerLinks = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/appointments', icon: Calendar, label: 'Schedule' },
    { href: '/patients', icon: Users, label: 'Patients' },
    { href: '/records', icon: FileText, label: 'Records' },
    { href: '/profile', icon: User, label: 'Profile' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ]

  const interpreterLinks = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/appointments', icon: Calendar, label: 'Assignments' },
    { href: '/availability', icon: Languages, label: 'Availability' },
    { href: '/profile', icon: User, label: 'Profile' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ]

  const links =
    profile?.role === 'provider' ? providerLinks :
    profile?.role === 'interpreter' ? interpreterLinks :
    patientLinks

  return (
    <div className="flex flex-col h-full w-64 bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-2 p-6 border-b">
        <div className="w-10 h-10 bg-deaf-blue rounded-lg flex items-center justify-center">
          <Video className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-deaf-blue to-deaf-turquoise bg-clip-text text-transparent">
          SignBridge
        </span>
      </div>

      {/* User Info */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-deaf-blue/10 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-deaf-blue" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {profile?.first_name} {profile?.last_name}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {profile?.role}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-deaf-blue text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => signOut()}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
