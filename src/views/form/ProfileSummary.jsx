import React from 'react'
import { useFormContext } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import OutlinedInput from '@mui/material/OutlinedInput'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

const ProfileSummary = () => {
  const { register } = useFormContext()
  return (
    <Card variant='outlined'>
      <CardHeader title='Profile Summary' />
      <CardContent>
        <OutlinedInput fullWidth placeholder='Profile Summary' multiline minRows={6} {...register('profileSummary')} />
      </CardContent>
    </Card>
  )
}

export default ProfileSummary
