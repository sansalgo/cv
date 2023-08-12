import { createContext, useContext } from 'react'

const PDFDataContext = createContext({})

export const usePDFData = () => useContext(PDFDataContext)

export const PDFDataProvider = ({ data, children }) => (
  <PDFDataContext.Provider value={data}>{children}</PDFDataContext.Provider>
)
