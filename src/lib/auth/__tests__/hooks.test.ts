import { renderHook, waitFor } from '@testing-library/react'
import { useAuth } from '../hooks'

// Mock Supabase client
jest.mock('@/lib/supabase/client')

describe('useAuth Hook', () => {
  it('initializes with loading state', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.loading).toBe(true)
    expect(result.current.user).toBe(null)
    expect(result.current.profile).toBe(null)
  })

  it('provides sign in function', () => {
    const { result } = renderHook(() => useAuth())
    expect(typeof result.current.signIn).toBe('function')
  })

  it('provides sign up function', () => {
    const { result } = renderHook(() => useAuth())
    expect(typeof result.current.signUp).toBe('function')
  })

  it('provides sign out function', () => {
    const { result } = renderHook(() => useAuth())
    expect(typeof result.current.signOut).toBe('function')
  })

  it('provides reset password function', () => {
    const { result } = renderHook(() => useAuth())
    expect(typeof result.current.resetPassword).toBe('function')
  })

  it('provides update password function', () => {
    const { result } = renderHook(() => useAuth())
    expect(typeof result.current.updatePassword).toBe('function')
  })
})
