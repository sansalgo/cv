import InputErrorHelper from '@/components/InputErrorHelper'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useFormContext } from 'react-hook-form'

const ProfileSummary = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()
  return (
    <Card variant='outlined'>
      <CardHeader title='Profile Summary' />
      <CardContent>
        <InputErrorHelper errorMessage={errors?.profileSummary?.message}>
          <OutlinedInput
            error={!!errors?.profileSummary?.message}
            fullWidth
            placeholder='Profile Summary'
            multiline
            minRows={6}
            {...register('profileSummary')}
          />
        </InputErrorHelper>
      </CardContent>
    </Card>
  )
}

export default ProfileSummary
