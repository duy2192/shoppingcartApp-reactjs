import { userApi } from 'api';
import { selectCurrentUser } from 'features/Auth/services/authSlice';
import { ApiResponse, User } from 'models';
import { call, debounce, select, takeLatest } from 'redux-saga/effects';
import { cartActions, ICartItem, selectCartItems } from './cartSlice';

function* handleUpdateCart() {
  const user: User = yield select(selectCurrentUser);

  if (user) {
    try {
      const cart: ICartItem[] = yield select(selectCartItems);
      const data: any = cart.map((item) => ({ ...item, product: item.product._id }));
      const results: ApiResponse = yield call(userApi.addToCart, { cart: data });
    } catch (error) {
      console.log(error);
    }
  }
}

export function* cartSaga() {
  yield debounce(
    500,
    [cartActions.addToCart, cartActions.removeFromCart, cartActions.mergeCart, cartActions.setQuantity],
    handleUpdateCart
  );
}
