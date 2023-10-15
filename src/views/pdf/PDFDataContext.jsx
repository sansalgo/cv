import { useContext } from 'react'

const { createContext } = require('react')

const PDFDataContext = createContext({})

export const usePDFData = () => useContext(PDFDataContext)

export const PDFDataProvider = ({ data, children }) => {
  return <PDFDataContext.Provider value={data}>{children}</PDFDataContext.Provider>
}
