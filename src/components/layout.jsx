import MuiAppBar from '@mui/material/AppBar'
import MuiToolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const Layout = ({ children }) => {
  const router = useRouter()
  const { data: session } = useSession()

  const showAppBar = ['/login', '/register'].every(path => router.pathname !== path)

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

  const ProfileChip = () => {
    const username = session.user.username
    const avatarLetter = session.user.username[0].toUpperCase()

    return (
      <Chip
        sx={{ borderRadius: 1 }}
        variant='outlined'
        label={username}
        color='primary'
        avatar={<Avatar variant='rounded'>{avatarLetter}</Avatar>}
      />
    )
  }

  return (
    <>
      <Container maxWidth='lg'>
        <Box sx={{ flexGrow: 1 }}>
          {showAppBar && (
            <AppBar position='static' elevation={0}>
              <Toolbar>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {session ? <ProfileChip /> : ''}
                </Box>
              </Toolbar>
            </AppBar>
          )}
        </Box>
        <ContentWrapper>{children}</ContentWrapper>
      </Container>
    </>
  )
}

export default Layout
