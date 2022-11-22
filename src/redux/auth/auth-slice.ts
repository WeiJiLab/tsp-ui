import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { removeToken } from '../../common'
import { login, register } from './auth-thunks'

export interface AuthState {
  loading: boolean
  error: any
  data: any
}

const initialState: AuthState = {
  loading: false,
  error: null,
  data: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.data = null
      state.error = null
      state.loading = false
      removeToken()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
  },
})

export const { logOut } = authSlice.actions
