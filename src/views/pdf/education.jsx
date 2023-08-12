import DashedDivider from '@/components/DashedDivider'
import IconText from '@/components/IconText'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { usePDFData } from './PDFDataContext'
import { accessObj, formatMonthYear } from './utils'

const Education = () => {
  const data = usePDFData()
  const getValue = accessObj(data)
  return (
    <Box component='section'>
      <Typography variant='h2'>EDUCATION</Typography>
      <Divider />
      {getValue('education')?.map((element, index) => {
        return (
          <Box mt={1} mb={1} key={index}>
            <Typography variant='h4'>
              {element.course}&nbsp;
              <Box display='inline' color='blue'>
                | {element.institution}
              </Box>
            </Typography>
            <Stack direction='row' spacing={10} mt={0.5} mb={0.5}>
              <IconText
                icon={<CalendarMonthRoundedIcon />}
                text={`${formatMonthYear(element.startDate)} - ${formatMonthYear(element.endDate)}`}
              />

              <IconText icon={<LocationOnRoundedIcon />} text={`${element.location}`} />
            </Stack>

            <Box component='ul' color='secondary.main'>
              <Box component='li' color='secondary.main'>
                <Typography>Percentage : {element.percentage}</Typography>
              </Box>
            </Box>

            {index !== getValue('education').length - 1 && <DashedDivider />}
          </Box>
        )
      })}
    </Box>
  )
}

export default Education
