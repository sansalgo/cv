import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Form from '@/views/form'

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(0, 31, 90)'
    },
    secondary: {
      main: 'rgb(102, 102, 102)'
    },
    background: {
      default: 'rgb(226, 226, 226)',
      paper: 'rgb(226, 226, 226)'
    },
    blue: 'rgb(0, 57, 172)',
    orange: 'rgb(243, 137, 11)'
  },
  typography: {
    fontFamily: 'Lato'
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover:not(.Mui-focused):not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 31, 90, 0.50)'
          }
        }
      }
    },
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
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '2rem'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&:active': {
            boxShadow: 'unset'
          }
        }
      }
    }
  }
})

export default () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Form />
  </ThemeProvider>
)


