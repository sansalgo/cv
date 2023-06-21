import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import OutlinedInput from '@mui/material/OutlinedInput'
import DatePicker from 'react-datepicker'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

import CardFieldArray from '@/components/CardFieldArray'
import ChipButton from '@/components/ChipButton'

import DatePickerWrapper from '@/components/DatePickerWrapper'
import 'react-datepicker/dist/react-datepicker.css'

const EmploymentHistory = () => {
  const { register, control } = useFormContext()
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'employmentHistory'
  })

  return (
    <CardFieldArray
      title='Employment History'
      action={<ChipButton onClick={() => append()} label={<AddRoundedIcon />} />}
      fields={fields}
    >
      <CardContent>
        <Grid container spacing={2}>
          {fields.map((item, index) => {
            return (
              <Grid item key={item.id}>
                <Card variant='outlined' key={item.id}>
                  <CardHeader action={<ChipButton label={<RemoveRoundedIcon />} onClick={() => remove(index)} />} />
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
                            name={`employmentHistory.${index}.endDate`}
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
