'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Video, Eye, EyeOff, AlertCircle, User, Stethoscope, Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/auth/hooks'
import { useToast } from '@/components/ui/use-toast'

type UserRole = 'patient' | 'provider' | 'interpreter'

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const defaultRole = (searchParams.get('role') as UserRole) || 'patient'

  const [step, setStep] = useState<'role' | 'details'>('role')
  const [role, setRole] = useState<UserRole>(defaultRole)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [preferredLanguage, setPreferredLanguage] = useState('en')
  const [preferredSignLanguage, setPreferredSignLanguage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { signUp } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

    try {
      await signUp(email, password, role, {
        first_name: firstName,
        last_name: lastName,
        phone,
        preferred_language: preferredLanguage,
        preferred_sign_language: preferredSignLanguage,
      })

      toast({
        title: 'Account created!',
        description: 'Please check your email to verify your account.',
      })

      router.push('/login?registered=true')
    } catch (err: any) {
      setError(err.message || 'Failed to create account')
      toast({
        variant: 'destructive',
        title: 'Registration failed',
        description: err.message || 'Failed to create account',
      })
    } finally {
      setLoading(false)
    }
  }

  if (step === 'role') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 p-4">
        <div className="w-full max-w-4xl">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-12 h-12 bg-deaf-blue rounded-lg flex items-center justify-center">
              <Video className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-deaf-blue to-deaf-turquoise bg-clip-text text-transparent">
              SignBridge
            </span>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
            <p className="text-gray-600">Choose how you'll use SignBridge</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((roleOption) => (
              <Card
                key={roleOption.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  role === roleOption.id
                    ? 'border-deaf-blue border-2 shadow-lg'
                    : 'border-gray-200'
                }`}
                onClick={() => setRole(roleOption.id as UserRole)}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-deaf-blue/10 rounded-lg flex items-center justify-center mb-4">
                    <roleOption.icon className="w-6 h-6 text-deaf-blue" />
                  </div>
                  <CardTitle>{roleOption.title}</CardTitle>
                  <CardDescription>{roleOption.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {roleOption.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-deaf-turquoise mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button
              size="lg"
              onClick={() => setStep('details')}
              className="px-12"
            >
              Continue as {roles.find(r => r.id === role)?.title}
            </Button>
          </div>

          <div className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-deaf-blue hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-12 h-12 bg-deaf-blue rounded-lg flex items-center justify-center">
            <Video className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-deaf-blue to-deaf-turquoise bg-clip-text text-transparent">
            SignBridge
          </span>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Your Information</CardTitle>
            <CardDescription>
              Complete your {roles.find(r => r.id === role)?.title.toLowerCase()} profile
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Preferred Language</Label>
                <select
                  id="language"
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  disabled={loading}
                >
                  <option value="en">English</option>
                  <option value="es">Español (Spanish)</option>
                </select>
              </div>

              {role === 'patient' && (
                <div className="space-y-2">
                  <Label htmlFor="signLanguage">Preferred Sign Language (Optional)</Label>
                  <select
                    id="signLanguage"
                    value={preferredSignLanguage || ''}
                    onChange={(e) => setPreferredSignLanguage(e.target.value || null)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    disabled={loading}
                  >
                    <option value="">None / Not applicable</option>
                    <option value="ASL">ASL (American Sign Language)</option>
                    <option value="LSM">LSM (Mexican Sign Language)</option>
                    <option value="LSE">LSE (Spanish Sign Language)</option>
                    <option value="LSC">LSC (Colombian Sign Language)</option>
                    <option value="LSA">LSA (Argentine Sign Language)</option>
                  </select>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setStep('role')}
                disabled={loading}
              >
                ← Back to role selection
              </Button>

              <div className="text-xs text-center text-gray-500">
                By creating an account, you agree to our{' '}
                <Link href="/terms" className="text-deaf-blue hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-deaf-blue hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

const roles = [
  {
    id: 'patient',
    title: 'Patient',
    icon: User,
    description: 'Access healthcare with sign language support',
    features: [
      'Book video appointments',
      'Request ASL/LSM interpreters',
      'Live captions and text chat',
      'Secure medical records',
    ],
  },
  {
    id: 'provider',
    title: 'Provider',
    icon: Stethoscope,
    description: 'Deliver accessible healthcare to Deaf patients',
    features: [
      'Video consultations',
      'Interpreter coordination',
      'Patient management',
      'Clinical documentation',
    ],
  },
  {
    id: 'interpreter',
    title: 'Interpreter',
    icon: Languages,
    description: 'Provide medical interpretation services',
    features: [
      'Join video sessions',
      'Medical ASL/LSM specialization',
      'Flexible scheduling',
      'Professional certification',
    ],
  },
]
