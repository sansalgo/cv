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

const Skills = () => {
  const {
    register,
    control,
    trigger,
    formState: { errors }
  } = useFormContext()
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'skills'
  })

  const is_empty = errors?.skills?.type === 'atLeastOneSkill'

  const handleAppend = () => {
    append()
    if (is_empty) trigger('skills')
  }
  const handleRemove = index => {
    remove(index)
    trigger('skills')
  }

  return (
    <CardFieldArray
      title='Skills'
      action={<ChipButton label={<AddRoundedIcon />} onClick={() => handleAppend()} />}
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
                      <InputErrorHelper errorMessage={errors?.skills?.[index]?.value?.message}>
                        <OutlinedInput
                          error={!!errors?.skills?.[index]?.value?.message}
                          fullWidth
                          type='text'
                          placeholder='Skill'
                          endAdornment={
                            <InputAdornment position='end'>
                              <ChipButton onClick={() => handleRemove(index)} label={<RemoveRoundedIcon />} />
                            </InputAdornment>
                          }
                          {...register(`skills.${index}.value`)}
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

export default Skills
