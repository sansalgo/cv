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

const Projects = () => {
  const { register, control } = useFormContext()
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'projects'
  })
  return (
    <CardFieldArray
      title='Projects'
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
                    <FormControl fullWidth variant='outlined'>
                      <OutlinedInput
                        type='text'
                        placeholder='Project'
                        endAdornment={
                          <InputAdornment position='end'>
                            <ChipButton label={<RemoveRoundedIcon />} onClick={() => remove(index)} />
                          </InputAdornment>
                        }
                        {...register(`projects.${index}.value`)}
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

export default Projects
