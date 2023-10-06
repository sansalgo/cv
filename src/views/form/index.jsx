import EndCard from '@/components/EndCard'
import schema from '@/utils/validation-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Achievement from './Achievement'
import Education from './Education'
import EmploymentHistory from './EmploymentHistory'
import Extras from './Extras'
import FileName from './FileName'
import Intro from './Intro'
import Languages from './Languages'
import ProfileSummary from './ProfileSummary'
import Projects from './Projects'
import Skills from './Skills'

const validationSchema = schema([
  { field: 'fileName' },
  { field: 'intro' },
  { field: 'profileSummary' },
  { field: 'employmentHistory' },
  { field: 'education' },
  { field: 'extras' },
  { field: 'skills' },
  { field: 'projects' },
  { field: 'languages' },
  { field: 'achievement' }
])

const defaultValues = {
  achievement: [],
  education: [
    {
      course: '',
      institution: '',
      startDate: '',
      endDate: '',
      location: '',
      percentage: ''
    }
  ],
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
  extras: [],
  languages: [],
  projects: [],
  skills: [],
  intro: {
    firstName: '',
    lastName: '',
    position: '',
    email: '',
    phone: '',
    city: '',
    linkedin: '',
    github: ''
  },
  profileSummary: '',
  fileName: ''
}

const Form = ({ record }) => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues
  })

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const id = router.query.id

  useEffect(() => {
    if (record) {
      record.employmentHistory && !record.employmentHistory.length && delete record.employmentHistory
      record.education && !record.education.length && delete record.education
      methods.reset(record)
    }
  }, [])

  const onSubmit = async data => {
    setIsLoading(true)
    await axios.put(`/api/records/${id}`, data).finally(() => setIsLoading(false))

    router.push({ pathname: `/preview/[id]`, query: { id, draft: record.draft } }, `/preview/${id}`)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FileName />
          </Grid>
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
          <Grid item xs={12} order={{ xs: 3 }} justifyContent='center'>
            <EndCard>
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => methods.reset({ ...defaultValues, fileName: methods.getValues('fileName') })}
              >
                Reset
              </Button>
              <LoadingButton type='submit' size='medium' loading={isLoading} variant='contained'>
                <span>Preview</span>
              </LoadingButton>
            </EndCard>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default Form
