import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useFormContext } from 'react-hook-form'

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
