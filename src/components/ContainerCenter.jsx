import { styled } from '@mui/material'
import MuiBox from '@mui/material/Box'
import Container from '@mui/material/Container'

const Box = styled(MuiBox)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%'
}))

const ContainerCenter = ({ children, ...rest }) => (
  <Box>
    <Container {...rest}>{children}</Container>
  </Box>
)

export default ContainerCenter
