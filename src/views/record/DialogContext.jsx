import { createContext, useContext, useReducer } from 'react'
import dialogReducer from './dialogReducer'

const DialogContext = createContext()

export const useDialog = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialog must be used within a DialogContext')
  }
  return context
}

export const DialogProvider = ({ children }) => {
  const initialState = { action_d: false, rename_d: false, delete_d: false }
  const [state, dispatch] = useReducer(dialogReducer, initialState)

  return <DialogContext.Provider value={{ state, dispatch }}>{children}</DialogContext.Provider>
}
