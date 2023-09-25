import IconText from '@/components/IconText'
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { usePDFData } from './PDFDataContext'
import { accessObj } from './utils'

const Intro = () => {
  const data = usePDFData()
  const getValue = accessObj(data)
  return (
    <Box>
      <Typography variant='h1'>
        {getValue('intro.firstName')?.toUpperCase()} {getValue('intro.lastName')?.toUpperCase()}
      </Typography>
      <Typography variant='h3'>
        {getValue('intro.position')?.toUpperCase()}
      </Typography>
      <Grid container direction='row' columnSpacing={2} rowSpacing={-1}>
        <Grid item>
          <IconText icon={<AlternateEmailRoundedIcon />} text={getValue('intro.email')} />
        </Grid>
        <Grid item>
          <IconText icon={<PhoneRoundedIcon />} text={getValue('intro.phone')} />
        </Grid>
        <Grid item>
          <IconText icon={<LocationOnRoundedIcon />} text={getValue('intro.city')} />
        </Grid>
        <Grid item>
          <IconText icon={<LinkedInIcon />} text={getValue('intro.linkedin')} />
        </Grid>
        <Grid item>
          <IconText icon={<GitHubIcon />} text={getValue('intro.github')} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Intro
