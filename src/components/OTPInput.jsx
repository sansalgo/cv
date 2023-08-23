import Grid from '@mui/material/Grid'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useState } from 'react'

const OTPInput = ({ length, name, register, errors }) => {
  const inputLength = [...Array(length).keys()]
  const [isBackspace, setIsBackspace] = useState(false)

  const handleChange = event => {
    if (!isBackspace) {
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (form[index].value && form[index].value.length) {
        form.elements[index + 2].focus()
      }
    }
  }

  const handleKeyDown = event => {
    if (event.key === 'Backspace') {
      setIsBackspace(true)

      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (index >= 1) {
        if (!(form[index].value && form[index].value.length)) {
          form.elements[index - 2].focus()
        }
      }
    } else {
      setIsBackspace(false)
    }
  }

  return (
    <Grid container spacing={2}>
      {inputLength.map(index => (
        <Grid item xs={2} key={index}>
          <OutlinedInput
            error={!!errors[name] && !!errors[name][index]}
            inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
            {...register(name + `[${index}]`, { onChange: event => handleChange(event) })}
            onKeyDown={event => handleKeyDown(event)}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default OTPInput
