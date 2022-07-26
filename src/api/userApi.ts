import { ICartItem } from 'features/Cart/services/cartSlice';
import { User } from 'models';
import { ApiResponse } from 'models/Common';
import { PurchaseOrder } from 'models/PurchaseOrder';
import axiosClient from './axiosClient';

export const userApi = {
  updateProfile(data: User): Promise<ApiResponse<User>> {
    const url = '/user/';
    return axiosClient.put(url, data);
  },
  addToCart(data: { cart: ICartItem[] }): Promise<ApiResponse> {
    const url = '/user/cart';
    return axiosClient.post(url, data);
  },
  createPurchaseOrder(data: PurchaseOrder): Promise<ApiResponse> {
    const url = '/user/order';
    return axiosClient.post(url, data);
  },
};
