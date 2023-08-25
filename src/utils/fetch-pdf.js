import axios from 'axios'

const fetchPdfBuffer = async id => {
  try {
    const response = await axios.post(`/api/pdf`, { id }, { responseType: 'arraybuffer' })
    return response.data
  } catch (error) {
    console.log('Error fetching PDF', error)
    return null
  }
}

const fetchPdfBlob = async id => {
  const pdfBuffer = await fetchPdfBuffer(id)
  if (pdfBuffer) {
    const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' })
    const blobUrl = URL.createObjectURL(pdfBlob)
    return blobUrl
  }

  return null
}

export { fetchPdfBuffer, fetchPdfBlob }
