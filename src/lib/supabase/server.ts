import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database.types'

export const createServerClient = () =>
  createServerComponentClient<Database>({ cookies })

// Alias for backward compatibility
export const createClient = createServerClient
