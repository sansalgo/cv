import Grid from '@mui/material/Grid'
import OutlinedInput from '@mui/material/OutlinedInput'
import { forwardRef, useRef } from 'react'

const OTPInput = ({ length, name, register,  errors }) => {
  const { current } = useRef([])
  const inputLength = [...Array(length).keys()]

  const handleChange = (event, index) => {
    const { value } = event.target
    if (value.length === 0 && index > 0) {
      current[index - 1].focus()
    } else if (value.length === 1 && index < current.length - 1) {
      current[index + 1].focus()
    }
  }

  return (
    <Grid container spacing={2}>
      {inputLength.map(index => (
        <Grid item xs={2} key={index}>
          <OutlinedInput
            error={!!errors.otp && !!errors.otp[index]}
            inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
            {...register(name + `[${index}]`, { onChange: event => handleChange(event, index) })}
            inputRef={event => (current[index] = event)}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default OTPInput
