import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { Children } from 'react'

const EndCardWrapper = styled(Box)(() => ({
  '& .MuiCardContent-root': {
    '&:last-child': {
      paddingBottom: 16
    }
  },
  '& .MuiBox-root': {
    display: 'flex'
  }
}))

const EndCard = ({ children }) => {
  const justifyContent = Children.count(children) > 1 ? 'space-between' : 'end'
  return (
    <EndCardWrapper>
      <Card variant='outlined'>
        <CardContent>
          <Box sx={{ justifyContent }}>{children}</Box>
        </CardContent>
      </Card>
    </EndCardWrapper>
  )
}

export default EndCard
