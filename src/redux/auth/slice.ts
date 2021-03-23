import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { setError } from "../../api/error";
import { publicAxios } from "../../api";
import { removeToken, setToken } from "../../common";

interface AuthState {
  loading: boolean;
  error: any;
  token: string | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  token: null
}

const REGISTER_PATH = "/api/business/auth/register";
const LOGIN_PATH = "/api/business/auth/login";

export const register = createAsyncThunk(
    "auth/register",
    async (parameters: {
             username: string,
             email: string,
             password: string,
           },
           thunkAPI
    ) => {

      try {
        const res = await publicAxios.post(REGISTER_PATH, {
          username: parameters.email,
          email: parameters.email,
          password: parameters.password,
        });

        if (res.data) {
          // toast.success(`Bienvenue 👏 ${res.data.name}`);
          return res.data;
        }
      } catch (error: any) {
        const message = setError(error);
        // toast.error(message);
        thunkAPI.rejectWithValue(message);
      }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (parameters: {
      email: string,
      password: string,
    }) => {
      const response = await publicAxios.post(LOGIN_PATH, {
        email: parameters.email,
        password: parameters.password,
      });

      const accessToken = response.data.accessToken
      if (accessToken) {
        setToken(accessToken)
      }

      return accessToken;
    }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.error = null;
      state.loading = false;
      removeToken();
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(register.pending, (state) => {
          state.loading = true;
        })
        .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
          state.token = action.payload;
          state.loading = false;
          state.error = null;
        })
        .addCase(register.rejected, (state, action) => {
          state.error = action.payload;
          state.loading = false;
        })
        .addCase(login.pending, (state) => {
          state.loading = true;
        })
        .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
          state.token = action.payload;
          state.loading = false;
          state.error = null;
        })
        .addCase(login.rejected, (state, action) => {
          state.error = action.payload;
          state.loading = false;
        })
  }
})
