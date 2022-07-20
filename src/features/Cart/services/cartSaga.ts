import { userApi } from 'api';
import { selectCurrentUser } from 'features/Auth/services/authSlice';
import { ApiResponse, User } from 'models';
import { call, select, take, takeLatest } from 'redux-saga/effects';
import { cartActions, ICartItem, selectCartItems } from './cartSlice';

function* handleUpdateCart(action: any) {
  try {
    const cart: ICartItem[] = yield select(selectCartItems);

    const user: User = yield select(selectCurrentUser);
    const data: any = cart.map((item) => ({ ...item, product: item.product._id }));
    data.push(action.payload);
    const results: ApiResponse = yield call(userApi.addToCart, { cart: cart, user: user._id });
  } catch (error) {
    console.log(error);
  }
}
export function* cartSaga() {
  const user: User = yield select(selectCurrentUser);
  if (user) yield takeLatest([cartActions.addToCart, cartActions.removeFromCart], handleUpdateCart);
}
