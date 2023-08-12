import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { accessObj } from './utils'
import { usePDFData } from './PDFDataContext'

const Projects = () => {
  const data = usePDFData()
  const getValue = accessObj(data)
  return (
    <Box component='section'>
      <Typography variant='h2' className='projects__heading'>
        PROJECTS
      </Typography>
      <Divider />
      <ul>
        {getValue('projects')?.map((element, index) => {
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
