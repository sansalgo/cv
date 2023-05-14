import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { HYDRATE } from 'next-redux-wrapper'

export const deleteRecord = createAsyncThunk('record/deleteRecord', async (id, { getState }) => {
  await axios.delete(`/api/records/${id}`)
  const { record } = getState()
  return record.records.filter(value => value._id !== id)
})

export const recordSlice = createSlice({
  name: 'record',
  initialState: {
    records: []
  },
  reducers: {
    setRecords: (state, action) => {
      state.records = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action.payload.record
        }
      })
      .addCase(deleteRecord.fulfilled, (state, action) => {
        state.records = action.payload
      })
  }
})

export const { setRecords } = recordSlice.actions

export default recordSlice.reducer
