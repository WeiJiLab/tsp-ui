import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { createProject, pageProjects } from "./projectThunk";

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

export const projectSlice = createSlice({
  name: "project",
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
        .addCase(pageProjects.pending, (state) => {
          state.loading = true;
        })
        .addCase(pageProjects.fulfilled, (state, action: PayloadAction<any>) => {
          state.data = action.payload;
          state.loading = false;
        })
        .addCase(pageProjects.rejected, (state, action) => {
          state.loading = false;
        })
        // 创建
        .addCase(createProject.pending, (state) => {
          state.loading = true;
        })
        .addCase(createProject.fulfilled, (state, action: PayloadAction<any>) => {
          state.data = action.payload;
          state.loading = false;
        })
        .addCase(createProject.rejected, (state, action) => {
          state.loading = false;
        })

  }
})
