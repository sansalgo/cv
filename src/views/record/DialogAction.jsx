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
import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { DialogProvider, useDialog } from './DialogContext'
import DialogRename from './DialogRename'
import DialogDelete from './DialogDelete'

const CircularProgress = styled(MuiCircularProgress)(({ theme }) => ({
  width: `${theme.spacing(2.5)} !important`,
  height: `${theme.spacing(2.5)} !important`,
  color: theme.palette.primary.main
}))

const DialogAction = ({ row }) => {
  const {
    state: { action_d },
    dispatch: localDispatch
  } = useDialog()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(null)

  const router = useRouter()

  const handleDialogAction = () => localDispatch({ type: 'action_d' })

  const handleEdit = () => {
    router.push(`/form/${row._id}`)
  }

  const handlePreview = () => {
    router.push(
      {
        pathname: `/preview/[id]`,
        query: { id: row._id, back: '/', draft: row.draft }
      },
      `/preview/${row._id}`
    )
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

  return (
    <Fragment>
      <IconButton color='primary' onClick={handleDialogAction} sx={{ padding: 0 }}>
        <MoreVertIcon />
      </IconButton>
      <Dialog open={action_d} onClose={handleDialogAction}>
        <MenuList
          component={Stack}
          direction='row'
          divider={<Divider orientation='vertical' variant='middle' />}
          autoFocusItem={action_d}
        >
          <MenuItem onClick={() => localDispatch({ type: 'rename_d' })}>
            <IconButton color='primary' disabled={!!isLoading}>
              <DriveFileRenameOutlineRoundedIcon />
            </IconButton>
          </MenuItem>
          <DialogRename id={row._id} currentFileName={row.name} />
          <MenuItem onClick={handleEdit}>
            <IconButton color='primary' disabled={!!isLoading}>
              <ModeEditRoundedIcon />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handlePreview}>
            <IconButton color='primary' disabled={!!isLoading}>
              <VisibilityRoundedIcon />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handleDownload}>
            <IconButton color='primary' disabled={!!isLoading}>
              {isLoading === 'download' ? <CircularProgress /> : <FileDownloadRoundedIcon />}
            </IconButton>
          </MenuItem>
          <MenuItem onClick={() => localDispatch({ type: 'delete_d' })}>
            <IconButton color='primary' disabled={!!isLoading}>
              {isLoading === 'delete' ? <CircularProgress /> : <DeleteRoundedIcon />}
            </IconButton>
          </MenuItem>
          <DialogDelete id={row._id} />
        </MenuList>
      </Dialog>
    </Fragment>
  )
}

export default ({ ...rest }) => {
  return (
    <DialogProvider>
      <DialogAction {...rest} />
    </DialogProvider>
  )
}
