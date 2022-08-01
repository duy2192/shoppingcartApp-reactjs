import { store } from 'app/store';
import { cartActions } from 'features/Cart/services/cartSlice';
import { describe, expect, it } from 'vitest';

describe('cart test', () => {
  it('should add to cart success', () => {
    const result = store.dispatch(
      cartActions.addToCart({
        product: {
          _id: 'test',
        },
        quantity: 1,
      })
    );

    expect(store.getState().cart.cartItems.find((item) => item.product._id === 'test')).toBeTruthy();
  });
});
