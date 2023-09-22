import BetweenElse from '@/components/BetweenElse'
import { renameRecord } from '@/store/record'
import schema from '@/utils/validation-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, CardContent } from '@mui/material'
import Button from '@mui/material/Button'
import MuiCircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from './DialogContext'
import { styled } from '@mui/material/styles'
import { useDispatch } from 'react-redux'

const CircularProgress = styled(MuiCircularProgress)(({ theme, disabled }) => ({
  width: `${theme.spacing(3.0625)} !important`,
  height: `${theme.spacing(3.0625)} !important`,
  color: disabled ? theme.palette.action.disabled : theme.palette.primary.main
}))

const DialogRename = ({ id }) => {
  const {
    state: { rename_d },
    dispatch: localDispatch
  } = useDialog()
  const dispatch = useDispatch()
  const handleRenameDialog = () => localDispatch({ type: 'rename_d' })

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

  return (
    <Dialog fullWidth maxWidth='xs' open={rename_d} onClose={handleRenameDialog}>
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
              <Button variant='outlined' color='secondary' onClick={handleRenameDialog}>
                Cancel
              </Button>
              <Button disabled={isLoading} variant='contained' type='submit'>
                {isLoading ? <CircularProgress disabled={isLoading} /> : 'Rename'}
              </Button>
            </BetweenElse>
          </Stack>
        </CardContent>
      </form>
    </Dialog>
  )
}

export default DialogRename
