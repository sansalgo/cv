import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import { pdf } from '@react-pdf/renderer'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Intro from './Intro'
import ProfileSummary from './ProfileSummary'
import EmploymentHistory from './EmploymentHistory'
import Education from './Education'
import Extras from './Extras'
import Skills from './Skills'
import Projects from './Projects'
import Languages from './Languages'
import Achievement from './Achievement'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'
import PDFDocument from '../preview/PDFDocument'
import { useEffect } from 'react'
import EndCard from '@/components/EndCard'

const Form = ({ record }) => {
  //   const dispatch = useDispatch();
  const DocumentWrapper = styled(Box)(({ theme }) => ({
    '& .react-pdf__Page__canvas': {
      width: '100%',
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.divider}`
    }
  }))

  const methods = useForm({
    defaultValues: {
      employmentHistory: [
        {
          position: '',
          companyName: '',
          startDate: '',
          endDate: '',
          location: '',
          description: ''
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

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (record) {
      methods.reset(record)
    }
  }, [])

  const onSubmit = async data => {
    console.log(data)
    // if (!value) return null
    localStorage.setItem('record', JSON.stringify(data))

    router.push(`/preview`)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Intro />
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
              <ProfileSummary />
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
            <EndCard>
              <Button type='submit' disabled={loading} variant='contained'>
                {loading ? <CircularProgress color='secondary' /> : 'Preview'}
              </Button>
            </EndCard>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default Form
