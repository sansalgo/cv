import { Controller, useForm } from 'react-hook-form'
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
import { useFormContext } from 'react-hook-form'
import PasswordInput from '@/components/PasswordInput'
import FormHelperText from '@mui/material/FormHelperText'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'


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

export default PasswordEntry
