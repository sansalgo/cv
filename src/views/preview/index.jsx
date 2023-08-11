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
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

// import { useFormContext, useWatch } from 'react-hook-form'

pdfjs.GlobalWorkerOptions.workerSrc = src

export default ({ record }) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null)
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
    const fetchPdfBuffer = async () => {
      try {
        const response = await axios.post(`/api/pdf`, { id }, { responseType: 'arraybuffer' })
        return response.data
      } catch (error) {
        console.log('Error fetching PDF', error)
        return null
      }
    }

    fetchPdfBuffer().then(pdfBuffer => {
      if (pdfBuffer) {
        const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' })

        const blobUrl = URL.createObjectURL(pdfBlob)

        setPdfBlobUrl(blobUrl)
      }
    })

    return () => {
      URL.revokeObjectURL(pdfBlobUrl)
    }
  }, [])

  return pdfBlobUrl ? (
    <div>
      <DocumentWrapper>
        <Document file={pdfBlobUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>
      </DocumentWrapper>
      <EndCard sx={{ marginTop: '10px' }}>
        <Button variant='outlined' onClick={gotoForm}>
          back
        </Button>
        <Button variant='contained' onClick={onSubmit}>
          save
        </Button>
      </EndCard>
    </div>
  ) : (
    'loadConfig...'
  )
}
