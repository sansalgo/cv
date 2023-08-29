import { deleteRecord } from '@/store/record'
import { fetchPdfBlob } from '@/utils/fetch-pdf'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded'
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'
import { Fragment, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import FileRename from './FileRename'

const MenuAction = ({ row, setNameEditableId }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleFileRename = () => {
    setNameEditableId(row._id)
  }

  const handleEdit = () => {
    router.push(`/form/${row._id}`)
  }

  const handlePreview = () => {
    router.push({
      pathname: `/preview/${row._id}`
    })
  }

  const handleDownload = async () => {
    await fetchPdfBlob(row._id).then(blob => {
      if (blob) {
        const link = document.createElement('a')
        link.href = blob
        link.download = `${row.name}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(blob)
      }
    })
  }

  const handelDelete = () => {
    dispatch(deleteRecord(row._id))
  }

  return (
    <Fragment>
      <IconButton onClick={handleOpen} sx={{ padding: 0 }}>
        <MoreVertIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <MenuList
          component={Stack}
          direction='row'
          divider={<Divider orientation='vertical' variant='middle' />}
          autoFocusItem={open}
        >
          <MenuItem>
            <IconButton>
              <FileRename id={row._id} />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handleEdit}>
            <IconButton>
              <ModeEditRoundedIcon />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handlePreview}>
            <IconButton>
              <VisibilityRoundedIcon />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handleDownload}>
            <IconButton>
              <FileDownloadRoundedIcon />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handelDelete}>
            <IconButton>
              <DeleteRoundedIcon />
            </IconButton>
          </MenuItem>
        </MenuList>
      </Dialog>
    </Fragment>
  )
}

export default MenuAction
