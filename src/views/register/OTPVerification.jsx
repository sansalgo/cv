import { useForm, Controller, useFormContext } from 'react-hook-form'
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
import { useRef, useState } from 'react'
import axios from 'axios'
import LinkBehavior from '@/components/LinkBehavior'
import ContainerCenter from '@/components/ContainerCenter'
import OTPInput from '@/components/OTPInput'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormHelperText from '@mui/material/FormHelperText'
import { useDispatch } from 'react-redux'
import { sendOTP } from '@/store/user'
import { toast } from 'react-hot-toast'

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

  return (
    <Stack spacing={2}>
      <OTPInput length={6} name='otp' register={register} errors={errors} />
      <FormHelperText error>{!!errors.otp && errors.otp.filter(v => !!v)[0].message}</FormHelperText>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography onClick={resendOTP}>Resend OTP</Typography>
        <Button type='submit' variant='contained' color='primary'>
          Register
        </Button>
      </Box>
    </Stack>
  )
}

export default OTPVerification
