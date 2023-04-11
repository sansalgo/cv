import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import ProfileSummary from '@/views/add/ProfileSummary'
import Intro from '@/views/add/Intro'
import Skills from '@/views/add/Skills'
import EmploymentHistory from '@/views/add/EmploymentHistory'
import Projects from '@/views/add/Projects'
import Stack from '@mui/material/Stack'
import Education from '@/views/add/Education'
import Extras from '@/views/add/Extras'
import Languages from '@/views/add/Languages'
import Achievement from '@/views/add/Achievement'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useSession, signIn } from 'next-auth/react'


const AddForm = () => {
  //   const dispatch = useDispatch();

  const methods = useForm({
    defaultValues: {
      employmentHistory: [
        {
          position: '',
          companyName: '',
          startDate: '',
          endDate: '',
          loaction: '',
          projects: []
        }
      ],
      education: [
        {
          course: '',
          institution: '',
          startDate: '',
          endDate: '',
          location: '',
          percentage: ''
        }
      ]
    }
  })

  const onSubmit = data => {
    console.log(data)

    // dispatch(addRecord(data))
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(0, 31, 90)'
      },
      secondary: {
        main: 'rgb(102, 102, 102)'
      },
      background: {
        default: 'rgb(226, 226, 226)',
        paper: 'rgb(226, 226, 226)'
      },
      blue: 'rgb(0, 57, 172)',
      orange: 'rgb(243, 137, 11)'
    },
    typography: {
      fontFamily: "Lato"
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
      MuiCardContent: {
        styleOverrides: {
          root: {
            '&:last-child': {
              paddingBottom: 16
            }
          }
        }
      },
      MuiCardHeader: {
        styleOverrides: {
          action: {
            margin: 0
          }
        }
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true
        }
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: '2rem'
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            '&:active': {
              boxShadow: 'unset'
            }
          }
        }
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card variant='outlined'>
                <CardHeader title='Intro' />
                <CardContent>
                  <Intro />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4} order={{ xs: 2, md: 1 }}>
              <Stack spacing={2} direction='column'>
                <Skills />
                <Projects />
                <Languages />
                <Achievement />
              </Stack>
            </Grid>

            <Grid item xs={12} md={8} order={{ xs: 1, md: 2 }}>
              <Stack spacing={2} direction='column'>
                <Card variant='outlined'>
                  <CardHeader title='Profile Summary' />
                  <CardContent>
                    <ProfileSummary />
                  </CardContent>
                </Card>
                <EmploymentHistory />
                <Education />
                <Extras />
              </Stack>
            </Grid>

            {/* <div className="col-md-4 order-md-1 order-2">
            <div className="card mb-4">
              <Skills />
            </div>
            <div className="card mb-4">
              <Projects />
            </div>
            <div className="card mb-4">
              <Languages />
            </div>
            <div className="card mb-4">
              <Achievement />
            </div>
          </div> */}
            {/* <div className="col-md-8 order-md-2 order-1">
            <div className="card mb-4">
              <ProfileSummary />
            </div>
            <div className="card mb-4">
              <EmploymentHistory />
            </div>
            <div className="card mb-4">
              <Education />
            </div>
            <div className="card mb-4">
              <Extras />
            </div>
          </div> */}
            <Grid item xs={12} order={{ xs: 3 }} justifyContent='center'>
              <Card variant='outlined'>
                <CardContent>
                  <Box display='flex' justifyContent='end'>
                    <Button type="submit" variant='contained'>
                      Preview
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </ThemeProvider>
  )
}

export default AddForm
