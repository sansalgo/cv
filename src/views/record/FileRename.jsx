import BetweenElse from '@/components/BetweenElse'
import schema from '@/utils/validation-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded'
import { Box, CardContent } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import axios from 'axios'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

const FileRename = ({id}) => {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const validationSchema = schema([{ field: 'fileName' }])
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema) })
  const onSubmit = data => {
    startTransition(async () => {
      await axios.put(`/api/records/drafts/${id}`, { fileName: data.fileName })
    })
  }
  return (
    <div>
      <DriveFileRenameOutlineRoundedIcon onClick={handleOpen} />
      <Dialog fullWidth maxWidth='xs' open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Stack spacing={2}>
              <Box>
                <OutlinedInput
                  fullWidth
                  type='text'
                  placeholder='Filename'
                  error={!!errors.fileName}
                  {...register('fileName')}
                />
                <FormHelperText error>{errors.fileName?.message}</FormHelperText>
              </Box>
              <BetweenElse>
                <Button variant='outlined' color='secondary' onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant='contained' type='submit'>
                  Rename
                </Button>
              </BetweenElse>
            </Stack>
          </CardContent>
        </form>
      </Dialog>
    </div>
  )
}

export default FileRename
