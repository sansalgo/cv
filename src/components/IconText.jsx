import Stack from '@mui/material/Stack'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'


const IconText = ({icon, text}) => {
    return (
      <Stack direction='row' alignItems='center' gap={1}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText>{text}</ListItemText>
      </Stack>
    )
   
}

export default IconText