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

// import { useAuth } from '../../../src-bs/utility/provider/AuthProvider'

const Register = () => {
  const { register, handleSubmit } = useForm()
  // const { onRegister } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(() => !showPassword)
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(() => !showConfirmPassword)

  const onSubmit = data => {
    console.log(data)

    axios
      .post('/api/auth/register', data)
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log(error))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='sm'>
        <ContainerCenter>
          <Card variant='outlined'>
            <CardContent>
              <Stack spacing={2}>
                <OutlinedInput fullWidth placeholder='Username' {...register('username')} />

                <OutlinedInput fullWidth placeholder='Email' {...register('email')} />

                <FormControl fullWidth variant='outlined'>
                  <OutlinedInput
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton color='primary' onClick={handleClickShowPassword} edge='end'>
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                    {...register('password')}
                  />
                </FormControl>

                <FormControl fullWidth variant='outlined'>
                  <OutlinedInput
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm Password'
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton color='primary' onClick={handleClickShowConfirmPassword} edge='end'>
                          {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                    {...register('confirmPassword')}
                  />
                </FormControl>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                  <Typography>
                    Already have a account?{' '}
                    <Link component={LinkBehavior} href='/login'>
                      Login
                    </Link>
                  </Typography>
                  <Button type='submit' variant='contained' color='primary'>
                    Register
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </ContainerCenter>
      </Container>
    </form>
  )
}

export default Register
