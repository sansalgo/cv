import BetweenElse from '@/components/BetweenElse'
import { CardError } from '@/components/CardFieldArray'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded'
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded'
import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

const InputContentWrapper = styled(Box)(({ theme }) => ({
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
      <InputContentWrapper>
        <FormControl fullWidth>
          <OutlinedInput
            type='text'
            placeholder='Filename'
            fullWidth
            error={!!errors?.fileName?.message}
            endAdornment={
              <InputAdornment position='end'>
                <Chip label={<DoneRoundedIcon />} onClick={toggleContentEditable} />
              </InputAdornment>
            }
            {...register('fileName')}
          />
        </FormControl>
      </InputContentWrapper>
    )
  }
  return (
    <CardError error={is_error}>
      <CardContent>
        <BetweenElse>
          {is_error ? <Box color='error.main'>{errors?.fileName?.message}</Box> : <Box>{getValues('fileName')}</Box>}
          <Chip label={<DriveFileRenameOutlineRoundedIcon fontSize='small' />} onClick={toggleContentEditable} />
        </BetweenElse>
      </CardContent>
    </CardError>
  )
}

export default FileName
