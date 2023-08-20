import Box from '@mui/material/Box'
import { Children } from 'react'

const BetweenElse = ({ children, content = 'end' }) => {
  const childrenCount = Children.count(children)
  const justifyContent = childrenCount > 1 ? 'space-between' : content
  return (
    <Box display='flex' justifyContent={justifyContent} alignItems='center'>
      {children}
    </Box>
  )
}

export default BetweenElse
