import { Document, Page, pdfjs } from 'react-pdf'
import { pdf } from '@react-pdf/renderer'
import { useState } from 'react'
import src from 'pdfjs-dist/build/pdf.worker.js'
import { useEffect } from 'react'
import PDFDocument from './PDFDocument'
import { createContext } from 'react'
// import { useFormContext, useWatch } from 'react-hook-form'

pdfjs.GlobalWorkerOptions.workerSrc = src

export default ({ record }) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [blobURL, setBlobURL] = useState('')

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const getBlobURL = async record => {
    const blob = await pdf(<PDFDocument record={record} />).toBlob()
    const url = URL.createObjectURL(blob)
    setBlobURL(url)
  }

  useEffect(() => {
    if (Object.keys(record).length) {
      getBlobURL(record)
    } else {
      // console.log(record)
      const record = JSON.parse(localStorage.getItem('record'))
      console.log(record)
      getBlobURL(record)
    }
  }, [])

  console.log(blobURL)

  return (
    <div>
      <Document file={blobURL} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>
    </div>
  )
}
