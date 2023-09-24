import ContainerCenter from '@/components/ContainerCenter'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useDispatch } from 'react-redux'

import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import { useFormContext } from 'react-hook-form'

import OTPInput from '@/components/OTPInput'
import PasswordInput from '@/components/PasswordInput'
import Box from '@mui/material/Box'
import IndexStepRender from './IndexStepRender'

const UserVerification = ({ children }) => {
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
      {children}
    </Stack>
  )
}

const OTPVerification = ({ children }) => {
  const dispatch = useDispatch()
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <Stack spacing={2}>
      <Box>
        <OTPInput length={6} name='otp' register={register} errors={errors} />
        <FormHelperText error>{!!errors.otp && errors.otp.filter(v => !!v)[0].message}</FormHelperText>
      </Box>
      {children}
    </Stack>
  )
}

const PasswordEntry = ({ children }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  console.log(errors)

  return (
    <Stack spacing={2}>
      <Box>
        <PasswordInput placeholder='Password' name='password' register={register} errors={errors} />
        <FormHelperText error>{errors.password?.message}</FormHelperText>
      </Box>
      <Box>
        <PasswordInput placeholder='Confirm Password' name='confirmPassword' register={register} errors={errors} />
        <FormHelperText error>{errors.confirmPassword?.message}</FormHelperText>
      </Box>
      {children}
    </Stack>
  )
}

const VerificationWizard = ({ currentStep, onSubmit, children }) => {
  const { handleSubmit } = useFormContext()
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ContainerCenter maxWidth='xs'>
        <Card variant='outlined'>
          <CardContent>
            <IndexStepRender stepIndex={currentStep}>
              <UserVerification onSubmit={onSubmit}>{children}</UserVerification>
              <OTPVerification onSubmit={onSubmit}>{children}</OTPVerification>
              <PasswordEntry onSubmit={onSubmit}>{children}</PasswordEntry>
            </IndexStepRender>
          </CardContent>
        </Card>
      </ContainerCenter>
    </form>
  )
}

export default VerificationWizard
