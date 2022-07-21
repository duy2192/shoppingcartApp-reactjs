import { ApiResponse } from 'models/Common';
import { PurchaseOrder } from 'models/PurchaseOrder';
import axiosClient from './axiosClient';

export const purchaseOrderApi = {
  createPurchaseOrder(data: PurchaseOrder): Promise<ApiResponse> {
    const url = '/order/';
    return axiosClient.post(url, data);
  },
};
