import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyling from './globalStyles'
import GlobalStyles from '@mui/material/GlobalStyles'
import palette from './palette'

const defaultTheme = createTheme({})

const theme = createTheme({
  palette,
  typography: {
    fontFamily: 'Lato',
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
    MuiAlert: {
      defaultProps: {
        icon: false,
        variant: 'outlined'
      },
      styleOverrides: {
        root: {
          color: defaultTheme.palette.error.main,
          border: `1px solid ${defaultTheme.palette.error.main}`
        }
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
          },
          borderRadius: defaultTheme.shape.borderRadius
        },
        label: {
          display: 'flex'
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
          minWidth: defaultTheme.spacing(4)
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
            paddingBottom: defaultTheme.spacing(2)
          }
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        action: {
          alignSelf: 'center',
          margin: 0
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiFormHelperText-root': {
            marginLeft: 0,
            marginRight: 0
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: defaultTheme.spacing(1.7)
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
    },
    MuiDialog: {
      styleOverrides: {
        container: {
          '& .MuiDialog-paperFullWidth': {
            width: '100%',
            margin: defaultTheme.spacing(2)
          }
        }
      }
    }
  }
})

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles styles={() => GlobalStyling(theme)} />
    {children}
  </ThemeProvider>
)
