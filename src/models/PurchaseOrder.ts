export interface ICartItemSubmit {
  product: string;
  quantity: number;
}
export interface PurchaseOrder {
  email: string;
  name: string;
  address: string;
  phone: string;
  cart: ICartItemSubmit[];
  city: string;
  district: string;
  ward: string;
  note: string;
}
