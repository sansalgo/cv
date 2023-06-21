import CardFieldArray from '@/components/CardFieldArray'
import ChipButton from '@/components/ChipButton'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Fragment } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
// import CardActionHeader from './components/cardActionHeader'

const Languages = () => {
  const { register, control } = useFormContext()
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'languages'
  })
  return (
    <CardFieldArray
      title='Languages'
      action={<ChipButton label={<AddRoundedIcon />} onClick={() => append()} />}
      fields={fields}
    >
      {fields.length ? (
        <CardContent>
          <Grid container spacing={2}>
            {fields.map((item, index) => {
              return (
                <Fragment key={item.id}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <OutlinedInput
                        type='text'
                        placeholder='Language'
                        endAdornment={
                          <InputAdornment position='end'>
                            <ChipButton onClick={() => remove(index)} label={<RemoveRoundedIcon />} />
                          </InputAdornment>
                        }
                        {...register(`languages.${index}.value`)}
                      />
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

export default Languages
