import BetweenElse from '@/components/BetweenElse'
import { StyledCardError } from '@/components/CardFieldArray'
import ChipButton from '@/components/ChipButton'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded'
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded'
import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

const StyledInputContentWrapper = styled(Box)(({ theme }) => ({
  '& .MuiInputBase-root': {
    paddingRight: theme.spacing(2),
    '& .MuiInputBase-input': {
      padding: theme.spacing(2)
    }
  }
}))

const FileName = () => {
  const {
    register,
    getValues,
    formState: { errors }
  } = useFormContext()
  const [isContentEditable, setIsContentEditable] = useState(false)
  const toggleContentEditable = () => {
    setIsContentEditable(prevState => !prevState)
  }
  const is_error = !!errors?.fileName?.message
  if (isContentEditable) {
    return (
      <StyledInputContentWrapper>
        <FormControl fullWidth>
          <OutlinedInput
            type='text'
            placeholder='Filename'
            fullWidth
            error={!!errors?.fileName?.message}
            endAdornment={
              <InputAdornment position='end'>
                <ChipButton label={<DoneRoundedIcon />} onClick={toggleContentEditable} />
              </InputAdornment>
            }
            {...register('fileName')}
          />
        </FormControl>
      </StyledInputContentWrapper>
    )
  }
  return (
    <StyledCardError error={is_error}>
      <CardContent>
        <BetweenElse>
          {is_error ? <Box color='error.main'>{errors?.fileName?.message}</Box> : <Box>{getValues('fileName')}</Box>}
          <ChipButton label={<DriveFileRenameOutlineRoundedIcon fontSize='small' />} onClick={toggleContentEditable} />
        </BetweenElse>
      </CardContent>
    </StyledCardError>
  )
}

export default FileName
