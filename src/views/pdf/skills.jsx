import { Fragment } from 'react'
import { accessObj } from './utils'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

const Skills = ({ data }) => {
  return (
    <Box component='section'>
      <Typography variant='h2' className='skills__heading'>
        SKILLS
      </Typography>
      <Divider />
      <Box>
        <Grid container spacing={0.5}>
          {accessObj(data)('skills')?.map((element, index) => {
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
