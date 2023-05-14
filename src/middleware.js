import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname === '/register') {
        return true
      }
      return !!token
    }
  },
  pages: {
    signIn: '/login'
  }
})
