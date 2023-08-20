import ConditionalRender from '@/components/ConditionalRender'
import ContainerCenter from '@/components/ContainerCenter'
import { sendOTP } from '@/store/user'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import { useFormContext } from 'react-hook-form'

import OTPInput from '@/components/OTPInput'
import PasswordInput from '@/components/PasswordInput'
import { useEffect } from 'react'
import Box from '@mui/material/Box'

const UserVerification = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <Stack spacing={2}>
      <Box>
        <OutlinedInput fullWidth placeholder='Username' error={!!errors.username} {...register('username')} />
        <FormHelperText error>{errors.username?.message}</FormHelperText>
      </Box>
      <Box>
        <OutlinedInput fullWidth placeholder='Email' error={!!errors.email} {...register('email')} />
        <FormHelperText error>{errors.email?.message}</FormHelperText>
        <FormHelperText error>{errors.user?.message}</FormHelperText>
      </Box>
    </Stack>
  )
}

const OTPVerification = () => {
  const dispatch = useDispatch()
  const {
    register,
    getValues,
    formState: { errors }
  } = useFormContext()

  const resendOTP = async () => {
    await dispatch(sendOTP({ email: getValues('email') }))
      .unwrap()
      .then(() => toast.success('OTP send successfully'))
  }

  useEffect(() => {
    const resendOTPButton = document.getElementById('resendOTPButton')
    resendOTPButton.addEventListener('click', resendOTP)

    return () => {
      resendOTPButton.removeEventListener('click', resendOTP)
    }
  })

  return (
    <Stack spacing={2}>
      <OTPInput length={6} name='otp' register={register} errors={errors} />
      <FormHelperText error>{!!errors.otp && errors.otp.filter(v => !!v)[0].message}</FormHelperText>
    </Stack>
  )
}

const PasswordEntry = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  console.log(errors)

  return (
    <Stack spacing={2}>
      <PasswordInput placeholder='Password' name='password' register={register} errors={errors} />
      <FormHelperText error>{errors.password?.message}</FormHelperText>
      <PasswordInput placeholder='Confirm Password' name='confirmPassword' register={register} errors={errors} />
      <FormHelperText error>{errors.confirmPassword?.message}</FormHelperText>
    </Stack>
  )
}

const VerificationWizard = ({ currentStep, onSubmit, children }) => {
  const { handleSubmit } = useFormContext()
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='sm'>
        <ContainerCenter>
          <Card variant='outlined'>
            <CardContent>
              <ConditionalRender condition={currentStep === 0}>
                {() => <UserVerification onSubmit={onSubmit} />}
              </ConditionalRender>
              <ConditionalRender condition={currentStep === 1}>
                {() => <OTPVerification onSubmit={onSubmit} />}
              </ConditionalRender>
              <ConditionalRender condition={currentStep === 2}>
                {() => <PasswordEntry onSubmit={onSubmit} />}
              </ConditionalRender>
              {children}
            </CardContent>
          </Card>
        </ContainerCenter>
      </Container>
    </form>
  )
}

export default VerificationWizard
