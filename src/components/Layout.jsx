import MuiAppBar from '@mui/material/AppBar'
import MuiToolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

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

  const ProfileChip = () => {
    const username = session?.user.username
    const avatarLetter = session?.user.username[0].toUpperCase()

    return (
      <Chip
        sx={{ borderRadius: 1 }}
        variant='outlined'
        size='medium'
        label={username}
        color='primary'
        avatar={<Avatar variant='rounded'>{avatarLetter}</Avatar>}
      />
    )
  }

  const StyledTypography = styled(Typography)(({ theme }) => ({
    fontFamily: 'Roboto Slab Variable',
    fontWeight: 'bold',
    color: theme.palette.orange
  }))

  return (
    <Container maxWidth='lg'>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* <StyledTypography>{smDown ? 'CV' : 'Curriculum Vitae'}</StyledTypography> */}
              <ProfileChip />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  )
}

export default Layout
