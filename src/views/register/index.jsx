import { useForm } from 'react-hook-form'
import OutlinedInput from '@mui/material/OutlinedInput'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { useState } from 'react'
import axios from 'axios'
import LinkBehavior from '@/components/LinkBehavior'
import ContainerCenter from '@/components/ContainerCenter'
import { FormProvider } from 'react-hook-form'
import UserVerification from './UserVerification'
import OTPVerification from './OTPVerification'
import PasswordEntry from './PasswordEntry'
import ConditionalRender from '@/components/ConditionalRender'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, checkUser, sendOTP, verifyOTP } from '@/store/user'

const schema = [
  yup.object({
    username: yup
      .string()
      .required('Username is required')
      .matches(/^[a-z][a-z0-9_]*$/, 'Username must be lowercase and can contain only letters, numbers and underscores')
      .min(3, 'Username must be at least 3 characters long')
      .max(20, 'Username cannot exceed 13 characters'),
    email: yup.string().email('Invalid email format').required('Email is required')
  }),
  yup.object({
    otp: yup.array().of(yup.string().required('OTP is required'))
  }),
  yup.object({
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
      )
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Password must match')
      .required('Confirm Password is required')
  })
]

const Register = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const methods = useForm({ resolver: yupResolver(schema[currentStep]) })
  const dispatch = useDispatch()
  const { handleSubmit, trigger, setError, setValue } = methods

  const nextStep = async () => {
    setCurrentStep(currentStep + 1)
  }

  const onSubmit = async data => {
    console.log('submit', data)
    switch (currentStep) {
      case 0:
        console.log(currentStep)
        try {
          await dispatch(checkUser({ email: data.email, username: data.username })).unwrap()
        } catch (error) {
          switch (error.status) {
            case 409:
              Object.keys(error.data).forEach(fieldName => {
                setError(fieldName, error.data[fieldName])
              })
              break
            case 422:
              toast.error(error.data.error)
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
          toast.error(error.data.error)
        }
        break
      case 2:
        try {
          await dispatch(
            addUser({
              username: data.username,
              email: data.email,
              verificationSign: data,
              verificationSign,
              password: data.confirmPassword
            }).unwrap()
          )
        } catch (error) {
          toast.error(error.data.message)
        }
    }
    return

    axios
      .post('/api/otp/send', data)
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log(error))
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth='sm'>
          <ContainerCenter>
            <Card variant='outlined'>
              <CardContent>
                <ConditionalRender value={currentStep === 0}>
                  <UserVerification onSubmit={onSubmit} />
                </ConditionalRender>
                <ConditionalRender value={currentStep === 1}>
                  <OTPVerification onSubmit={onSubmit} />
                </ConditionalRender>
                <ConditionalRender value={currentStep === 2}>
                  <PasswordEntry onSubmit={onSubmit} />
                </ConditionalRender>
              </CardContent>
            </Card>
          </ContainerCenter>
        </Container>
      </form>
    </FormProvider>
  )
}

export default Register
