import { ICartItem } from 'features/Cart/services/cartSlice';
import { ApiResponse } from 'models/Common';
import axiosClient from './axiosClient';

export const userApi = {
  addToCart(data: { cart: ICartItem[]; user: string }): Promise<ApiResponse> {
    const url = '/user/cart';
    return axiosClient.post(url, data);
  },
};
