import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/types/database.types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Audit logging for HIPAA compliance
  if (session?.user) {
    const { pathname } = req.nextUrl

    // Log access to PHI-containing routes
    if (
      pathname.startsWith('/dashboard') ||
      pathname.startsWith('/appointments') ||
      pathname.startsWith('/patients') ||
      pathname.startsWith('/video-call')
    ) {
      await supabase.from('audit_logs').insert({
        user_id: session.user.id,
        action: 'page_view',
        resource_type: 'page',
        resource_id: pathname,
        ip_address: req.ip || req.headers.get('x-forwarded-for'),
        user_agent: req.headers.get('user-agent'),
      })
    }
  }

  // Protect routes that require authentication
  const protectedPaths = ['/dashboard', '/appointments', '/video-call', '/profile']
  const isProtectedPath = protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))

  if (isProtectedPath && !session) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/login'
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/appointments/:path*',
    '/video-call/:path*',
    '/profile/:path*',
    '/patients/:path*',
  ],
}
