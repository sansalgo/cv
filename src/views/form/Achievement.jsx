import CardFieldArray from '@/components/CardFieldArray'
import InputErrorHelper from '@/components/InputErrorHelper'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Fragment } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

const Achievement = () => {
  const {
    register,
    control,
    trigger,
    formState: { errors }
  } = useFormContext()
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'achievement'
  })

  const is_empty = errors?.achievement?.type === 'atLeastOneAchievement'

  const handleAppend = () => {
    append()
    if (is_empty) trigger('achievement')
  }
  const handleRemove = index => {
    remove(index)
    trigger('achievement')
  }
  return (
    <CardFieldArray
      title='Achievement'
      action={<Chip label={<AddRoundedIcon />} onClick={() => handleAppend()} />}
      fields={fields}
      error={is_empty}
    >
      {fields.length ? (
        <CardContent>
          <Grid container spacing={2}>
            {fields.map((item, index) => {
              return (
                <Fragment key={item.id}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputErrorHelper errorMessage={errors?.achievement?.[index]?.value?.message}>
                        <OutlinedInput
                          error={!!errors?.achievement?.[index]?.value?.message}
                          type='text'
                          fullWidth
                          placeholder='Achievement'
                          endAdornment={
                            <InputAdornment position='end'>
                              <Chip label={<RemoveRoundedIcon />} onClick={() => handleRemove(index)} />
                            </InputAdornment>
                          }
                          {...register(`achievement.${index}.value`)}
                        />
                      </InputErrorHelper>
                    </FormControl>
                  </Grid>
                </Fragment>
              )
            })}
          </Grid>
        </CardContent>
      ) : null}
    </CardFieldArray>
  )
}

export default Achievement
