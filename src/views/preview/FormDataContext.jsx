import { useContext } from 'react'

const { createContext } = require('react')

const FormDataContext = createContext({})

export const useFormData = () => useContext(FormDataContext)

export const FormDataProvider = ({ data, children }) => {
  return <FormDataContext.Provider value={data}>{children}</FormDataContext.Provider>
}
