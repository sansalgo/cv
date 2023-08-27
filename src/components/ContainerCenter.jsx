import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

const StyledBox = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%'
}))

const ContainerCenter = ({ children, ...rest }) => (
  <StyledBox>
    <Container {...rest}>{children}</Container>
  </StyledBox>
)

export default ContainerCenter
