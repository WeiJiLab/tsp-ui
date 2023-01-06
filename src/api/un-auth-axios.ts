import axios from 'axios';
import HttpApiService from './http-api-service';
import { config } from '../common';

export const axiosPublicInstance = axios.create({
  baseURL: config.api.API_URL,
  timeout: 30000,
});

export const unAuthAxios = new HttpApiService(axiosPublicInstance);
