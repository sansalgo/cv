import { Router } from 'next/router'
import NProgress from 'nprogress'
import { CacheProvider } from '@emotion/react'
import { createEmotionCache } from '@/utils/create-emotion-cache'
import '@fontsource/lato'
import '@fontsource-variable/roboto-slab'
import Layout from '@/components/Layout'
import { SessionProvider } from 'next-auth/react'
import { wrapper } from '@/store'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import Theme from '@/theme'
import { SnackbarProvider } from 'notistack'

const clientSideEmotionCache = createEmotionCache()

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeError', () => {
  NProgress.done()
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})

const App = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  const {
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps }
  } = props

  const getLayout = Component.getLayout || (page => <Layout>{page}</Layout>)

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <SessionProvider session={session}>
          <Theme>
            <Toaster position='top-right' reverseOrder={false} />
            <SnackbarProvider
              autoHideDuration={3000}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              maxSnack={2}
            >
              {getLayout(<Component {...pageProps} />)}
            </SnackbarProvider>
          </Theme>
        </SessionProvider>
      </CacheProvider>
    </Provider>
  )
}

export default App
