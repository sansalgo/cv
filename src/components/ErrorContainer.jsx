import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ContainerCenter from './ContainerCenter'

const ErrorContainer = ({ children }) => {
  return (
    <ContainerCenter>
      <Box
        component={Typography}
        variant='subtitle1'
        color='primary.main'
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        {children}
      </Box>
    </ContainerCenter>
  )
}

export default ErrorContainer
