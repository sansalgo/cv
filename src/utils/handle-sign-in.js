import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import Router from 'next/router'
import { enqueueSnackbar } from 'notistack'

const handleSignIn = async data => {
  const credentials = {
    username: data.username,
    password: data.password
  }
  const parameters = {
    redirect: false,
    callbackUrl: `${window.location.origin}`
  }

  const res = await signIn('credentials', { ...credentials, ...parameters })

  if (res?.error) {
    console.log(res.error)
    // toast.error(data.errorMessage)

    enqueueSnackbar(data.errorMessage, {
      variant: 'error',
      persist: true,
      preventDuplicate: true,
      style: { whiteSpace: 'pre-line' }
    })
  }
  if (res.url) {
    Router.push(res.url)
  }
}

export default handleSignIn
