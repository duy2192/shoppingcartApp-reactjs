import axios, { AxiosResponse } from 'axios';
import { SERVER_HOST } from 'constants/index';

const axiosClient = axios.create({
  baseURL: `${SERVER_HOST}api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config) { 
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response:AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data ;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { config, status, data } = error.response;
    const URLs = ['/auth/login', '/auth/register'];

    if (URLs.includes(config.url) && status === 500) {
      const error = data.message || {};

      throw new Error(error);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;