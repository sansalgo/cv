import CardFieldArray from '@/components/CardFieldArray'
import InputErrorHelper from '@/components/InputErrorHelper'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Fragment } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
// import CardActionHeader from './components/cardActionHeader'

const Languages = () => {
  const {
    register,
    control,
    trigger,
    formState: { errors }
  } = useFormContext()
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'languages'
  })

  const is_empty = errors?.languages?.type === 'atLeastOneLanguage'

  const handleAppend = () => {
    append()
    if (is_empty) trigger('languages')
  }
  const handleRemove = index => {
    remove(index)
    trigger('languages')
  }
  return (
    <CardFieldArray
      title='Languages'
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
                      <InputErrorHelper errorMessage={errors?.languages?.[index]?.value?.message}>
                        <OutlinedInput
                          error={!!errors?.languages?.[index]?.value?.message}
                          fullWidth
                          type='text'
                          placeholder='Language'
                          endAdornment={
                            <InputAdornment position='end'>
                              <Chip onClick={() => handleRemove(index)} label={<RemoveRoundedIcon />} />
                            </InputAdornment>
                          }
                          {...register(`languages.${index}.value`)}
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

export default Languages
