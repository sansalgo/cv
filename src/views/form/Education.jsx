import { useFormContext, useFieldArray, Controller } from 'react-hook-form'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import AddRounded from '@mui/icons-material/AddRounded'
import RemoveRounded from '@mui/icons-material/RemoveRounded'
import OutlinedInput from '@mui/material/OutlinedInput'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { Fragment, useState } from 'react'
import ChipButton from '@/components/ChipButton'
import CardFieldArray from '@/components/CardFieldArray'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from '@/components/DatePickerWrapper'

const Education = () => {
  const { register, control } = useFormContext()
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'education'
  })

  return (
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
                          <OutlinedInput fullWidth placeholder='Course' {...register(`education.${index}.course`)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <OutlinedInput
                            fullWidth
                            placeholder='Institution'
                            {...register(`education.${index}.institution`)}
                          />
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
                          <OutlinedInput
                            fullWidth
                            placeholder='Location'
                            {...register(`education.${index}.location`)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <OutlinedInput
                            fullWidth
                            placeholder='Percentage'
                            {...register(`education.${index}.percentage`)}
                          />
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
  )
}

export default Education
