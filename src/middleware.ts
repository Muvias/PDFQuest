import { authMiddleware } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/sign-in', request.url))
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth-callback'],
}

export default authMiddleware