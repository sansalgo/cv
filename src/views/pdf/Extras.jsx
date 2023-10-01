import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { usePDFData } from './PDFDataContext'
import { accessObj } from './utils'

const Extras = () => {
  const data = usePDFData()
  const getValue = accessObj(data)
  return (
    <Box component='section'>
      <Typography variant='h2' className='extras__heading'>
        EXTRAS
      </Typography>
      <Divider />
      <ul>
        {getValue('extras')?.map((element, index) => {
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

export default Extras
