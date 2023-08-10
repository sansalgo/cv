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
// import { useFormContext, useWatch } from 'react-hook-form'

pdfjs.GlobalWorkerOptions.workerSrc = src

export default ({ record }) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null)
  const router = useRouter()
  const id = router.query.id

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }
  const onSubmit = () => {
    console.log('submit')
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

  return (
    <div>
      <Document file={pdfBlobUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>
      <EndCard>
        <Button variant='outlined' onClick={gotoForm}>back</Button>
        <Button variant='contained' onClick={onSubmit}>save</Button>
      </EndCard>
    </div>
  )
}
