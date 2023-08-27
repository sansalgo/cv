import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded'
import { useForm } from 'react-hook-form'
import ChipButton from '@/components/ChipButton'

const FileName = ({ isEditable, setNameEditableId, children }) => {
  const { handleSubmit, register } = useForm()
  const onSubmit = data => console.log(data)
  return isEditable ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl >
        <OutlinedInput
          type='text'
          placeholder='Filename'
          defaultValue={children}
          endAdornment={
            <InputAdornment position='end'>
              <ChipButton label={<DoneRoundedIcon />} onClick={() => setNameEditableId(null)} />
              {/* <DoneRoundedIcon /> */}
            </InputAdornment>
          }
          {...register('fileName')}
        />
      </FormControl>
    </form>
  ) : (
    children
  )
}

export default FileName
