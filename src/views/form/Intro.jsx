import Grid from '@mui/material/Grid'
import { useFormContext } from 'react-hook-form'
// import OutlinedInput from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import { Children, cloneElement } from 'react'
import InputErrorHelper from '@/components/InputErrorHelper'

export default function Intro() {
  const {
    register,
    formState: { errors }
  } = useFormContext()
  return (
    <Card variant='outlined'>
      <CardHeader title='Intro' />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InputErrorHelper errorMessage={errors?.intro?.firstName?.message}>
              <OutlinedInput
                error={!!errors?.intro?.firstName?.message}
                fullWidth
                placeholder='First Name'
                {...register('intro.firstName')}
              />
            </InputErrorHelper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputErrorHelper errorMessage={errors?.intro?.lastName?.message}>
              <OutlinedInput
                error={!!errors?.intro?.lastName?.message}
                fullWidth
                placeholder='Last Name'
                {...register('intro.lastName')}
              />
            </InputErrorHelper>
          </Grid>

          <Grid item xs={12}>
            <InputErrorHelper errorMessage={errors?.intro?.position?.message}>
              <OutlinedInput
                error={!!errors?.intro?.position?.message}
                fullWidth
                placeholder='Position'
                {...register('intro.position')}
              />
            </InputErrorHelper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputErrorHelper errorMessage={errors?.intro?.email?.message}>
              <OutlinedInput
                error={!!errors?.intro?.email?.message}
                fullWidth
                placeholder='Email'
                {...register('intro.email')}
              />
            </InputErrorHelper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputErrorHelper errorMessage={errors?.intro?.phone?.message}>
              <OutlinedInput
                error={!!errors?.intro?.phone?.message}
                fullWidth
                placeholder='Phone'
                {...register('intro.phone')}
              />
            </InputErrorHelper>
          </Grid>

          <Grid item xs={12}>
            <InputErrorHelper errorMessage={errors?.intro?.city?.message}>
              <OutlinedInput
                error={!!errors?.intro?.city?.message}
                fullWidth
                placeholder='City'
                {...register('intro.city')}
              />
            </InputErrorHelper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputErrorHelper errorMessage={errors?.intro?.linkedin?.message}>
              <OutlinedInput
                error={!!errors?.intro?.linkedin?.message}
                fullWidth
                placeholder='Linkedin'
                {...register('intro.linkedin')}
              />
            </InputErrorHelper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputErrorHelper errorMessage={errors?.intro?.github?.message}>
              <OutlinedInput
                error={!!errors?.intro?.github?.message}
                fullWidth
                placeholder='GitHub'
                {...register('intro.github')}
              />
            </InputErrorHelper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
