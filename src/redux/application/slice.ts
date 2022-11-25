import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ApplicationState {
  loading: boolean;
  error: any;
  data: any;
}

const initialState: ApplicationState = {
  loading: false,
  error: null,
  data: null,
};

export const getApplications = createAsyncThunk(
  'application/getApplications',
  async (touristRouteId: string) => {
    const { data } = await axios.get(
      `http://123.56.149.216:8089/api/touristRoutes/${touristRouteId}`,
    );
    return data;
  },
);

export const productDetailSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApplications.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getApplications.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getApplications.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});
