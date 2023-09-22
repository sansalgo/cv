import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import EndCard from '@/components/EndCard'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiCircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Achievement from './Achievement'
import Education from './Education'
import EmploymentHistory from './EmploymentHistory'
import Extras from './Extras'
import Intro from './Intro'
import Languages from './Languages'
import ProfileSummary from './ProfileSummary'
import Projects from './Projects'
import Skills from './Skills'
import axios from 'axios'
import formatRecord from '@/utils/format-record'
import FileName from './FileName'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import StyledCircularProgress from '@/components/StyledCircularProgress'

const validationSchema = yup.object().shape({
  fileName: yup.string().trim().required('File name is required'),
  intro: yup.object().shape({
    firstName: yup.string().trim().required('First name is required'),
    lastName: yup.string().trim().required('Last name is required'),
    position: yup.string().trim().required('Position is required'),
    email: yup.string().trim().email('Invalid email address').required('Email is required'),
    phone: yup
      .string()
      .trim()
      .matches(/^[0-9]+$/, 'Phone number must be numeric')
      .required('Phone is required'),
    city: yup.string().trim().required('City is required'),
    linkedin: yup.string().trim().url('Invalid LinkedIn URL').required('LinkedIn is required'),
    github: yup.string().trim().url('Invalid GitHub URL').required('GitHub is required')
  }),
  profileSummary: yup.string().trim().required('Profile summary is required'),
  employmentHistory: yup
    .array()
    .of(
      yup.object().shape({
        position: yup.string().trim().required('Position is required'),
        companyName: yup.string().trim().required('Company name is required'),
        startDate: yup
          .date()
          .transform((value, originalValue) => {
            // Convert empty strings to null before validation
            return originalValue === '' ? null : value
          })
          .required('Start date is required'),
        endDate: yup
          .date()
          .transform((value, originalValue) => {
            return originalValue === '' ? null : value
          })
          .required('End date is required'),
        location: yup.string().trim().required('Location is required'),
        description: yup.string().trim().required('Description is required')
      })
    )
    .test('atLeastOneEmploymentHistory', 'At least one employment history entry is required', function (value) {
      return value && value.length > 0
    }),
  education: yup
    .array()
    .of(
      yup.object().shape({
        course: yup.string().trim().required('Course is required'),
        institution: yup.string().trim().required('Institution name is required'),
        startDate: yup
          .date()
          .transform((value, originalValue) => {
            return originalValue === '' ? null : value
          })
          .required('Start date is required'),
        endDate: yup
          .date()
          .transform((value, originalValue) => {
            return originalValue === '' ? null : value
          })
          .required('End date is required'),
        location: yup.string().trim().required('Location is required'),
        percentage: yup
          .number()
          .typeError('Percentage must be a number')
          .required('Percentage is required')
          .min(0, 'Percentage cannot be negative')
          .max(100, 'Percentage cannot be greater than 100')
      })
    )
    .test('atLeastOneEducation', 'At least one education entry is required', function (value) {
      return value && value.length > 0
    }),
  extras: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().trim().required('Extra value is required')
      })
    )
    .test('atLeastOneExtra', 'At least one extra entry is required', function (value) {
      return value && value.length > 0
    }),
  skills: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().trim().required('Skill value is required')
      })
    )
    .test('atLeastOneSkill', 'At least one skill entry is required', function (value) {
      return value && value.length > 0
    }),
  projects: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().trim().required('Project value is required')
      })
    )
    .test('atLeastOneProject', 'At least one project entry is required', function (value) {
      return value && value.length > 0
    }),
  languages: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().trim().required('Language value is required')
      })
    )
    .test('atLeastOneLanguage', 'At least one language entry is required', function (value) {
      return value && value.length > 0
    }),
  achievement: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().trim().required('Achievement value is required')
      })
    )
    .test('atLeastOneAchievement', 'At least one achievement entry is required', function (value) {
      return value && value.length > 0
    })
})

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
    await axios.put(`/api/records/drafts/${id}`, formatRecord(data)).finally(() => setIsLoading(false))

    router.push(`/preview/${id}`)
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
              <Button variant='outlined' color='secondary' onClick={() => methods.reset(defaultValues)}>
                Reset
              </Button>
              <Button type='submit' size='medium' disabled={isLoading} variant='contained'>
                {isLoading ? <StyledCircularProgress disabled={isLoading} /> : 'Preview'}
              </Button>
            </EndCard>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default Form
