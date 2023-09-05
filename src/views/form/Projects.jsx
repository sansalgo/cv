import CardFieldArray from '@/components/CardFieldArray'
import ChipButton from '@/components/ChipButton'
import InputErrorHelper from '@/components/InputErrorHelper'
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
  const {
    register,
    control,
    trigger,
    formState: { errors }
  } = useFormContext()
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'projects'
  })

  const handleAppend = () => {
    append()
    trigger('projects')
  }
  const handleRemove = index => {
    remove(index)
    trigger('projects')
  }

  return (
    <CardFieldArray
      title='Projects'
      action={<ChipButton label={<AddRoundedIcon />} onClick={() => handleAppend()} />}
      fields={fields}
      error={errors?.projects?.type === 'atLeastOneProject'}
    >
      {fields.length ? (
        <CardContent>
          <Grid container spacing={2}>
            {fields.map((item, index) => {
              return (
                <Fragment key={item.id}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputErrorHelper errorMessage={errors?.projects?.[index]?.value?.message}>
                        <OutlinedInput
                          error={!!errors?.projects?.[index]?.value?.message}
                          fullWidth
                          type='text'
                          placeholder='Project'
                          multiline
                          minRows={2}
                          endAdornment={
                            <InputAdornment position='end'>
                              <ChipButton label={<RemoveRoundedIcon />} onClick={() => handleRemove(index)} />
                            </InputAdornment>
                          }
                          {...register(`projects.${index}.value`)}
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

export default Projects
