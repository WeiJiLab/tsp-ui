import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import i18next from '../config/I18nConfigs'

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
    errorStatement = i18next.t('api.network_error') + '：' + err.message;
  } else {
    errorStatement = handleErrorResponse(err);
  }

  toast.error(errorStatement);

  return Promise.reject(errorStatement);
};

const ErrorResponseMapper = {
  400: i18next.t('api.400_error'),
  401: i18next.t('api.401_error'),
  403: i18next.t('api.403_error'),
  404: i18next.t('api.404_error'),
  409: i18next.t('api.409_error'),
  422: i18next.t('api.422_error'),
  500: i18next.t('api.500_error'),
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
