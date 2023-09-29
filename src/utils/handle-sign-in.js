import { signIn } from 'next-auth/react'
import Router from 'next/router'

const handleSignIn = async data => {
  const credentials = {
    username: data.username,
    password: data.password,
    rememberMe: data.rememberMe
  }
  const parameters = {
    redirect: false,
    callbackUrl: `${window.location.origin}`
  }

  const res = await signIn('credentials', { ...credentials, ...parameters })

  if (res?.error) {
    throw res.error
  }

  if (res.url) {
    Router.push(res.url)
  }
}

export default handleSignIn
