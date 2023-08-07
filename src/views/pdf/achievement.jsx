import { Fragment } from 'react'
import { accessObj } from './utils'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Achievement = ({ data }) => {
  return (
    <Box component='section'>
      <Typography variant='h2' className='achievement__heading'>
        ACHIEVEMENT
      </Typography>
      <Divider />
      <ul>
        {accessObj(data)('achievement')?.map((element, index) => {
          return (
            <li key={index}>
              <Typography> {element}</Typography>
            </li>
          )
        })}
      </ul>
    </Box>
  )
}

export default Achievement
