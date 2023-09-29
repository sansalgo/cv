import connectToDatabase from '@/lib/mongodb'
import User from '@/models/user'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { parseCookies, setCookie } from 'nookies'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'Remember Me', type: 'checkbox' }
      },
      async authorize(credentials, req) {
        connectToDatabase()

        const { username, password } = credentials
        try {
          const user = await User.findOne({ username: username })

          if (!user) {
            return null
          }

          const isMatch = await user.comparePassword(password)

          if (!isMatch) {
            return null
          }

          return { id: user._id, username: user.username, email: user.email }
        } catch (error) {
          throw new Error('Could not authenticate user')
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user)
      return token
    },
    session: async ({ session, token }) => {
      session.user = token.user
      return session
    }
  }
}

export default async function auth(req, res) {
  const cookies = parseCookies({ req })

  let maxAge = 1 * 24 * 60 * 60 // one day in seconds
  const eightyFourDays = 84 * 24 * 60 * 60 // in seconds

  if (cookies['rememberMe']) {
    maxAge = cookies['rememberMe'] == 'true' ? eightyFourDays : maxAge
  } else if (req.body.rememberMe) {
    maxAge = req.body.rememberMe == 'true' ? eightyFourDays : maxAge

    setCookie({ res }, 'rememberMe', req.body.rememberMe, {
      maxAge,
      path: '/'
    })
  }

  return await NextAuth(req, res, {
    ...authOptions,
    session: { maxAge }
  })
}
