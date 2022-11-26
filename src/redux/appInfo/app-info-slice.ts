import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  createAppInfo,
  deleteAppInfoById,
  findAppInfoById,
  pageAppInfo,
  updateAppInfo,
} from './app-info-thunks';

export interface AppInfoState {
  isRefresh: boolean;
  loading: boolean;
  data: any;
}

const initialState: AppInfoState = {
  isRefresh: false,
  loading: false,
  data: null,
};

export const appInfoSlice = createSlice({
  name: 'appInfo',
  initialState,
  reducers: {
    refreshPage: (state) => {
      state.isRefresh = true;
    },

    refreshFinish: (state) => {
      state.isRefresh = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 分页查询
      .addCase(pageAppInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(pageAppInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(pageAppInfo.rejected, (state) => {
        state.loading = false;
      })
      // 按照id查询详情
      .addCase(findAppInfoById.pending, (state) => {
        state.loading = true;
      })
      .addCase(findAppInfoById.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(findAppInfoById.rejected, (state) => {
        state.loading = false;
      })
      // 创建
      .addCase(createAppInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAppInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(createAppInfo.rejected, (state) => {
        state.loading = false;
      })
      // 更新
      .addCase(updateAppInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAppInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(updateAppInfo.rejected, (state) => {
        state.loading = false;
      })
      // 删除
      .addCase(deleteAppInfoById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAppInfoById.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(deleteAppInfoById.rejected, (state) => {
        state.loading = false;
      });
  },
});
