import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { accessObj } from './utils'
import { usePDFData } from './PDFDataContext'

const Skills = () => {
  const data = usePDFData()
  const getValue = accessObj(data)
  return (
    <Box component='section'>
      <Typography variant='h2' className='skills__heading'>
        SKILLS
      </Typography>
      <Divider />
      <Box>
        <Grid container spacing={0.5}>
          {getValue('skills')?.map((element, index) => {
            return (
              <Grid item key={index}>
                <Chip label={element} />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}

export default Skills
