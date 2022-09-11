import { LoginPayload, RegisterPayload } from 'features/Auth/services/authSlice';
import { ApiResponse } from 'models/Common';
import axiosClient from './axiosClient';

export const authApi = {
  login(data: LoginPayload): Promise<ApiResponse> {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
  register(data: RegisterPayload): Promise<ApiResponse> {
    const url = '/auth/register';
    return axiosClient.post(url, data);
  },
};
