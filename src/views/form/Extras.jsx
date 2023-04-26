import { useFormContext, useFieldArray } from 'react-hook-form'
import AddRounded from '@mui/icons-material/AddRounded'
import RemoveRounded from '@mui/icons-material/RemoveRounded'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { Fragment } from 'react'
import ChipButton from '@/components/chipButton'
// import CardActionHeader from './components/cardActionHeader'
import CardFieldArray from './components/CardFieldArray'

const Extras = () => {
  const { register, control } = useFormContext()
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'extras'
  })
  return (
    <CardFieldArray
      title='Extras'
      action={<ChipButton color='primary' variant='outlined' label={<AddRounded />} onClick={() => append()} />}
      fields={fields}
    >
      {fields.length > 0 && (
        <CardContent>
          <Grid container spacing={2}>
            {fields.map((item, index) => {
              return (
                <Fragment key={item.id}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <OutlinedInput
                        type='text'
                        placeholder='Extra'
                        endAdornment={
                          <InputAdornment position='end'>
                            <ChipButton
                              color='primary'
                              variant='outlined'
                              label={<RemoveRounded />}
                              onClick={() => remove(index)}
                            />
                          </InputAdornment>
                        }
                        {...register(`extras.${index}.value`)}
                      />
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
