import { Document, Page, pdfjs } from 'react-pdf'
import { useState } from 'react'
import src from 'pdfjs-dist/build/pdf.worker.js'
import { useEffect } from 'react'
// import PDFDocument from './PDFDocument'
import { createContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import EndCard from '@/components/EndCard'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { fetchPdfBlob } from '@/utils/fetch-pdf'
import ContainerCenter from '@/components/ContainerCenter'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import { CircularProgress, Container } from '@mui/material'
import localPdf from 'src/views/preview/6d93a92d-cd35-4156-b238-4fce8d6901a1.pdf'
import { trusted } from 'mongoose'

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString()

const DocumentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  '& .react-pdf__Document': {
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
      aspectRatio: '1 / 1.4142',
      backgroundColor: 'white'
    }
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

const CircularProgressII = styled(CircularProgress)(({ theme, disabled }) => ({
  width: `${theme.spacing(3.0625)} !important`,
  height: `${theme.spacing(3.0625)} !important`,
  color: disabled ? theme.palette.action.disabled : theme.palette.common.white
}))

export default () => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [pdfBlob, setPdfBlob] = useState(null)
  const router = useRouter()
  const { id, back, draft } = router.query

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

  useEffect(() => {
    fetchPdfBlob(id).then(blob => setPdfBlob(blob))

    return () => {
      URL.revokeObjectURL(pdfBlob)
    }
  }, [])

  return (
    <div>
      {localPdf ? (
        <>
          <DocumentWrapper>
            <Document file={localPdf} loading={<CircularProgress />} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
            </Document>
            <Box position='absolute' bottom='2%' component={Paper} width='fit-content'>
              <Chip
                size='medium'
                sx={{ border: 'none' }}
                label={<KeyboardArrowLeftRoundedIcon />}
                onClick={() => setPageNumber(pageNumber - 1)}
              />

              <Box component='span'>
                {pageNumber} of {numPages}
              </Box>
              <Chip
                size='medium'
                sx={{ border: 'none' }}
                label={<KeyboardArrowRightRoundedIcon />}
                onClick={() => setPageNumber(pageNumber + 1)}
              />
            </Box>
          </DocumentWrapper>
        </>
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
