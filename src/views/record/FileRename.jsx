import BetweenElse from '@/components/BetweenElse'
import { renameRecord } from '@/store/record'
import schema from '@/utils/validation-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, CardContent } from '@mui/material'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const FileRename = ({ id, open, handleClose }) => {
  const dispatch = useDispatch()
  const validationSchema = schema([{ field: 'fileName' }])
  const [isLoading, setIsLoading] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema) })
  const onSubmit = data => {
    setIsLoading(true)
    dispatch(renameRecord({ id, fileName: data.fileName }))
      .unwrap()
      .finally(() => setIsLoading(false))
  }
  console.log(open)
  return (
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
              <Button variant='outlined' color='secondary' onClick={() => handleClose()}>
                Cancel
              </Button>
              <Button disabled={isLoading} variant='contained' type='submit'>
                {true ? <CircularProgress sx={{ color: 'white' }} size={24.5} /> : 'Rename'}
              </Button>
            </BetweenElse>
          </Stack>
        </CardContent>
      </form>
    </Dialog>
  )
}

export default FileRename
