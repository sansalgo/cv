import Grid from '@mui/material/Grid'

const ContainerCenter = ({ children }) => (
  <Grid container spacing={0} direction='column' justifyContent='center' sx={{ minHeight: '100vh' }}>
    <Grid item>{children}</Grid>
  </Grid>
)

export default ContainerCenter
