import { useFormContext, useFieldArray, Controller } from 'react-hook-form'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import DatePicker from 'react-datepicker'

import { Fragment, useState } from 'react'
import ChipButton from '@/components/chipButton'
import CardFieldArray from './components/CardFieldArray'

import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from '@/components/DatePickerWrapper'

const EmploymentHistory = () => {
  const { register, control } = useFormContext()
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'employmentHistory'
  })

  const [date, setDate] = useState(new Date())

  return (
    <CardFieldArray
      title='Employment History'
      action={<ChipButton color='primary' onClick={() => append()} variant='outlined' label={<AddRoundedIcon />} />}
      fields={fields}
    >
      <CardContent>
        <Grid container spacing={2}>
          {fields.map((item, index) => {
            return (
              <Grid item key={item.id}>
                <Card variant='outlined' key={item.id}>
                  <CardHeader
                    action={
                      <ChipButton
                        color='primary'
                        // disabled={fields.length === 1}
                        label={<RemoveRoundedIcon />}
                        variant='outlined'
                        onClick={() => remove(index)}
                      />
                    }
                  />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <OutlinedInput
                          fullWidth
                          placeholder='Position'
                          {...register(`employmentHistory.${index}.position`)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <OutlinedInput
                          fullWidth
                          placeholder='Company Name'
                          {...register(`employmentHistory.${index}.companyName`)}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <DatePickerWrapper>
                          <Controller
                            control={control}
                            name={`employmentHistory.${index}.startDate`}
                            render={({ field }) => (
                              <DatePicker
                                dateFormat='MM/yyyy'
                                placeholderText='Start Date'
                                showMonthYearPicker
                                selected={field.value}
                                onChange={date => field.onChange(date)}
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
                            name={`employmentHistory.${index}.endDate`}
                            render={({ field }) => (
                              <DatePicker
                                dateFormat='MM/yyyy'
                                placeholderText='End Date'
                                showMonthYearPicker
                                selected={field.value}
                                onChange={date => field.onChange(date)}
                                customInput={<OutlinedInput fullWidth />}
                              />
                            )}
                          />
                        </DatePickerWrapper>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <OutlinedInput
                          fullWidth
                          placeholder='Location'
                          {...register(`employmentHistory.${index}.location`)}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <OutlinedInput
                          fullWidth
                          multiline
                          minRows={3}
                          placeholder='Description'
                          {...register(`employmentHistory.${index}.description`)}
                        />
                        {/* <Projects nestIndex={index} {...{ control, register }} /> */}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </CardContent>
    </CardFieldArray>
  )
}

export default EmploymentHistory
