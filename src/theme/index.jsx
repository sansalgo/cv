import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyling from './globalStyles'
import GlobalStyles from '@mui/material/GlobalStyles'
import palette from './palette'

let theme = createTheme({
  palette,
  typography: {
    fontFamily: 'Lato'
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  },

  components: {
    MuiPaper: {
      defaultProps: {
        variant: 'outlined',
        elevation: 0
      }
    },
    MuiAppBar: {
      defaultProps: {
        variant: 'elevation',
        elevation: 0
      }
    },
    MuiLink: {
      defaultProps: {
        underline: 'none'
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true
      }
    },
    MuiSvgIcon: {
      defaultProps: {
        color: 'primary',
        fontSize: 'small'
      }
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
        disableFocusRipple: true,
        disableTouchRipple: true
      }
    },
    MuiChip: {
      defaultProps: {
        variant: 'outlined',
        color: 'primary',
        size: 'small'
      },
      styleOverrides: {
        root: {
          '&:active': {
            boxShadow: 'unset'
          }
        }
      }
    },
    MuiOutlinedInput: {
      defaultProps: {
        autoComplete: 'off',
        size: 'small'
      },
      styleOverrides: {
        root: {
          '&:hover:not(.Mui-focused):not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: `rgba(${palette.primary.rgb}, 0.50)`
          }
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '2rem'
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'unset'
          }
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: '1rem'
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
    MuiFormControl: {
      styleOverrides: {
        root: {
          '&.MuiFormHelperText-root': {
            marginLeft: 0,
            marginRight: 0
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '0.85rem'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'unset',
          '&:hover': {
            boxShadow: 'unset'
          }
        }
      }
    }
  }
})

theme = responsiveFontSizes(theme)

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles styles={() => GlobalStyling(theme)} />
    {children}
  </ThemeProvider>
)
