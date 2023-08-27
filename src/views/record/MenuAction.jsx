import { deleteRecord } from '@/store/record'
import { fetchPdfBlob } from '@/utils/fetch-pdf'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded'
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded'
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Divider from '@mui/material/Divider'
import Grow from '@mui/material/Grow'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'
import { Fragment, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import FileRename from './FileRename'

const MenuAction = ({ row, setNameEditableId }) => {
  const [open, setOpen] = useState(false)

  const anchorRef = useRef(null)
  const router = useRouter()
  const dispatch = useDispatch()
  const handleToggle = () => {
    setOpen(!open)
  }

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

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  return (
    <Fragment>
      <IconButton ref={anchorRef} onClick={handleToggle} sx={{ padding: 0 }}>
        <MoreVertIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement='left'
        transition
        disablePortal
        style={{ zIndex: 2 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  component={Stack}
                  direction='row'
                  divider={<Divider orientation='vertical' variant='middle' />}
                  autoFocusItem={open}
                >
                  <MenuItem>
                    <IconButton >
                      {/* <DriveFileRenameOutlineRoundedIcon /> */}
                      <FileRename />
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
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  )
}

export default MenuAction
