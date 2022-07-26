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
  city: number | null;
  district: number | null;
  ward: number | null;
  note: string;
}
