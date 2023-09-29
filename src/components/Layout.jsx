import MuiAppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import MuiToolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import CVLogo from './CVLogo'
import { destroyCookie } from 'nookies'

const Layout = ({ children }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const theme = useTheme()
  const downSM = useMediaQuery(theme.breakpoints.down('sm'))

  const AppBar = styled(MuiAppBar)(() => ({
    backgroundColor: 'transparent'
  }))

  const Toolbar = styled(MuiToolbar)(({ theme }) => ({
    marginTop: theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius
  }))

  const ContentWrapper = styled('main')(({ theme }) => ({
    padding: theme.spacing(3, 0)
  }))

  return (
    <Container maxWidth='lg'>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <CVLogo />
            <Chip
              label='Logout'
              size='medium'
              onClick={() => signOut().then(() => destroyCookie(null, 'rememberMe'))}
            />
          </Toolbar>
        </AppBar>
      </Box>
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  )
}

export default Layout
