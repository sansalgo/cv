import AddRounded from '@mui/icons-material/AddRounded'
import RemoveRounded from '@mui/icons-material/RemoveRounded'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Fragment } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
// import CardActionHeader from './components/cardActionHeader'
import CardFieldArray from '@/components/CardFieldArray'
import InputErrorHelper from '@/components/InputErrorHelper'

const Extras = () => {
  const {
    register,
    control,
    trigger,
    formState: { errors }
  } = useFormContext()
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'extras'
  })

  const is_empty = errors?.extras?.type === 'atLeastOneExtra'

  const handleAppend = () => {
    append()
    if (is_empty) trigger('extras')
  }
  const handleRemove = index => {
    remove(index)
    trigger('extras')
  }
  return (
    <CardFieldArray
      title='Extras'
      action={<Chip label={<AddRounded />} onClick={() => handleAppend()} />}
      fields={fields}
      error={is_empty}
    >
      {fields.length > 0 && (
        <CardContent>
          <Grid container spacing={2}>
            {fields.map((item, index) => {
              return (
                <Fragment key={item.id}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputErrorHelper errorMessage={errors?.extras?.[index]?.value?.message}>
                        <OutlinedInput
                          error={!!errors?.extras?.[index]?.value?.message}
                          fullWidth
                          type='text'
                          placeholder='Extra'
                          endAdornment={
                            <InputAdornment position='end'>
                              <Chip label={<RemoveRounded />} onClick={() => handleRemove(index)} />
                            </InputAdornment>
                          }
                          {...register(`extras.${index}.value`)}
                        />
                      </InputErrorHelper>
                    </FormControl>
                  </Grid>
                </Fragment>
              )
            })}
          </Grid>
        </CardContent>
      )}
    </CardFieldArray>
  )
}

export default Extras
