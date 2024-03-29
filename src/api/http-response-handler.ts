import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

export interface HttpResponseHandler {
  handleSuccess(response: AxiosResponse): AxiosResponse | Promise<AxiosResponse>;

  handleError(error: any): Promise<any>;
}

export class HttpResponseHandlerImpl implements HttpResponseHandler {
  handleSuccess(response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> {
    return handleSuccess(response);
  }

  handleError(error: any): Promise<any> {
    return handleError(error);
  }
}

export const handleSuccess = (response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> => {
  return response;
};

export const handleError = (err: any): Promise<any> => {
  let errorStatement = '';
  if (!err.response) {
    console.log(`Network error: ${err}`);
    errorStatement = '网络错误：' + err.message;
  } else {
    errorStatement = handleErrorResponse(err);
  }

  toast.error(errorStatement);

  return Promise.reject(errorStatement);
};

const ErrorResponseMapper = {
  400: '检查请求参数, ',
  401: '访问失败，用户未登录',
  403: '访问失败, ',
  404: '请求资源不存在, ',
  409: '该资源冲突, ',
  422: '请求格式正确，但由于语义错误而无法遵循, ',
  500: '当前服务不可用，请稍后再试',
};

const handleErrorResponse = (err: any): string => {
  const status = err.response?.status || 500;

  console.log(`HttpService::Error(${status}) : `, err.response.data);

  if (Object.prototype.hasOwnProperty.call(ErrorResponseMapper, status)) {
    return ErrorResponseMapper[status] + err.response.data;
  } else {
    return err.response.data.message;
  }
};
