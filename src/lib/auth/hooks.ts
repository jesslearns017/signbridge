'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '@/types/database.types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    // Audit log for HIPAA compliance
    if (data.user) {
      await supabase.from('audit_logs').insert({
        user_id: data.user.id,
        action: 'sign_in',
        resource_type: 'auth',
      })
    }

    return data
  }

  async function signUp(
    email: string,
    password: string,
    role: 'patient' | 'provider' | 'interpreter',
    additionalData: Partial<Profile>
  ) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          ...additionalData,
        },
      },
    })

    if (error) throw error

    // Create profile
    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        role,
        ...additionalData,
      })

      if (profileError) throw profileError

      // Audit log
      await supabase.from('audit_logs').insert({
        user_id: data.user.id,
        action: 'sign_up',
        resource_type: 'auth',
      })
    }

    return data
  }

  async function signOut() {
    // Audit log before sign out
    if (user) {
      await supabase.from('audit_logs').insert({
        user_id: user.id,
        action: 'sign_out',
        resource_type: 'auth',
      })
    }

    const { error } = await supabase.auth.signOut()
    if (error) throw error

    router.push('/login')
  }

  async function resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) throw error
  }

  async function updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) throw error

    // Audit log
    if (user) {
      await supabase.from('audit_logs').insert({
        user_id: user.id,
        action: 'password_change',
        resource_type: 'auth',
      })
    }
  }

  return {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
  }
}

export function useRequireAuth(redirectTo: string = '/login') {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo)
    }
  }, [user, loading, router, redirectTo])

  return { user, loading }
}
