import styled from '@emotion/styled'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

export const StyledCardError = styled(Card)(({ theme, error }) => ({
  ...(error && { border: `1px solid ${theme.palette.error.main}` })
}))

const CardFieldArray = props => {
  const { fields, title, action, error, children } = props
  return (
    <StyledCardError error={error} variant='outlined'>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'h6', fontWeight: 'normal' }}
        action={fields.length === 0 && action}
      />
      {fields.length > 0 && children}
      {fields.length > 0 && <CardHeader sx={{ paddingTop: 0 }} action={action} />}
    </StyledCardError>
  )
}

export default CardFieldArray
