import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import record from './record'

const store = () =>
  configureStore({
    reducer: {
      record
    },
    devTools: true
  })

export const wrapper = createWrapper(store)
