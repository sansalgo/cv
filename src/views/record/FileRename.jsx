import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { Card, CardContent } from '@mui/material'
import ContainerCenter from '@/components/ContainerCenter'
import Container from '@mui/material/Container'

const FileRename = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <DriveFileRenameOutlineRoundedIcon onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <ContainerCenter maxWidth='sm'>
          <Card variant='outlined'>
            <CardContent>hello</CardContent>
          </Card>
        </ContainerCenter>
      </Modal>
    </div>
  )
}

export default FileRename
