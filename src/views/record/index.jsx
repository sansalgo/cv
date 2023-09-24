import EndCard from '@/components/EndCard'
import formatDateTime from '@/utils/format-date-time'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Fragment, useState } from 'react'

import MuiCircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import DialogAction from './DialogAction'
import ContainerCenter from '@/components/ContainerCenter'
import { Container } from '@mui/material'

const StyledEndCard = styled(EndCard)(({ theme }) => ({
  '& .MuiBox-root': {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    }
  }
}))

const CircularProgress = styled(MuiCircularProgress)(({ theme, disabled }) => ({
  width: `${theme.spacing(2.5)} !important`,
  height: `${theme.spacing(2.5)} !important`,
  color: disabled ? theme.palette.action.disabled : theme.palette.common.white
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
      <Box display='flex' justifyContent='flex-end'>
        <Button
          variant='contained'
          onClick={createNewRecord}
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress disabled={isLoading} /> : <AddRoundedIcon color='white' />}
        >
          New Record
        </Button>
      </Box>
      {count > 0 ? (
        <Fragment>
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
            />
          </StyledEndCard>
        </Fragment>
      ) : (
        <Box
          color='primary.main'
          padding={2}
          display='flex'
          justifyContent='center'
          alignItems='center'
          component={Paper}
        >
          No&nbsp;
          <Box color='orange' fontFamily='Roboto Slab Variable' fontWeight='bold' component='span'>
            CV
          </Box>
          &nbsp;Records Found
        </Box>
      )}
    </Stack>
  )
}

export default Record
