import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export default async function middleware(req, event) {
  const token = await getToken({ req })
  const isAuthenticated = !!token
  const pathname = req.nextUrl.pathname
  const restrictedPathnames = ['/login', '/register', '/forgot']
  if (isAuthenticated && restrictedPathnames.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  if (restrictedPathnames.includes(pathname)) {
    return
  }

  const authMiddleware = await withAuth({
    pages: {
      signIn: '/login'
    }
  })
  return authMiddleware(req, event)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
