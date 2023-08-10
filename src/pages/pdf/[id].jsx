import PDF from '@/views/pdf'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme, styled } from '@mui/material/styles'

const extendTheme = theme =>
  createTheme({
    ...theme,
    components: {
      ...theme.components,
      MuiCssBaseline: {
        styleOverrides: {
          '@page': {
            size: 'A4',
            margin: '1cm'
          },
          '*': {
            margin: 0,
            padding: 0,
            textIndent: 0,
            boxSizing: 'border-box'
          },
          ul: {
            paddingLeft: '1.2rem',
            color: 'rgb(102, 102, 102)'
          },
          'li::marker': {
            fontSize: '10pt'
          },
          section: {
            marginBottom: '0.25rem'
          }
        }
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            width: '210mm',
            height: '297mm',
            padding: 0,
            '@media (min-width:600px)': {
              padding: 0
            },
            '@media (min-width: 1200px)': {
              maxWidth: 'unset'
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff',
            '&:last-child .MuiCardContent-root': {
              padding: 0
            }
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            paddingBottom: 'unset'
          }
        }
      },

      MuiTypography: {
        defaultProps: {
          variant: 'caption'
        },
        styleOverrides: {
          root: {
            lineHeight: '1.5'
          },
          h1: {
            color: theme.palette.primary.main,
            fontFamily: 'Roboto Slab Variable',
            fontWeight: 'bold',
            fontSize: '24.5pt'
          },
          h2: {
            color: theme.palette.primary.main,
            fontFamily: 'Roboto Slab Variable',
            fontWeight: 'bold',
            fontSize: '17pt'
          },
          h3: {
            color: theme.palette.primary.main,
            fontFamily: 'Lato',
            fontWeight: 'bold',
            fontSize: '12pt'
          },
          h4: {
            color: theme.palette.gray,
            fontSize: '12pt'
          },
          body1: {
            color: theme.palette.blue,
            fontStyle: 'italic',
            fontSize: '12pt',
            lineHeight: '1.2'
          },

          caption: {
            color: theme.palette.secondary.main,
            fontSize: '10pt'
          }
        }
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 'unset',
            color: theme.palette.blue,
            '& .MuiSvgIcon-root': {
              fontSize: '9pt'
            }
          }
        }
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            '& .MuiTypography-root': {
              color: theme.palette.gray,
              fontSize: '9pt',
              fontStyle: 'normal'
            }
          }
        }
      },
      MuiDivider: {
        styleOverrides: {
          fullWidth: {
            borderColor: theme.palette.orange,
            borderWidth: '0.125rem',
            marginBottom: '0.5rem'
          }
        }
      },
      MuiChip: {
        defaultProps: {
          color: 'secondary',
          variant: 'outlined'
        },
        styleOverrides: {
          root: {
            '& .MuiChip-label': {
              padding: '0.3125rem'
            },
            height: 'unset'
          },
          outlined: {
            borderRadius: '0.312rem'
          }
        }
      }
    }
  })
const StyledLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))

const PDFPage = () => (
  <ThemeProvider theme={theme => extendTheme(theme)}>
    <CssBaseline />
    <PDF />
  </ThemeProvider>
)
export default PDFPage
PDFPage.getLayout = page => page
