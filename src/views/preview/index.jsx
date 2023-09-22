import { Document, Page, pdfjs } from 'react-pdf'
import { pdf } from '@react-pdf/renderer'
import { useState } from 'react'
import src from 'pdfjs-dist/build/pdf.worker.js'
import { useEffect } from 'react'
// import PDFDocument from './PDFDocument'
import { createContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import EndCard from '@/components/EndCard'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { fetchPdfBlob } from '@/utils/fetch-pdf'
import ContainerCenter from '@/components/ContainerCenter'
import { CircularProgress, Container } from '@mui/material'

pdfjs.GlobalWorkerOptions.workerSrc = src

const DocumentWrapper = styled(Box)(({ theme }) => ({
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

export default ({ record }) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [pdfBlob, setPdfBlob] = useState(null)
  const router = useRouter()
  const id = router.query.id

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const onSubmit = async () => {
    setIsLoading(true)
    await axios.put(`/api/records/drafts/${id}`, { draft: false }).finally(() => setIsLoading(false))
    router.push(`/`)
  }

  const gotoForm = () => {
    router.push(`/form/${id}`)
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
          <Document
            file={pdfBlob}
            loading={<CircularProgress />}
            // error={<Container maxWidth='lg'>some text</Container>}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
          </Document>
        </DocumentWrapper>
      ) : (
        <CircularProgressWrapper>
          <CircularProgress />
        </CircularProgressWrapper>
      )}
      <EndCard sx={{ marginTop: 3 }}>
        <Button variant='outlined' color='secondary' onClick={gotoForm}>
          Back
        </Button>
        <Button disabled={isLoading} variant='contained' onClick={onSubmit}>
          {isLoading ? <CircularProgressII disabled={isLoading} /> : 'Save'}
        </Button>
      </EndCard>
    </div>
  )
}
