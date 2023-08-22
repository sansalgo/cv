import Grow from '@mui/material/Grow'
import Popper from '@mui/material/Popper'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Fragment, useRef, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { deleteRecord, getRecord } from '@/store/record'
import { pdf } from '@react-pdf/renderer'

const MenuAction = ({ id, setNameEditableId }) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const router = useRouter()
  const dispatch = useDispatch()
  const handleToggle = () => {
    setOpen(!open)
  }

  const handleFileRename = () => {
    setNameEditableId(id)
  }

  const handleEdit = () => {
    router.push(`/form/${id}`)
  }

  const handlePreview = () => {
    router.push({
      pathname: `/preview/${id}`,
      query: { id }
    })
  }

  const handleDownload = () => {
    // const a = document.createElement('a')
    // dispatch(getRecord(id))
    //   .unwrap()
    //   .then(async record => {
    //     const blob = await pdf(<PDFDocument record={record} />).toBlob()
    //     const href = URL.createObjectURL(blob)
    //     a.href = href
    //     a.setAttribute("download", 'test.pdf')
    //     document.body.appendChild(a)
    //     a.click()
    //     document.body.removeChild(a)
    //     URL.revokeObjectURL(href)
    //   })
  }

  const handelDelete = () => {
    dispatch(deleteRecord(id))
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
                    <IconButton onClick={handleFileRename}>
                      <DriveFileRenameOutlineRoundedIcon />
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
