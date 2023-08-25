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
import { useState, useTransition } from 'react'

import Stack from '@mui/material/Stack'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import FileName from './FileName'
import MenuAction from './MenuAction'
import useMediaQuery from '@mui/material/useMediaQuery'

const Record = () => {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(6)
  const { records } = useSelector(state => state.record)
  const [isPending, startTransition] = useTransition()
  const [nameEditableId, setNameEditableId] = useState(null)
  const width = useMediaQuery('(min-width:600px)')

  const router = useRouter()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const createNewRecord = () => {
    startTransition(async () => {
      const response = await axios.get(`/api/records/drafts`)
      router.push(`/form/${response.data._id}`)
    })
  }

  const rows = [records, records, records, records, records, records, records, records, records, records]
    .flat()
    .map((value, index) => ({
      _id: value._id,
      index: index + 1,
      name: value.fileName,
      dateCreated: formatDateTime(value.createdAt),
      dateModified: formatDateTime(value.updatedAt)
    }))

  const firstItemIndex = (page - 1) * rowsPerPage
  const lastItemIndex = firstItemIndex + rowsPerPage

  const displayedRows = rows.slice(firstItemIndex, lastItemIndex)

  return (
    <Stack spacing={2}>
      <Box display='flex' justifyContent='flex-end'>
        <Button variant='contained' onClick={createNewRecord} startIcon={<AddRoundedIcon color='white' />}>
          New Record
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Date Modified</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map(row => (
              <TableRow key={row.index}>
                <TableCell>{row.index}</TableCell>
                <TableCell>
                  <FileName isEditable={nameEditableId === row._id} setNameEditableId={setNameEditableId}>
                    {row.name}
                  </FileName>
                </TableCell>
                <TableCell>{row.dateCreated}</TableCell>
                <TableCell>{row.dateModified}</TableCell>
                <TableCell align='center'>{<MenuAction row={row} setNameEditableId={setNameEditableId} />}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EndCard>
        <Pagination
          count={Math.ceil(rows.length / rowsPerPage)}
          page={page}
          size={width ? 'medium' : 'small'}
          onChange={handleChangePage}
          variant='outlined'
          shape='rounded'
        />
      </EndCard>
    </Stack>
  )
}

export default Record
