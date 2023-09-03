import CardFieldArray from '@/components/CardFieldArray'
import ChipButton from '@/components/ChipButton'
import DatePickerWrapper from '@/components/DatePickerWrapper'
import InputErrorHelper from '@/components/InputErrorHelper'
import styled from '@emotion/styled'
import AddRounded from '@mui/icons-material/AddRounded'
import RemoveRounded from '@mui/icons-material/RemoveRounded'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Fragment } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

const Education = () => {
  const {
    register,
    control,
    getValues,
    formState: { errors }
  } = useFormContext()
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'education'
  })

  console.log(getValues())

  const StyledCardErrorHelper = styled('div')(({ theme, error }) => ({
    ...(error && {
      '& .MuiCard-root': {
        border: `1px solid ${theme.palette.error.main}`
      }
    })
  }))

  return (
    <StyledCardErrorHelper>
      <CardFieldArray
        title='Education'
        action={<ChipButton onClick={() => append()} label={<AddRounded />} />}
        fields={fields}
      >
        <CardContent>
          <Grid container spacing={2}>
            {fields.map((item, index) => {
              return (
                <Fragment key={item.id}>
                  <Grid item>
                    <Card variant='outlined'>
                      <CardHeader action={<ChipButton onClick={() => remove(index)} label={<RemoveRounded />} />} />
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <InputErrorHelper errorMessage={errors?.education?.[index]?.course?.message}>
                              <OutlinedInput
                                error={!!errors?.education?.[index]?.course?.message}
                                fullWidth
                                placeholder='Course'
                                {...register(`education.${index}.course`)}
                              />
                            </InputErrorHelper>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputErrorHelper errorMessage={errors?.education?.[index]?.institution?.message}>
                              <OutlinedInput
                                error={!!errors?.education?.[index]?.institution?.message}
                                fullWidth
                                placeholder='Institution'
                                {...register(`education.${index}.institution`)}
                              />
                            </InputErrorHelper>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <DatePickerWrapper>
                              <Controller
                                control={control}
                                name={`education.${index}.startDate`}
                                render={({ field: { value, onChange } }) => (
                                  <DatePicker
                                    dateFormat='MM/yyyy'
                                    placeholderText='Start Date'
                                    showMonthYearPicker
                                    selected={value ? new Date(value) : null}
                                    onChange={onChange}
                                    customInput={<OutlinedInput fullWidth />}
                                  />
                                )}
                              />
                            </DatePickerWrapper>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <DatePickerWrapper>
                              <Controller
                                control={control}
                                name={`education.${index}.endDate`}
                                render={({ field: { value, onChange } }) => (
                                  <DatePicker
                                    dateFormat='MM/yyyy'
                                    placeholderText='End Date'
                                    showMonthYearPicker
                                    selected={value ? new Date(value) : null}
                                    onChange={onChange}
                                    customInput={<OutlinedInput fullWidth />}
                                  />
                                )}
                              />
                            </DatePickerWrapper>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <InputErrorHelper errorMessage={errors?.education?.[index]?.location?.message}>
                              <OutlinedInput
                                error={!!errors?.education?.[index]?.location?.message}
                                fullWidth
                                placeholder='Location'
                                {...register(`education.${index}.location`)}
                              />
                            </InputErrorHelper>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputErrorHelper errorMessage={errors?.education?.[index]?.percentage?.message}>
                              <OutlinedInput
                                error={!!errors?.education?.[index]?.percentage}
                                fullWidth
                                placeholder='Percentage'
                                {...register(`education.${index}.percentage`)}
                              />
                            </InputErrorHelper>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Fragment>
              )
            })}
          </Grid>
        </CardContent>
      </CardFieldArray>
    </StyledCardErrorHelper>
  )
}

export default Education
