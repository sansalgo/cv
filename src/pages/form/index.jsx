import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Form from '@/views/form'

const extendTheme = theme =>
  createTheme({
    ...theme,
    components: {
      ...theme.components,
      MuiCardContent: {
        styleOverrides: {
          root: {
            '&:last-child': {
              paddingBottom: 16
            }
          }
        }
      },
      MuiCardHeader: {
        styleOverrides: {
          action: {
            margin: 0
          }
        }
      }
    }
  })

export default () => (
  <ThemeProvider theme={theme => extendTheme(theme)}>
    <CssBaseline />
    <Form />
  </ThemeProvider>
)
