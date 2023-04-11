import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

const CardFieldArray = props => {
  const { fields, title, action, children } = props
  return (
    <Card variant='outlined'>
      <CardHeader title={title} action={fields.length === 0 && action} />
      {fields.length > 0 && children}
      {fields.length > 0 && <CardHeader sx={{ paddingTop: 0 }} action={action} />}
    </Card>
  )
}

export default CardFieldArray
