import { deleteRecord } from '@/store/record'
import { fetchPdfBlob } from '@/utils/fetch-pdf'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded'
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded'
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import MuiCircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import FileRename from './FileRename'

const CircularProgress = styled(MuiCircularProgress)(({ theme }) => ({
  width: `${theme.spacing(2.5)} !important`,
  height: `${theme.spacing(2.5)} !important`,
  color: theme.palette.primary.main
}))

const MenuAction = ({ row }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const handleMenuOpen = () => setOpenMenu(true)
  const handleMenuClose = () => setOpenMenu(false)
  const handleDialogOpen = () => setOpenDialog(true)
  const handleDialogClose = () => {
    console.log('false-----')
    setOpenDialog(prevOpenDialog => !prevOpenDialog)
  }
  const [isLoading, setIsLoading] = useState(null)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('openUseEffect', openDialog)
  }, [openDialog])

  const handleEdit = () => {
    router.push(`/form/${row._id}`)
  }

  const handlePreview = () => {
    router.push({
      pathname: `/preview/${row._id}`
    })
  }

  const handleDownload = async () => {
    setIsLoading('download')
    await fetchPdfBlob(row._id)
      .then(blob => {
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
      .finally(() => setIsLoading(null))
  }

  const handelDelete = () => {
    setIsLoading('delete')
    dispatch(deleteRecord(row._id))
      .unwrap()
      .finally(() => setIsLoading(null))
  }

  return (
    <Fragment>
      <IconButton onClick={handleMenuOpen} sx={{ padding: 0 }}>
        <MoreVertIcon />
      </IconButton>
      <Dialog open={openMenu} onClose={handleMenuClose}>
        <MenuList
          component={Stack}
          direction='row'
          divider={<Divider orientation='vertical' variant='middle' />}
          autoFocusItem={openMenu}
        >
          <MenuItem onClick={handleDialogOpen}>
            <IconButton disabled={!!isLoading}>
              <DriveFileRenameOutlineRoundedIcon />
            </IconButton>
            <FileRename id={row._id} open={openDialog} handleClose={handleDialogClose} />
          </MenuItem>
          <MenuItem onClick={handleEdit}>
            <IconButton disabled={!!isLoading}>
              <ModeEditRoundedIcon />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handlePreview}>
            <IconButton disabled={!!isLoading}>
              <VisibilityRoundedIcon />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handleDownload}>
            <IconButton disabled={!!isLoading}>
              {isLoading === 'download' ? <CircularProgress /> : <FileDownloadRoundedIcon />}
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handelDelete}>
            <IconButton disabled={!!isLoading}>
              {isLoading === 'delete' ? <CircularProgress /> : <DeleteRoundedIcon />}
            </IconButton>
          </MenuItem>
        </MenuList>
      </Dialog>
    </Fragment>
  )
}

export default MenuAction
