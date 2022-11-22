import axios, { AxiosRequestConfig } from 'axios'
import { config, getToken } from '../common'
import HttpApiService from './http-api-service'

const axiosInstance = axios.create({
  baseURL: config.api.API_URL,
  timeout: 30000,
})

const authorizationProvider = () => {
  axiosInstance.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
    const token = getToken()

    return {
      ...requestConfig,
      headers: {
        ...requestConfig.headers,
        Authorization: config.api.TOKEN_SUFFIX + token,
      },
    }
  })
}

authorizationProvider()

export const authAxios = new HttpApiService(axiosInstance)
