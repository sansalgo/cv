import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import BetweenElse from './BetweenElse'

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

const EndCard = ({ children, ...rest }) => {
  return (
    <EndCardWrapper {...rest}>
      <Card variant='outlined'>
        <CardContent>
          <BetweenElse>{children}</BetweenElse>
        </CardContent>
      </Card>
    </EndCardWrapper>
  )
}

export default EndCard
