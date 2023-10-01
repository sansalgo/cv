import Box from '@mui/material/Box'
import { Children } from 'react'

/**
 * A React component that adjusts its `justifyContent` based on the number of children.
 * @param {Object} props - The component's properties.
 * @param {ReactNode} props.children - The child elements.
 * @param {string} props.content - The value to use as `justifyContent` if there is only one child.
 * @returns {JSX.Element} The React component.
 */
const BetweenElse = ({ children, content = 'end' }) => {
  // Get children count
  const childrenCount = Children.count(children)

  // Conditionally set justifyContent (default: end)
  const justifyContent = childrenCount > 1 ? 'space-between' : content

  // Return with Flexbox
  return (
    <Box display='flex' justifyContent={justifyContent} alignItems='center'>
      {children}
    </Box>
  )
}

export default BetweenElse
