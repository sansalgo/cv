import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'

const DashedDivider = styled(Divider)(({ theme }) => ({
  borderStyle: 'dashed',
  borderBottomWidth: 'thin',
  borderColor: theme.palette.secondary.main,
  opacity: '25%'
}))

export default DashedDivider;