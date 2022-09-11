import { ApiResponse, IProvince, ProvinceParams } from 'models/Common';
import axiosClient from './axiosClient';

export const commonApi = {
  getProvinces(params?: ProvinceParams): Promise<ApiResponse<IProvince>> {
    const url = '/common/provinces/';
    return axiosClient.get(url, { params });
  },
};
