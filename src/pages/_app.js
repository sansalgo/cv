import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import { createEmotionCache } from '@/utils/create-emotion-cache'
import '@fontsource/lato'
import Layout from '@/components/layout'
import { SessionProvider } from 'next-auth/react'

const clientSideEmotionCache = createEmotionCache()

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(0, 31, 90)'
    },
    background: {
      default: 'rgb(226, 226, 226)',
      paper: 'rgb(226, 226, 226)'
    }
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
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '2rem'
        }
      }
    }
  }
})

const App = ({ Component, emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps } }) => {
  return (
    <CacheProvider value={emotionCache}>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SessionProvider>
    </CacheProvider>
  )
}

export default App
