import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { usePDFData } from './PDFDataContext'
import { accessObj } from './utils'
const ProfileSummary = () => {
  const data = usePDFData()
  const getValue = accessObj(data)
  return (
    <Box component='section'>
      <Typography variant='h2'>PROFILE SUMMARY</Typography>
      <Divider />
      <Typography variant='body1'>{getValue('profileSummary')}</Typography>
    </Box>
  )
}

export default ProfileSummary
