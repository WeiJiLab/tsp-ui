import axios from 'axios'
import HttpApiService from './http-api-service'
import { config } from '../common'

const axiosInstance = axios.create({
  baseURL: config.api.API_URL,
  timeout: 30000,
})

export const publicAxios = new HttpApiService(axiosInstance)
