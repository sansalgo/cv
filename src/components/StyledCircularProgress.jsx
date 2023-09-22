import MuiCircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'

const StyledCircularProgress = styled(MuiCircularProgress)(({ theme, size, disabled }) => ({
  width: `${theme.spacing(size ? size : 3.0625)} !important`,
  height: `${theme.spacing(size ? size : 3.0625)} !important`,
  color: disabled ? theme.palette.action.disabled : theme.palette.common.white
}))

export default StyledCircularProgress
