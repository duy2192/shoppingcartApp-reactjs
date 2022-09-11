import { ApiResponse } from 'models/Common';
import { PurchaseOrderSubmit } from 'models/PurchaseOrder';
import axiosClient from './axiosClient';

export const purchaseOrderApi = {
  createPurchaseOrder(data: PurchaseOrderSubmit): Promise<ApiResponse> {
    const url = '/order/';
    return axiosClient.post(url, data);
  },
};
