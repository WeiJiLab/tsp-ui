import { createAsyncThunk } from '@reduxjs/toolkit';
import { publicAxios } from '../../api';
import { setToken } from '../../common';

const REGISTER_PATH = '/api/business/auth/register';
const LOGIN_PATH = '/api/business/auth/login';

export const register = createAsyncThunk(
  'auth/register',
  async (parameters: { username: string; email: string; password: string }) => {
    const res = await publicAxios.post(REGISTER_PATH, {
      username: parameters.username,
      email: parameters.email,
      password: parameters.password,
    });

    if (res.data) {
      // toast.success(`Bienvenue 👏 ${res.data.name}`);
      return res.data;
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (parameters: { email: string; password: string }) => {
    const response = await publicAxios.post(LOGIN_PATH, {
      email: parameters.email,
      password: parameters.password,
    });

    const { accessToken } = response.data;
    if (accessToken) {
      setToken(accessToken);
    }

    return response.data;
  },
);
