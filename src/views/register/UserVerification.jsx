import { useForm, useFormContext } from 'react-hook-form'
import OutlinedInput from '@mui/material/OutlinedInput'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormHelperText from '@mui/material/FormHelperText'
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
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'


const UserVerification = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  console.log(errors)

  return (
 
      <Stack spacing={2}>
        <OutlinedInput fullWidth placeholder='Username' error={!!errors.username} {...register('username')} />
        <FormHelperText error>{errors.username?.message}</FormHelperText>
        <OutlinedInput fullWidth placeholder='Email' error={!!errors.email} {...register('email')} />
        <FormHelperText error>{errors.email?.message}</FormHelperText>
        <FormHelperText error>{errors.user?.message}</FormHelperText>
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
      </Stack>
   
  )
}

export default UserVerification
