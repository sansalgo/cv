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
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Checkbox from '@mui/material/Checkbox'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import LinkBehavior from '@/components/LinkBehavior'
import ContainerCenter from '@/components/ContainerCenter'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import handleSignIn from '@/utils/handle-sign-in'
import BetweenElse from '@/components/BetweenElse'
import PasswordInput from '@/components/PasswordInput'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from '@/utils/validation-schema'
import Alert from '@mui/material/Alert'
import StyledCircularProgress from '@/components/StyledCircularProgress'

const Login = () => {
  const validationSchema = schema([
    { field: 'username', level: 'required' },
    { field: 'password', level: 'required' }
  ])
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema) })
  const router = useRouter()
  const [serverError, setServerError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async data => {
    try {
      setIsLoading(true)
      await handleSignIn(data).finally(() => setIsLoading(false))
    } catch (error) {
      console.log(error)
      const errorMessage = 'Invalid credentials. Please check your username and password and try again.'
      setServerError(errorMessage)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ContainerCenter maxWidth='xs'>
        <Card variant='outlined'>
          <CardContent>
            <Stack spacing={2}>
              <Box>
                <OutlinedInput fullWidth placeholder='Username' error={!!errors.username} {...register('username')} />
                <FormHelperText error>{errors.username?.message}</FormHelperText>
              </Box>
              <Box>
                <PasswordInput placeholder='Password' name='password' register={register} errors={errors} />
                <FormHelperText error>{errors.password?.message}</FormHelperText>
              </Box>
              {serverError ? <Alert severity='error'>{serverError}</Alert> : null}
              <BetweenElse>
                <FormControlLabel control={<Checkbox sx={{ p: 0, px: '9px' }} />} label='Remember Me' />
                <Link component={LinkBehavior} href='/forgot'>
                  Forgot Password?
                </Link>
              </BetweenElse>
              <BetweenElse>
                <Button variant='outlined' color='secondary' onClick={() => router.push(`/register`)}>
                  Register
                </Button>
                <Button disabled={isLoading} type='submit' variant='contained' color='primary'>
                  {isLoading ? <StyledCircularProgress disabled={isLoading} /> : 'Login'}
                </Button>
              </BetweenElse>
            </Stack>
          </CardContent>
        </Card>
      </ContainerCenter>
    </form>
  )
}

export default Login
