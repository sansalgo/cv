import { Fragment } from 'react'
import { accessObj } from './utils'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { usePDFData } from './PDFDataContext'

const Languages = () => {
  const data = usePDFData()
  const getValue = accessObj(data)
  return (
    <Box component='section'>
      <Typography variant='h2'>LANGUAGES</Typography>
      <Divider />
      <ul>
        {getValue('languages')?.map((element, index) => {
          return (
            <li key={index}>
              <Typography>{element}</Typography>
            </li>
          )
        })}
      </ul>
    </Box>
  )
}

export default Languages
