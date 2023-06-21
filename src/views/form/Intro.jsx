import Grid from '@mui/material/Grid'
import { useFormContext } from 'react-hook-form'
// import OutlinedInput from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import OutlinedInput from '@mui/material/OutlinedInput'

export default function Intro() {
  const { register } = useFormContext()
  return (
    <Card variant='outlined'>
      <CardHeader title='Intro' />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <OutlinedInput fullWidth placeholder='First Name' {...register('intro.firstName')} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OutlinedInput fullWidth placeholder='Last Name' {...register('intro.lastName')} />
          </Grid>

          <Grid item xs={12}>
            <OutlinedInput fullWidth placeholder='Position' {...register('intro.position')} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <OutlinedInput fullWidth placeholder='Email' {...register('intro.email')} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OutlinedInput fullWidth placeholder='Phone' {...register('intro.phone')} />
          </Grid>

          <Grid item xs={12}>
            <OutlinedInput fullWidth placeholder='City' {...register('intro.city')} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <OutlinedInput fullWidth placeholder='Linkedin' {...register('intro.linkedin')} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OutlinedInput fullWidth placeholder='GitHub' {...register('intro.github')} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
