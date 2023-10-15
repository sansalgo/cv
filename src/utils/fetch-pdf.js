import PDF from '@/views/pdf'
import { pdf } from '@react-pdf/renderer'
import axios from 'axios'

const fetchRecord = async id => {
  try {
    const response = await axios.get(`/api/records/${id}`)
    return response.data
  } catch (error) {
    console.log('Error fetching PDF', error)
    return null
  }
}

const fetchPdfBlob = async id => {
  const record = await fetchRecord(id)
  if (record) {
    const blob = await pdf(PDF(record)).toBlob()
    const url = URL.createObjectURL(blob)
    return url
  }

  return null
}

export { fetchPdfBlob }
