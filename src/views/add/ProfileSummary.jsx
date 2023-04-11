import React from 'react'
import { useFormContext } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import OutlinedInput from '@mui/material/OutlinedInput'

const ProfileSummary = () => {
  const { register } = useFormContext()
  return <OutlinedInput fullWidth placeholder='Profile Summary' multiline minRows={6} {...register('profileSummary')} />
}

export default ProfileSummary
