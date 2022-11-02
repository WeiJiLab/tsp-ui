import { AxiosInstance, AxiosPromise } from 'axios';
import { HttpResponseHandlerImpl } from "./http-response-handler";

import {
  ParseOptions,
  ParsedQuery,
  StringifyOptions,
  parse,
  stringify
} from 'query-string';

class HttpApiService {
  private readonly _axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this._axiosInstance = axiosInstance;
    this.handleAxiosInstance();
  }

  private handleAxiosInstance() {
    // Add a response interceptor
    const httpResponseHandler = new HttpResponseHandlerImpl();

    this._axiosInstance.interceptors.response.use(httpResponseHandler.handleSuccess, httpResponseHandler.handleError);
  }

  public get(endpoint: string, conf = {}): AxiosPromise {
    return new Promise((resolve, reject) => {
      this._axiosInstance.get(`${endpoint}`, conf)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
    });
  }

  public getWithParams(endpoint: string, params: any, conf = {}): AxiosPromise {
    return this.get(`${endpoint}?${stringify(params)}`, conf);
  }

  public create(endpoint: string, data: {}, conf = {}): AxiosPromise {
    return this.post(endpoint, data, conf);
  }

  public post(endpoint: string, data: {}, conf = {}): AxiosPromise {
    return new Promise((resolve, reject) => {
      this._axiosInstance.post(`${endpoint}`, data, conf)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
    });
  }

  public put(endpoint: string, data: {}, conf = {}): AxiosPromise {
    return new Promise((resolve, reject) => {
      this._axiosInstance.put(`${endpoint}`, data, conf)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
    });
  }

  public patch(endpoint: string, data: {}, conf = {}): AxiosPromise {
    return new Promise((resolve, reject) => {
      this._axiosInstance.patch(`${endpoint}`, data, conf)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
    });
  }

  public delete(endpoint: string, id: any, conf = {}): AxiosPromise {
    return new Promise((resolve, reject) => {
      this._axiosInstance.delete(`${endpoint}/${id}`, conf)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
    });
  }

  public deleteFile(endpoint: string, conf = {}): AxiosPromise {
    return new Promise((resolve, reject) => {
      this._axiosInstance.delete(`${endpoint}`, conf)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
    });
  }

  public uploadFile(endpoint: string, data: FormData, conf = {}): AxiosPromise {
    return this.post(endpoint, data, conf);
  }

  public downloadFile(endpoint: string): AxiosPromise {
    const conf = {
      responseType: 'blob', // important
      timeout: 30000,
    };
    return this.get(endpoint, conf);
  }
}

export default HttpApiService;
