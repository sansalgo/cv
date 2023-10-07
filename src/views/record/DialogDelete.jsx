import BetweenElse from '@/components/BetweenElse'
import { deleteRecord } from '@/store/record'
import LoadingButton from '@mui/lab/LoadingButton'
import { CardContent } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useDialog } from './DialogContext'

const DialogDelete = ({ id }) => {
  const {
    state: { delete_d },
    dispatch: localDispatch
  } = useDialog()
  const dispatch = useDispatch()
  const handleDeleteDialog = () => localDispatch({ type: 'delete_d' })
  const [isLoading, setIsLoading] = useState(false)

  const handelDelete = () => {
    setIsLoading(true)
    dispatch(deleteRecord(id))
      .unwrap()
      .finally(() => {
        setIsLoading(false)
        handleDeleteDialog()
      })
  }

  return (
    <Dialog fullWidth maxWidth='xs' open={delete_d} onClose={handleDeleteDialog}>
      <CardContent>
        <Stack spacing={2}>
          <Typography>Are you sure you want to delete this record? This action cannot be undone.</Typography>
          <BetweenElse>
            <Button variant='outlined' color='secondary' onClick={handleDeleteDialog}>
              Cancel
            </Button>
            <LoadingButton loading={isLoading} onClick={handelDelete} variant='contained'>
              <span>Delete</span>
            </LoadingButton>
          </BetweenElse>
        </Stack>
      </CardContent>
    </Dialog>
  )
}

export default DialogDelete
