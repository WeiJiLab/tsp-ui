import { AxiosResponse } from "axios";
import toast from 'react-hot-toast';

export interface HttpResponseHandler {
  handleSuccess(response: AxiosResponse): AxiosResponse | Promise<AxiosResponse>,

  handleError(error: any): Promise<any>
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
  let errorStatement: string = '';
  if (!err.response) {
    console.log(`Network error: ${err}`);
    errorStatement = "网络错误：" + err.message;
  } else {
    errorStatement = handleErrorResponse(err);
  }

  toast.error(errorStatement);

  return Promise.reject(errorStatement);
};

const handleErrorResponse = (err: any): string => {
  const status = err.response?.status || 500;

  console.log(`HttpService::Error(${status}) : `, err.response.data);

  switch (status) {

      // bad request
    case 400: {
      return "检查请求参数, " + err.response.data.data;
    }

      // authentication (token related issues)
    case 401 || 403: {
      return "访问失败" + err.response.data.data;
    }

      // not found
    case 404: {
      return "请求资源不存在" + err.response.data.data;
    }

      // conflict
    case 409: {
      return "该资源冲突" + err.response.data.data;
    }

      // unprocessable
    case 422: {
      return "请求格式正确，但由于语义错误而无法遵循" + err.response.data.data;
    }

    case 500: {
      return "当前服务不可用，请稍后再试";
    }

      // generic api error (server related) unexpected
    default: {
      return err.response.data.message;
    }
  }
}

