import VerificationWizard from '@/components/VerificationWizard'
import { addUser, checkUser, sendOTP, verifyOTP } from '@/store/user'
import handleSignIn from '@/utils/handle-sign-in'
import schema from '@/utils/validation-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import BetweenElse from '@/components/BetweenElse'
import IndexStepRender from '@/components/IndexStepRender'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

const validationSchemas = [
  schema([{ field: 'username' }, { field: 'email' }]),
  schema([{ field: 'otp' }]),
  schema([{ field: 'password' }, { field: 'confirmPassword' }])
]

const Register = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const methods = useForm({ resolver: yupResolver(validationSchemas[currentStep]) })
  const dispatch = useDispatch()
  const router = useRouter()
  const { setError, setValue } = methods

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const onSubmit = async data => {
    console.log('submit', data)
    switch (currentStep) {
      case 0:
        const credentials = { email: data.email, username: data.username }
        try {
          await dispatch(checkUser({ ...credentials })).unwrap()
        } catch (error) {
          switch (error.status) {
            case 400:
              Object.keys(error.data).forEach(fieldName => {
                setError(fieldName, error.data[fieldName])
              })
              break
            case 409:
            case 500:
              toast.error(error.data.message)
              break
            case 404:
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
            addUser({
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
        <IndexStepRender stepIndex={currentStep}>
          <BetweenElse>
            <Button variant='outlined' color='secondary' onClick={() => router.push(`/login`)}>
              Login
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Register
            </Button>
          </BetweenElse>

          <BetweenElse>
            <Box>
              <Button sx={{ mr: 1 }} onClick={prevStep} variant='outlined' color='secondary'>
                Back
              </Button>
              <Button variant='outlined' onClick={resendOTP} color='secondary'>
                Resend
              </Button>
            </Box>
            <Button type='submit' variant='contained' color='primary'>
              Verify
            </Button>
          </BetweenElse>

          <BetweenElse>
            <Button type='submit' variant='contained' color='primary'>
              Register
            </Button>
          </BetweenElse>
        </IndexStepRender>
      </VerificationWizard>
    </FormProvider>
  )
}

export default Register
