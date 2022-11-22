import { createAsyncThunk } from '@reduxjs/toolkit'
import { authAxios } from '../../api'
import { AppInfoForm } from '../../models'

const BASE_APP_INFO = '/api/business/app-infos'

export const pageAppInfo = createAsyncThunk('appInfos/pageAppInfo', async (params: any) => {
  const { data } = await authAxios.getWithParams(BASE_APP_INFO, params)
  return data
})

export const createAppInfo = createAsyncThunk(
  'appInfo/createAppInfo',
  async (body: AppInfoForm) => {
    const { data } = await authAxios.post(BASE_APP_INFO, {
      ...body,
    })
    return data
  },
)

export const updateAppInfo = createAsyncThunk(
  'appInfo/updateAppInfo:id',
  async (para: { id: number; body: AppInfoForm }) => {
    const { data } = await authAxios.patch(`${BASE_APP_INFO}/${para.id}`, {
      ...para.body,
    })
    return data
  },
)

export const deleteAppInfoById = createAsyncThunk(
  'appInfo/deleteAppInfoById:id',
  async (para: { id: number }) => {
    const { data } = await authAxios.delete(`${BASE_APP_INFO}`, para.id)
    return data
  },
)
