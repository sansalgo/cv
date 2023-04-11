import connectToDatabase from '@/lib/mongodb'
import User from '@/models/user'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
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
export default NextAuth(authOptions)
