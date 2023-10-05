import EndCard from '@/components/EndCard'
import { fetchPdfBlob } from '@/utils/fetch-pdf'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import LoadingButton from '@mui/lab/LoadingButton'
import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString()

const DocumentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  '& .react-pdf__Document': {
    maxWidth: '100%',
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
    '& .react-pdf__Page': {
      '& .react-pdf__Page__canvas': {
        maxWidth: '100%',
        height: 'auto !important',
        margin: 'auto'
      }
    },
    '& .react-pdf__message': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
      maxWidth: '100%',
      width: '594px',
      aspectRatio: '1 / 1.4142'
    }
  },
  '& .pagination': {
    position: 'absolute',
    opacity: 0,
    bottom: '4%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'fit-content'
  },
  '& .pagination:hover': {
    opacity: 1
  },
  '& .react-pdf__Document:hover ~ .pagination': {
    opacity: 1
  }
}))

const CircularProgressWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  maxWidth: '100%',
  width: '594px',
  aspectRatio: '1 / 1.4142'
}))

export default () => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [pdfBlob, setPdfBlob] = useState(null)
  const router = useRouter()
  const { id, back, draft } = router.query
  const haveNextPage = pageNumber < numPages
  const havePreviousPage = pageNumber - 1 > 0

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const onSubmit = async () => {
    setIsLoading(true)
    if (draft) await axios.patch(`/api/records/drafts/${id}`)
    setIsLoading(false)
    router.push(`/`)
  }

  const goBack = () => {
    router.push(back ?? `/form/${id}`)
  }

  const nextPage = () => {
    if (haveNextPage) {
      setPageNumber(pageNumber + 1)
    }
  }

  const previousPage = () => {
    if (havePreviousPage) {
      setPageNumber(pageNumber - 1)
    }
  }

  useEffect(() => {
    fetchPdfBlob(id).then(blob => setPdfBlob(blob))

    return () => {
      URL.revokeObjectURL(pdfBlob)
    }
  }, [])

  return (
    <div>
      {pdfBlob ? (
        <DocumentWrapper>
          <Document file={pdfBlob} loading={<CircularProgress />} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
          </Document>
          <Box className='pagination' component={Paper}>
            <IconButton color='primary' disabled={!havePreviousPage} onClick={previousPage}>
              <KeyboardArrowLeftRoundedIcon />
            </IconButton>
            <Box component='span'>
              {pageNumber} of {numPages}
            </Box>
            <IconButton color='primary' disabled={!haveNextPage} onClick={nextPage}>
              <KeyboardArrowRightRoundedIcon />
            </IconButton>
          </Box>
        </DocumentWrapper>
      ) : (
        <CircularProgressWrapper>
          <CircularProgress />
        </CircularProgressWrapper>
      )}
      <EndCard sx={{ marginTop: 3 }}>
        <Button variant='outlined' color='secondary' onClick={goBack}>
          Back
        </Button>
        <LoadingButton color='primary' variant='contained' loading={isLoading} onClick={onSubmit}>
          <span>Save</span>
        </LoadingButton>
      </EndCard>
    </div>
  )
}
