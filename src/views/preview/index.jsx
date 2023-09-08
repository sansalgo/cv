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

// import { useFormContext, useWatch } from 'react-hook-form'

pdfjs.GlobalWorkerOptions.workerSrc = src

export default ({ record }) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pdfBlob, setPdfBlob] = useState(null)
  const router = useRouter()
  const id = router.query.id

  const DocumentWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    '& .react-pdf__Document': {
      borderRadius: theme.shape.borderRadius,
      '& .react-pdf__Page': {
        '& .react-pdf__Page__canvas': {
          maxWidth: '100%',
          height: 'auto !important'
        }
      },
      '& .react-pdf__message': {
        maxWidth: '100%',
        width: '594px',
        aspectRatio: '1 / 1.4142',
        textAlign: 'center'
      }
    }
  }))

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const onSubmit = async () => {
    await axios.put(`/api/records/drafts/${id}`, { draft: false })

    router.push(`/`)
  }

  const gotoForm = () => {
    router.push(`/form/${id}`)
  }

  useEffect(() => {
    console.log('call & call')
    fetchPdfBlob(id).then(blob => setPdfBlob(blob))

    return () => {
      URL.revokeObjectURL(pdfBlob)
    }
  }, [])

  if (pdfBlob === null) {
    return (
      <ContainerCenter maxWidth='xs'>
        <LinearProgress sx={{ borderRadius: '1px' }} />
      </ContainerCenter>
    )
  }

  return (
    <div>
      <DocumentWrapper>
        <Document file={pdfBlob + 1} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>
      </DocumentWrapper>
      <EndCard sx={{ marginTop: '10px' }}>
        <Button variant='outlined' color='secondary' onClick={gotoForm}>
          Back
        </Button>
        <Button variant='contained' onClick={onSubmit}>
          Save
        </Button>
      </EndCard>
    </div>
  )
}
