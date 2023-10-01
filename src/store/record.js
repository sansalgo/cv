import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { HYDRATE } from 'next-redux-wrapper'

export const getRecords = createAsyncThunk('record/getRecords', async (_, { getState }) => {
  const state = getState()
  const {
    records: { page, page_size }
  } = state.record
  const response = await axios.get(`/api/records`, { params: { page, page_size } })
  return response.data
})

export const getRecord = createAsyncThunk('record/getRecord', async id => {
  const response = await axios.get(`/api/records/${id}`)
  return response.data
})

export const renameRecord = createAsyncThunk('record/renameRecord', async ({ id, fileName }, { dispatch }) => {
  await axios.put(`/api/records/${id}`, { fileName })
  dispatch(getRecords())
})

export const deleteRecord = createAsyncThunk('record/deleteRecord', async (id, { dispatch }) => {
  await axios.delete(`/api/records/${id}`)
  dispatch(getRecords())
})

export const recordSlice = createSlice({
  name: 'record',
  initialState: {
    records: [],
    record: {}
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
      .addCase(getRecords.fulfilled, (state, action) => {
        state.records = action.payload
      })
      .addCase(getRecord.fulfilled, (state, action) => {
        state.record = action.payload
      })
  }
})

export const { setRecords } = recordSlice.actions

export default recordSlice.reducer
