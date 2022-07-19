import { ApiResponse, Province, ProvinceParams } from 'models/Common';
import axiosClient from './axiosClient';

export const commonApi = {
  getProvinces(params?: ProvinceParams): Promise<ApiResponse<Province[]>> {
    const url = '/common/provinces/';
    return axiosClient.get(url, { params });
  },
};
