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
import InputErrorHelper from '@/components/InputErrorHelper'

const EmploymentHistory = () => {
  const {
    register,
    control,
    trigger,
    formState: { errors }
  } = useFormContext()
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'employmentHistory'
  })

  const handleAppend = () => {
    append()
    trigger('employmentHistory')
  }
  const handleRemove = index => {
    remove(index)
    trigger('employmentHistory')
  }

  return (
    <CardFieldArray
      title='Employment History'
      action={<ChipButton onClick={() => handleAppend()} label={<AddRoundedIcon />} />}
      fields={fields}
      error={errors?.employmentHistory?.type === 'atLeastOneEmploymentHistory'}
    >
      <CardContent>
        <Grid container spacing={2}>
          {fields.map((item, index) => {
            return (
              <Grid item key={item.id}>
                <Card variant='outlined' key={item.id}>
                  <CardHeader
                    action={<ChipButton label={<RemoveRoundedIcon />} onClick={() => handleRemove(index)} />}
                  />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <InputErrorHelper errorMessage={errors?.employmentHistory?.[index]?.position?.message}>
                          <OutlinedInput
                            error={!!errors?.employmentHistory?.[index]?.position?.message}
                            fullWidth
                            placeholder='Position'
                            {...register(`employmentHistory.${index}.position`)}
                          />
                        </InputErrorHelper>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputErrorHelper errorMessage={errors?.employmentHistory?.[index]?.companyName?.message}>
                          <OutlinedInput
                            error={!!errors?.employmentHistory?.[index]?.companyName?.message}
                            fullWidth
                            placeholder='Company Name'
                            {...register(`employmentHistory.${index}.companyName`)}
                          />
                        </InputErrorHelper>
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
                        <InputErrorHelper errorMessage={errors?.employmentHistory?.[index]?.location?.message}>
                          <OutlinedInput
                            error={!!errors?.employmentHistory?.[index]?.location?.message}
                            fullWidth
                            placeholder='Location'
                            {...register(`employmentHistory.${index}.location`)}
                          />
                        </InputErrorHelper>
                      </Grid>

                      <Grid item xs={12}>
                        <InputErrorHelper errorMessage={errors?.employmentHistory?.[index]?.description?.message}>
                          <OutlinedInput
                            error={!!errors?.employmentHistory?.[index]?.description?.message}
                            fullWidth
                            multiline
                            minRows={3}
                            placeholder='Description'
                            {...register(`employmentHistory.${index}.description`)}
                          />
                        </InputErrorHelper>
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
