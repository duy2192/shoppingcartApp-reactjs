import provinces from 'assets/json/provinces-formatted.json';
import { ICartItem } from 'features/Cart/services/cartSlice';
import { IProvince, Product, ProvinceInfo, ProvinceParams } from 'models';
import { IOrderItem } from 'models/PurchaseOrder';

export function formatPrice(price: number = 0): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export function mergeCart(cart: ICartItem[], newCart: ICartItem[]) {
  const newCartCP = [...newCart];
  const cartCP = [...cart];
  for (let cartItem of newCartCP) {
    let productInCart = cartCP.find((item) => item.product._id === cartItem.product._id);

    if (productInCart) {
      productInCart.quantity += cartItem.quantity;
    } else {
      cartCP.push(cartItem);
    }
  }
  return cartCP;
}

export function getCountProduct(cartItems: IOrderItem[]) {
  return cartItems.reduce((count: number, item: IOrderItem) => count + item.quantity, 0);
}

export const getProvinceList = (payload?: ProvinceParams): IProvince => {
  const data: IProvince = provinces;
  return {
    city: data.city,
    district: data?.district?.filter((item: ProvinceInfo) =>
      payload?.city ? item.city === payload?.city : true
    ),
    ward: data?.ward?.filter(
      (item: ProvinceInfo) =>
        (payload?.city ? item.city === payload?.city : true) &&
        (payload?.district ? item.district === payload?.district : true)
    ),
  };
};

export const getLabelProvinces = (key: keyof ProvinceParams, value?: number | null) => {
  const data = getProvinceList();
  const province = data[key].find((item: ProvinceInfo) => item.value === value);
  if (province) {
    const label = province.text;
    return label;
  }
  return '';
};

export const getPrice = (product: Product, quantity?: number) => {
  let price = product.salePrice || product.price;
  if (quantity) {
    price = price * quantity;
  }
  return formatPrice(price);
};
export const getSalePercent = (salePrice: number, price: number) => {
  const salePercent = 100 * ((salePrice - price) / price);
  return salePercent.toFixed(0);
};
