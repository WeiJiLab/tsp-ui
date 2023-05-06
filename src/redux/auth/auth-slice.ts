import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { JwtUtils, removeToken, setToken } from '../../common';
import { login, register } from './auth-thunks';
import { User } from '../../@types/User';

interface AuthState {
  loading: boolean;
  error: any;
  data: any;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  data: null,
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      removeToken();
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      setToken(action.payload);
      state.user = JwtUtils.getJwtPayload(action.payload);
      state.user.role = 'admin';
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.isAuthenticated = false;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { logOut, loginSuccess } = authSlice.actions;
