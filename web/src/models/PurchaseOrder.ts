import { Product } from "./Product";

export interface ICartItemSubmit {
  product: string;
  quantity: number;
}
export interface IOrderItem {
  product: Product;
  quantity: number;
}
export interface PurchaseOrder {
  _id?: string;
  email: string;
  name: string;
  address: string;
  phone: string;
  orderDetail: IOrderItem[];
  city: number | null;
  district: number | null;
  ward: number | null;
  note: string;
  status: number;
  createdAt: Date;
  totalPrice: number;
}
export interface PurchaseOrderSubmit {
  email: string;
  name: string;
  address: string;
  phone: string;
  orderDetail: ICartItemSubmit[];
  city: number;
  district: number;
  ward: number;
  note: string;
}
