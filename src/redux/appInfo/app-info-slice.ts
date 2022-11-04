import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { createAppInfo, deleteAppInfoById, pageAppInfo, updateAppInfo } from "./app-info-thunks";

interface ProjectState {
  isRefresh: boolean;
  loading: boolean;
  data: any;
}

const initialState: ProjectState = {
  isRefresh: false,
  loading: false,
  data: null
}

export const appInfoSlice = createSlice({
  name: "appInfo",
  initialState,
  reducers: {
    refreshPage: (state) => {
      state.isRefresh = true;
    },

    refreshFinish: (state) => {
      state.isRefresh = false;
    }
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
        .addCase(pageAppInfo.rejected, (state, action) => {
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
        .addCase(createAppInfo.rejected, (state, action) => {
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
        .addCase(updateAppInfo.rejected, (state, action) => {
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
        .addCase(deleteAppInfoById.rejected, (state, action) => {
          state.loading = false;
        })

  }
})
