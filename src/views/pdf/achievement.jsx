import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { usePDFData } from './PDFDataContext'
import { accessObj } from './utils'

const Achievement = () => {
  const data = usePDFData()
  const getValue = accessObj(data)
  return (
    <Box component='section'>
      <Typography variant='h2' className='achievement__heading'>
        ACHIEVEMENT
      </Typography>
      <Divider />
      <ul>
        {getValue('achievement')?.map((element, index) => {
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
