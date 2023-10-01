import Record from '@/views/record'
import axios from 'axios'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { wrapper } from '@/store'
import { setRecords } from '@/store/record'
import Layout from '@/components/Layout'
import { getAPIRecords } from './api/records'
import connectToDatabase from '@/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'

const extendTheme = theme =>
  createTheme({
    ...theme,
    components: {
      ...theme.components,
      MuiTableBody: {
        styleOverrides: {
          root: {
            '.MuiTableRow-root:last-child .MuiTableCell-root': {
              borderBottom: 'unset'
            }
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${theme.palette.divider}`
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            padding: 0
          }
        }
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: 0
          }
        }
      }
    }
  })

export default () => (
  <ThemeProvider theme={theme => extendTheme(theme)}>
    <CssBaseline />

    <Record />
  </ThemeProvider>
)

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, query, res }) => {
  await connectToDatabase()
  req.query = query
  const session = await getServerSession(req, res, authOptions)
  const records = await getAPIRecords(req, session)
  store.dispatch(setRecords(JSON.parse(JSON.stringify(records))))
})
