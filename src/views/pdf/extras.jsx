import { accessObj } from './utils'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Fragment } from 'react'

const Extras = ({ data }) => {
  return (
    <Box component='section'>
      <Typography variant='h2' className='extras__heading'>
        EXTRAS
      </Typography>
      <Divider />
      <ul>
        {accessObj(data)('extras')?.map((element, index) => {
          return (
            <li key={index}>
              <Typography>{element}</Typography>
            </li>
          )
        })}
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
      </ul>
    </Box>
  )
}

export default Extras
