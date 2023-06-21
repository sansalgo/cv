import ChipButton from '@/components/ChipButton'
import AddRounded from '@mui/icons-material/AddRounded'
import RemoveRounded from '@mui/icons-material/RemoveRounded'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Fragment } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
// import CardActionHeader from './components/cardActionHeader'
import CardFieldArray from '@/components/CardFieldArray'
import { FileDownloadOffSharp } from '@mui/icons-material'

const Extras = () => {
  const { register, control } = useFormContext()
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'extras'
  })
  console.log(fields)
  return (
    <CardFieldArray
      title='Extras'
      action={<ChipButton label={<AddRounded />} onClick={() => append('')} />}
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
                            <ChipButton label={<RemoveRounded />} onClick={() => remove(index)} />
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
