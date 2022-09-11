import { ApiResponse } from 'models/Common';
import axiosClient from './axiosClient';

export const uploadApi = {
  uploadImage(data: FormData): Promise<ApiResponse> {
    const url = '/upload/image';
    return axiosClient.post(url, data);
  },
};
