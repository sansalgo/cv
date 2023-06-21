import ConditionalRender from '@/components/ConditionalRender'
import VerificationWizard from '@/components/VerificationWizard'
import { addUser, checkUser, sendOTP, updateUser, verifyOTP } from '@/store/user'
import handleSignIn from '@/utils/handle-sign-in'
import schema from '@/utils/validation-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import LinkBehavior from '@/components/LinkBehavior'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const validationSchemas = [
  schema([{ field: 'username', level: 'required' }, { field: 'email' }]),
  schema([{ field: 'otp' }]),
  schema([{ field: 'password' }, { field: 'confirmPassword' }])
]

const Forgot = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const methods = useForm({ resolver: yupResolver(validationSchemas[currentStep]) })
  const dispatch = useDispatch()
  const { setError, setValue } = methods

  const nextStep = async () => {
    setCurrentStep(currentStep + 1)
  }

  const onSubmit = async data => {
    console.log('submit', data)
    switch (currentStep) {
      case 0:
        console.log(currentStep)
        const credentials = { email: data.email, username: data.username }
        const errorOptions = { accountError: false }
        try {
          await dispatch(checkUser({ ...credentials, errorOptions })).unwrap()
        } catch (error) {
          switch (error.status) {
            case 404:
              toast.error(error.data.message)
              break
            case 409:
              try {
                await dispatch(sendOTP({ email: data.email })).unwrap()
                nextStep()
              } catch (error) {
                toast.error(error.data.error)
              }
              break
          }
        }
        break
      case 1:
        try {
          await dispatch(verifyOTP({ email: data.email, otp: data.otp.join('') }))
            .unwrap()
            .then(({ verificationSign }) => {
              setValue('verificationSign', verificationSign)
              nextStep()
            })
        } catch (error) {
          toast.error(error.data.message)
        }
        break
      case 2:
        try {
          await dispatch(
            updateUser({
              username: data.username,
              email: data.email,
              verificationSign: data.verificationSign,
              password: data.confirmPassword
            })
          ).unwrap()
          await handleSignIn({ ...data, errorMessage: 'Something went wrong' })
        } catch (error) {
          console.log(error)
          // toast.error(error.data.message)
        }
      default:
        break
    }
  }

  return (
    <FormProvider {...methods}>
      <VerificationWizard currentStep={currentStep} onSubmit={onSubmit}>
        <ConditionalRender value={currentStep === 0}>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography>
              Already have a account?&nbsp;
              <Link component={LinkBehavior} href='/login'>
                Login
              </Link>
            </Typography>
            <Button type='submit' variant='contained' color='primary'>
              Register
            </Button>
          </Box>
        </ConditionalRender>
        <ConditionalRender value={currentStep === 1}>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography id='resendOTPButton'>Resend OTP</Typography>
            <Button type='submit' variant='contained' color='primary'>
              Register
            </Button>
          </Box>
        </ConditionalRender>
        <ConditionalRender value={currentStep === 2}>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography>
              Already have a account?&nbsp;
              <Link component={LinkBehavior} href='/login'>
                Login
              </Link>
            </Typography>
            <Button type='submit' variant='contained' color='primary'>
              Register
            </Button>
          </Box>
        </ConditionalRender>
      </VerificationWizard>
    </FormProvider>
  )
}

export default Forgot
