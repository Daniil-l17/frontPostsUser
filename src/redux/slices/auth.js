import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

  export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
    const {data} = await axios.post('http://localhost:4777/auth/login',params)
    return data
  })

  export const fetchRegister = createAsyncThunk('auth/fetchRegistrer', async (params) => {
    const {data} = await axios.post('http://localhost:4777/auth/register',params)
    return data
  })

  export const fetchUserMe= createAsyncThunk('auth/fetchUserMe', async () => {
    const {data} = await axios.get('http://localhost:4777/auth/me', {headers: {'authorization': localStorage.getItem('toket')}})
    return data
  })

  const initialState = {
    data: null,
    status: 'loading'
  }

    const authSlice = createSlice({
      name: 'auth',
      initialState,
      reducers: {
        logout: (state) => {
          state.data = null
        }
      },
      extraReducers:{
        [fetchUserData.pending]: (state) => {
          state.status = 'loading'
          state.data = null
        },
        [fetchUserData.fulfilled]: (state,actions) => {
          state.status = 'loaded'
          state.data = actions.payload
        },
        [fetchUserData.rejected]: (state) => {
          state.status = 'error'
          state.data = null
        },
        [fetchUserMe.pending]: (state) => {
          state.status = 'loading'
          state.data = null
        },
        [fetchUserMe.fulfilled]: (state,actions) => {
          state.status = 'loaded'
          state.data = actions.payload
        },
        [fetchUserMe.rejected]: (state) => {
          state.status = 'error'
          state.data = null
        },
        [fetchRegister.pending]: (state) => {
          state.status = 'loading'
          state.data = null
        },
        [fetchRegister.fulfilled]: (state,actions) => {
          state.status = 'loaded'
          state.data = actions.payload
        },
        [fetchRegister.rejected]: (state) => {
          state.status = 'error'
          state.data = null
        },
      }
    })


    export const authuser = state => Boolean(state.auth.data)
    export const authReducer = authSlice.reducer
    export const {actions} = authSlice