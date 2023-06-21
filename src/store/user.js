import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const checkUser = createAsyncThunk('user/checkUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/users/check`, data)
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue({ status: error.response.status, data: error.response.data })
  }
})

export const sendOTP = createAsyncThunk('user/sendOTP', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/otp/send`, data)
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue({ status: error.response.status, data: error.response.data })
  }
})

export const verifyOTP = createAsyncThunk('user/verifyOTP', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/otp/verify`, data)
    return response.data
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue({ status: error.response.status, data: error.response.data })
  }
})

export const addUser = createAsyncThunk('user/addUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/auth/register`, data)
    return response.data
  } catch (error) {
    console.log(error)
    if (!error.response) {
      throw error
    }
    return rejectWithValue({ status: error.response.status, data: error.response.data })
  }
})

export const updateUser = createAsyncThunk('user/updateUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`/api/users`, data)
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue({ status: error.response.status, data: error.response.data })
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState: { checkUserCatch: {} },
  reducers: {}
})

export default userSlice.reducer
