import axios, { AxiosRequestConfig } from 'axios';
import { config, getToken } from '../common';
import HttpApiService from './http-api-service';

export const axiosAuthInstance = axios.create({
  baseURL: config.api.API_URL,
  timeout: 30000,
});

const authorizationProvider = () => {
  axiosAuthInstance.interceptors.request.use((requestConfig: any) => {
    const token = getToken();

    return {
      ...requestConfig,
      headers: {
        ...requestConfig.headers,
        Authorization: config.api.TOKEN_SUFFIX + token,
      },
    };
  });
};

authorizationProvider();

export const authAxios = new HttpApiService(axiosAuthInstance);
