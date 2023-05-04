import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'

const ChipButton = styled(Chip) (({theme}) => ({
    borderRadius: theme.shape.borderRadius,
    "& .MuiChip-label": {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

export default ChipButton