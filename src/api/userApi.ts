import { ICartItem } from 'features/Cart/services/cartSlice';
import { ApiResponse } from 'models/Common';
import { PurchaseOrder } from 'models/PurchaseOrder';
import axiosClient from './axiosClient';

export const userApi = {
  addToCart(data: { cart: ICartItem[] }): Promise<ApiResponse> {
    const url = '/user/cart';
    return axiosClient.post(url, data);
  },
  createPurchaseOrder(data: PurchaseOrder): Promise<ApiResponse> {
    const url = '/user/order';
    return axiosClient.post(url, data);
  },
};
