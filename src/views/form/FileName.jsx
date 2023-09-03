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
  const { register, getValues } = useFormContext()
  const [isContentEditable, setIsContentEditable] = useState(false)
  const toggleContentEditable = () => {
    setIsContentEditable(prevState => !prevState)
  }
  if (isContentEditable) {
    return (
      <StyledInputContentWrapper>
        <FormControl fullWidth>
          <OutlinedInput
            type='text'
            placeholder='Filename'
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
    <Card>
      <CardContent>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          {getValues('fileName')}
          <ChipButton label={<DriveFileRenameOutlineRoundedIcon fontSize='small' />} onClick={toggleContentEditable} />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default FileName
