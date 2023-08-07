import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { accessObj } from './utils'
const ProfileSummary = ({ data }) => {
  return (
    <Box component='section'>
      <Typography variant='h2'>PROFILE SUMMARY</Typography>
      <Divider />
      <Typography variant='body1'>{accessObj(data)('profileSummary')}</Typography>
    </Box>
  )
}

export default ProfileSummary
