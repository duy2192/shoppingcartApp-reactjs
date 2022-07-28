import { PurchaseOrder } from './PurchaseOrder';

export interface User {
  _id: string;
  email: string;
  username: string;
  purchases?: PurchaseOrder[];
  name: string;
  address: string;
  phone: string;
  city: number;
  district: number;
  ward: number;
  avatar: string;
}
