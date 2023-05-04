import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Pagination from '@mui/material/Pagination'
import EndCard from '@/components/EndCard'
import { Button } from '@mui/material'

const Record = ({ records }) => {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(6)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(1)
  }

  console.log(records)

  // Sample data for the table
  const rows = records.map(value => ({ id: value._id, date: value.createdAt }))

  // Calculate the index of the first and last item on the current page
  const firstItemIndex = (page - 1) * rowsPerPage
  const lastItemIndex = firstItemIndex + rowsPerPage

  // Filter the rows array to only show the rows for the current page
  const displayedRows = rows.slice(firstItemIndex, lastItemIndex)

  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedRows.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item>
        <EndCard>
          <Pagination
            count={Math.ceil(rows.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            variant='outlined'
            shape='rounded'
          />
        </EndCard>
      </Grid>
    </Grid>
  )
}

export default Record
