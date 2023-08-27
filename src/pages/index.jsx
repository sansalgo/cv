import Record from '@/views/record'
import axios from 'axios'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { wrapper } from '@/store'
import { setRecords } from '@/store/record'

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

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, query }) => {
  const { data: records } = await axios.get(`http://localhost:3000/api/records`, {
    headers: {
      cookie: req.headers.cookie
    },
    params: query
  })

  store.dispatch(setRecords(records))
})
