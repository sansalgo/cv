import Box from '@mui/material/Box'
import FormHelperText from '@mui/material/FormHelperText'

const InputErrorHelper = ({ errorMessage, children }) => {
  return (
    <Box>
      {children}
      <FormHelperText error>{errorMessage}</FormHelperText>
    </Box>
  )
}

export default InputErrorHelper
