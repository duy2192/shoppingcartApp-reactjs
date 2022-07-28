import { ICartItem } from 'features/Cart/services/cartSlice';
import { IChangePassword } from 'features/User/components/Account/AccountForm';
import { User } from 'models';
import { ApiResponse } from 'models/Common';
import { PurchaseOrder, PurchaseOrderSubmit } from 'models/PurchaseOrder';
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
  createPurchaseOrder(data: PurchaseOrderSubmit): Promise<ApiResponse> {
    const url = '/user/order';
    return axiosClient.post(url, data);
  },
  changePassword(data: IChangePassword): Promise<ApiResponse<PurchaseOrder[]>> {
    const url = '/user/changePassword';
    return axiosClient.put(url, data);
  },
  getAllOrders(): Promise<ApiResponse<PurchaseOrder[]>> {
    const url = '/user/order';
    return axiosClient.get(url);
  },
  getByIdOrders(orderId?:string): Promise<ApiResponse<PurchaseOrder>> {
    const url = '/user/order/'+orderId;
    return axiosClient.get(url);
  },
  cancelOrder(orderId?:string): Promise<ApiResponse> {
    const url = "/user/order/cancel/"+orderId;
    return axiosClient.put(url);
  },
};
