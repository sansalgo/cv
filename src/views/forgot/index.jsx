import VerificationWizard from '@/components/VerificationWizard'
import { checkUser, sendOTP, updateUser, verifyOTP } from '@/store/user'
import handleSignIn from '@/utils/handle-sign-in'
import schema from '@/utils/validation-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import Alert from '@mui/material/Alert'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import BetweenElse from '@/components/BetweenElse'
import IndexStepRender from '@/components/IndexStepRender'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

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
            <LoadingButton loading={isLoading === 'continue'} type='submit' variant='contained' color='primary'>
              <span>Continue</span>
            </LoadingButton>
          </BetweenElse>

          <BetweenElse>
            <Box>
              <Button sx={{ mr: 1 }} onClick={prevStep} variant='outlined' color='secondary'>
                Back
              </Button>
              <LoadingButton
                loading={isLoading == 'resend'}
                variant='outlined'
                onClick={() =>
                  handleOTPSend({ email: getValues('email'), username: getValues('username'), tag: 'resend' })
                }
                color='secondary'
              >
                <span>Resend</span>
              </LoadingButton>
            </Box>
            <LoadingButton loading={isLoading === 'verify'} type='submit' variant='contained' color='primary'>
              <span>Verify</span>
            </LoadingButton>
          </BetweenElse>

          <BetweenElse>
            <Button variant='outlined' onClick={handelCancel} color='secondary'>
              Cancel
            </Button>
            <LoadingButton loading={isLoading === 'reset'} type='submit' variant='contained' color='primary'>
              <span>Reset</span>
            </LoadingButton>
          </BetweenElse>
        </IndexStepRender>
      </VerificationWizard>
    </FormProvider>
  )
}

export default Forgot
