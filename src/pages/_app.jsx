import Layout from '@/components/Layout'
import { wrapper } from '@/store'
import Theme from '@/theme'
import { createEmotionCache } from '@/utils/create-emotion-cache'
import { CacheProvider } from '@emotion/react'
import '@fontsource-variable/roboto-slab'
import '@fontsource/lato'
import { SessionProvider } from 'next-auth/react'
import { Router } from 'next/router'
import { SnackbarProvider } from 'notistack'
import NProgress from 'nprogress'
import { Provider } from 'react-redux'

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
