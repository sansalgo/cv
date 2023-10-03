import VerificationWizard from '@/components/VerificationWizard'
import { checkUser, sendOTP, updateUser, verifyOTP } from '@/store/user'
import handleSignIn from '@/utils/handle-sign-in'
import schema from '@/utils/validation-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Alert from '@mui/material/Alert'
import { useDispatch } from 'react-redux'

import BetweenElse from '@/components/BetweenElse'
import IndexStepRender from '@/components/IndexStepRender'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import StyledCircularProgress from '@/components/StyledCircularProgress'

const validationSchemas = [
  schema([{ field: 'username', level: 'required' }, { field: 'email' }]),
  schema([{ field: 'otp' }]),
  schema([{ field: 'password' }, { field: 'confirmPassword' }])
]

const Forgot = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const methods = useForm({ resolver: yupResolver(validationSchemas[currentStep]) })
  const [isLoading, setIsLoading] = useState(null)
  const [serverError, setServerError] = useState(null)
  const dispatch = useDispatch()
  const router = useRouter()
  const { setValue, getValues } = methods

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  useEffect(() => {
    if (serverError) {
      setServerError(null)
    }
  }, [currentStep])

  const handelCancel = () => {
    router.push(`/login`)
  }

  const handleOTPSend = async ({ email, username, next = null, tag = null }) => {
    try {
      if (tag) setIsLoading(tag)
      await dispatch(sendOTP({ email, username })).unwrap()
      if (next) next()
    } catch (error) {
      console.log(error)
      setServerError(error.data.error)
    } finally {
      if (tag) setIsLoading(null)
    }
  }

  const onSubmit = async data => {
    switch (currentStep) {
      case 0:
        const credentials = { email: data.email, username: data.username }
        const errorOptions = { accountError: false }
        try {
          setIsLoading('continue')
          await dispatch(checkUser({ ...credentials, errorOptions }))
            .unwrap()
            .finally(() => setIsLoading(null))
        } catch (error) {
          switch (error.status) {
            case 404:
              setServerError(error.data.message)
              break
            case 409:
              handleOTPSend({ email: data.email, username: data.username, next: nextStep, tag: 'continue' })
              break
          }
        }
        break
      case 1:
        try {
          setIsLoading('verify')
          await dispatch(verifyOTP({ email: data.email, otp: data.otp.join('') }))
            .unwrap()
            .then(({ verificationSign }) => {
              setValue('verificationSign', verificationSign)
              nextStep()
            })
            .finally(() => setIsLoading(null))
        } catch (error) {
          setServerError(error.data.message)
        }
        break
      case 2:
        try {
          setIsLoading('reset')
          await dispatch(
            updateUser({
              username: data.username,
              email: data.email,
              verificationSign: data.verificationSign,
              password: data.confirmPassword
            })
          ).unwrap()

          await handleSignIn({ ...data, errorMessage: 'Something went wrong' }).finally(() => setIsLoading(null))
        } catch (error) {
          console.log(error)
          setServerError(error.data.message)
        }
      default:
        break
    }
  }

  return (
    <FormProvider {...methods}>
      <VerificationWizard currentStep={currentStep} onSubmit={onSubmit}>
        {serverError ? <Alert severity='error'>{serverError}</Alert> : null}
        <IndexStepRender stepIndex={currentStep}>
          <BetweenElse>
            <Button variant='outlined' color='secondary' onClick={handelCancel}>
              Login
            </Button>
            <Button disabled={!!isLoading} type='submit' variant='contained' color='primary'>
              {isLoading === 'continue' ? <StyledCircularProgress disabled={!!isLoading} /> : 'Continue'}
            </Button>
          </BetweenElse>

          <BetweenElse>
            <Box>
              <Button sx={{ mr: 1 }} onClick={prevStep} variant='outlined' color='secondary'>
                Back
              </Button>
              <Button
                disabled={!!isLoading}
                variant='outlined'
                onClick={() =>
                  handleOTPSend({ email: getValues('email'), username: getValues('username'), tag: 'resend' })
                }
                color='secondary'
              >
                {isLoading == 'resend' ? <StyledCircularProgress disabled={!!isLoading} /> : 'Resend'}
              </Button>
            </Box>
            <Button disabled={!!isLoading} type='submit' variant='contained' color='primary'>
              {isLoading === 'verify' ? <StyledCircularProgress disabled={!!isLoading} /> : 'Verify'}
            </Button>
          </BetweenElse>

          <BetweenElse>
            <Button variant='outlined' onClick={handelCancel} color='secondary'>
              Cancel
            </Button>
            <Button disabled={!!isLoading} type='submit' variant='contained' color='primary'>
              {isLoading === 'reset' ? <StyledCircularProgress disabled={!!isLoading} /> : 'Reset'}
            </Button>
          </BetweenElse>
        </IndexStepRender>
      </VerificationWizard>
    </FormProvider>
  )
}

export default Forgot
