import { ApiError } from '@app/api/ApiError';
import axios, { AxiosError } from 'axios';

const baseURL = import.meta.env.BASE_URL;
const bearerToken = import.meta.env.REACT_APP_READ_TOKEN;

export const httpApi = axios.create({ baseURL });

httpApi.interceptors.request.use((config) => {
  config.headers = { ...config.headers, Authorization: `Bearer ${bearerToken}` };

  return config;
});

httpApi.interceptors.response.use(undefined, (error: AxiosError) => {
  throw new ApiError<ApiErrorData>(error.response?.data?.message || error.message, error.response?.data);
});

export interface ApiErrorData {
  message: string;
}
