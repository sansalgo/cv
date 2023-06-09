import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import { createEmotionCache } from '@/utils/create-emotion-cache'
import '@fontsource/lato'
import Layout from '@/components/Layout'
import { SessionProvider } from 'next-auth/react'
import { wrapper } from '@/store'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'

const clientSideEmotionCache = createEmotionCache()

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(0, 31, 90)'
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
        disableRipple: true
      }
    },
    MuiSvgIcon: {
      defaultProps: {
        color: 'primary'
      }
    },
    MuiChip: {
      defaultProps: {
        variant: 'outlined',
        color: 'primary'
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
        autoComplete: 'off'
      },
      styleOverrides: {
        root: {
          '&:hover:not(.Mui-focused):not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 31, 90, 0.50)'
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
    }
  }
})

const App = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  const {
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps }
  } = props
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <SessionProvider session={session}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Toaster position='top-right' reverseOrder={false} />
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </SessionProvider>
      </CacheProvider>
    </Provider>
  )
}

export default App
