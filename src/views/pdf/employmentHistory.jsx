// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendar, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import { accessObj, formatMonthYear } from './utils'
import { Fragment } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import DashedDivider from '@/components/DashedDivider'
import IconText from '@/components/IconText'

const EmploymentHistory = ({ data }) => {
  return (
    <Box component='section'>
      <Typography variant='h2' sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        EMPLOYMENT HISTORY
      </Typography>
      <Divider />
      {accessObj(data)('employmentHistory')?.map((element, index) => {
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
            {index !== accessObj(data)('employmentHistory').length - 1 && <DashedDivider />}
          </Fragment>
        )
      })}
    </Box>
  )
}

export default EmploymentHistory
