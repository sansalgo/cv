import ContainerCenter from '@/components/ContainerCenter'
import EndCard from '@/components/EndCard'
import formatDateTime from '@/utils/format-date-time'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import DialogAction from './DialogAction'

const StyledEndCard = styled(EndCard)(({ theme }) => ({
  '& .MuiBox-root': {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    }
  }
}))

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  color: 'primary',
  width: '100%',
  borderColor: 'primary',
  padding: theme.spacing(8),
  borderStyle: 'dashed',
  '& .MuiLoadingButton-startIconLoadingStart': {
    display: 'none'
  },
  '&:hover': {
    borderStyle: 'dashed'
  },
  '&.Mui-disabled': {
    borderStyle: 'dashed'
  },
  '& .MuiLoadingButton-loadingIndicator': {
    display: 'inherit',
    position: 'unset',
    marginRight: theme.spacing(1),
    marginLeft: `-${theme.spacing(0.5)}`,
    width: theme.spacing(2.5),
    height: theme.spacing(2.5)
  }
}))

const Record = () => {
  const {
    records: { count, page, page_size, results }
  } = useSelector(state => state.record)
  const [isLoading, setIsLoading] = useState(false)
  const [nameEditableId, setNameEditableId] = useState(null)

  const router = useRouter()

  const handleChangePage = (event, newPage) => {
    router.push({ pathname: `/`, query: { page: newPage, page_size } })
  }

  const createNewRecord = async () => {
    setIsLoading(true)
    const response = await axios.get(`/api/records/drafts`).finally(() => setIsLoading(false))
    router.push(`/form/${response.data._id}`)
  }

  const rows = results.map((value, index) => ({
    _id: value._id,
    index: (page - 1) * page_size + (index + 1),
    name: value.fileName,
    dateCreated: formatDateTime(value.createdAt),
    dateModified: formatDateTime(value.updatedAt)
  }))

  return (
    <Stack spacing={2}>
      {count > 0 ? (
        <Fragment>
          <Box display='flex' justifyContent='flex-end'>
            <LoadingButton
              variant='contained'
              onClick={createNewRecord}
              loading={isLoading}
              loadingPosition='start'
              startIcon={<AddRoundedIcon color='white' />}
            >
              New Record
            </LoadingButton>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Index</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Date Created</TableCell>
                  <TableCell>Date Modified</TableCell>
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.index}>
                    <TableCell align='center'>{row.index}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.dateCreated}</TableCell>
                    <TableCell>{row.dateModified}</TableCell>
                    <TableCell align='center'>
                      {<DialogAction row={row} setNameEditableId={setNameEditableId} />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <StyledEndCard>
            <Pagination
              boundaryCount={1}
              siblingCount={0}
              count={Math.ceil(count / page_size)}
              page={page}
              size={'medium'}
              onChange={handleChangePage}
              variant='outlined'
              shape='rounded'
              renderItem={item => (
                <PaginationItem
                  slots={{ previous: KeyboardArrowLeftRoundedIcon, next: KeyboardArrowRightRoundedIcon }}
                  {...item}
                />
              )}
            />
          </StyledEndCard>
        </Fragment>
      ) : (
        <ContainerCenter maxWidth='sm'>
          <StyledLoadingButton
            loading={isLoading}
            variant='outlined'
            loadingPosition='start'
            onClick={createNewRecord}
            startIcon={<AddRoundedIcon />}
          >
            <span>New Record</span>
          </StyledLoadingButton>
        </ContainerCenter>
      )}
    </Stack>
  )
}

export default Record
