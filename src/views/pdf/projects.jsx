import { Fragment } from 'react'
import { accessObj } from './utils'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

const Projects = ({ data }) => {
  return (
    <Box component='section'>
      <Typography variant='h2' className='projects__heading'>
        PROJECTS
      </Typography>
      <Divider />
      <ul>
        {accessObj(data)('projects')?.map((element, index) => {
          return (
            <li key={index} className='projects__item'>
              <Typography>{element}</Typography>
            </li>
          )
        })}
      </ul>
    </Box>
  )
}

export default Projects
