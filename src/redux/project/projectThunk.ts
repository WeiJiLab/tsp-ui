import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAxios } from "../../api";

const BASE_PROJECTS = "/api/business/projects";

export const pageProjects = createAsyncThunk(
    "project/pageProjects",
    async (params: any) => {
      const {data} = await authAxios.getWithParams(
          BASE_PROJECTS,
          params,
      );
      return data;
    }
);

export const createProject = createAsyncThunk(
    "project/createProject",
    async (para: { name: string, description: string }) => {
      const {data} = await authAxios.post(
          BASE_PROJECTS, {
            name: para.name,
            description: para.description
          });
      return data;
    }
);

export const updateProject = createAsyncThunk(
    "project/updateProject:id",
    async (para: { id: number, name: string, description?: string }) => {
      const {data} = await authAxios.patch(
          `${BASE_PROJECTS}/${para.id}`, {
            name: para.name,
            description: para.description
          });
      return data;
    }
);

export const deleteProjectById = createAsyncThunk(
    "project/deleteProjectById:id",
    async (para: { id: number }) => {
      const {data} = await authAxios.delete(
          `${BASE_PROJECTS}`, para.id);
      return data;
    }
);
