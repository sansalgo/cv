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
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import LinkBehavior from '@/components/LinkBehavior'
import ContainerCenter from '@/components/ContainerCenter'

const Login = () => {
  const { register, handleSubmit } = useForm()

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(() => !showPassword)

  const onSubmit = async data => {
    const credentials = {
      username: data.username,
      password: data.password,
      callbackUrl: '/preview'
    }
    const res = await signIn('credentials', credentials)

    if (res) {
      console.log('error', res.error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='sm'>
        <ContainerCenter>
          <Card variant='outlined'>
            <CardContent>
              <Stack spacing={2}>
                <OutlinedInput fullWidth placeholder='Username' {...register('username')} />

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

                <Box display='flex' justifyContent='space-between' alignItems='center'>
                  <Typography>
                    Don&apos;t have an account?{' '}
                    <Link component={LinkBehavior} href='/register'>
                      Register
                    </Link>
                  </Typography>
                  <Button type='submit' variant='contained' color='primary'>
                    Login
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

export default Login
