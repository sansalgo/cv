import React from 'react'
import { useFormContext } from 'react-hook-form'
import Grid from '@mui/material/Grid'
// import OutlinedInput from '@mui/material/TextField'
import OutlinedInput from '@mui/material/OutlinedInput'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

export default function Intro() {
  const { register } = useFormContext()
  return (
    <Card variant='outlined'>
      <CardHeader title='Intro' />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <OutlinedInput fullWidth placeholder='First Name' {...register('firstName')} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OutlinedInput fullWidth placeholder='Last Name' {...register('lastName')} />
          </Grid>

          <Grid item xs={12}>
            <OutlinedInput fullWidth placeholder='Position' {...register('position')} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <OutlinedInput fullWidth placeholder='Email' {...register('email')} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OutlinedInput fullWidth placeholder='Phone' {...register('phone')} />
          </Grid>

          <Grid item xs={12}>
            <OutlinedInput fullWidth placeholder='City' {...register('city')} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <OutlinedInput fullWidth placeholder='Linkedin' {...register('linkedin')} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OutlinedInput fullWidth placeholder='GitHub' {...register('github')} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
