import DashedDivider from '@/components/DashedDivider'
import IconText from '@/components/IconText'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Fragment } from 'react'
import { usePDFData } from './PDFDataContext'
import { accessObj, formatMonthYear } from './utils'

const EmploymentHistory = () => {
  const data = usePDFData()
  const getValue = accessObj(data)
  return (
    <Box component='section'>
      <Typography variant='h2' sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        EMPLOYMENT HISTORY
      </Typography>
      <Divider />
      {getValue('employmentHistory')?.map((element, index) => {
        return (
          <Fragment key={index}>
            <Typography variant='h4' sx={{ fontWeight: 'normal' }} mt={1}>
              {element.position}{' '}
              <Box display='inline' color='blue'>
                | {element.companyName}
              </Box>
            </Typography>

            <Stack direction='row' spacing={10} mt={0.5} mb={0.5}>
              <IconText
                icon={<CalendarMonthRoundedIcon />}
                text={`${formatMonthYear(element.startDate)} - ${formatMonthYear(element.endDate)}`}
              />

              <IconText icon={<LocationOnRoundedIcon />} text={`${element.location}`} />
            </Stack>
            <Stack>
              <Typography variant='caption' color='secondary.main'>
                Description:
              </Typography>

              <Typography>{element.description}</Typography>
            </Stack>
            {index !== getValue('employmentHistory').length - 1 && <DashedDivider />}
          </Fragment>
        )
      })}
    </Box>
  )
}

export default EmploymentHistory
