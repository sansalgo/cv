import IconText from '@/components/IconText'
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Fragment } from 'react'
import { accessObj } from './utils'
import { useSelector } from 'react-redux'

const Intro = ({ data }) => {
  // const { record } = useSelector(state => state.record)
  // const record = JSON.parse(localStorage.getItem('record'))
  // console.log(record)
  return (
    <Box>
      <Typography variant='h1'>
        {accessObj(data)('intro.firstName')?.toUpperCase()} {accessObj(data)('intro.lastName')?.toUpperCase()}
      </Typography>
      <Typography variant='h3' sx={{ fontFamily: 'Lato' }}>
        {accessObj(data)('intro.position')?.toUpperCase()}
      </Typography>
      <Grid container direction='row' columnSpacing={2} rowSpacing={-1}>
        <Grid item>
          <IconText icon={<AlternateEmailRoundedIcon />} text={accessObj(data)('intro.email')} />
        </Grid>
        <Grid item>
          <IconText icon={<PhoneRoundedIcon />} text={accessObj(data)('intro.phone')} />
        </Grid>
        <Grid item>
          <IconText icon={<LocationOnRoundedIcon />} text={accessObj(data)('intro.city')} />
        </Grid>
        <Grid item>
          <IconText icon={<LinkedInIcon />} text={accessObj(data)('intro.linkedin')} />
        </Grid>
        <Grid item>
          <IconText icon={<GitHubIcon />} text={accessObj(data)('test')} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Intro
