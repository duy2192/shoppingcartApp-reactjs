import { ICartItem } from 'features/Cart/services/cartSlice';

export function formatPrice(price: number): string {
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
