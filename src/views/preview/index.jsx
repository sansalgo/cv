import { Document, Page, pdfjs } from 'react-pdf'
import { pdf } from '@react-pdf/renderer'
import { useState } from 'react'
import src from 'pdfjs-dist/build/pdf.worker.js'
import { useEffect } from 'react'
import PDFDocument from './PDFDocument'
import { createContext } from 'react'
import axios from 'axios'
// import { useFormContext, useWatch } from 'react-hook-form'

pdfjs.GlobalWorkerOptions.workerSrc = src

export default ({ record }) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null)


  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }



  useEffect(() => {
    const fetchPdfBuffer = async () => {
      try {
        const response = await axios.post(`/api/pdf`, )
      } catch (error) {
        console.log("Error fetching PDF", error)
        return null
      }
    }
  }, [])

  return (
    <div>
      <Document file={blobURL} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>
    </div>
  )
}
