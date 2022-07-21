import { PayloadAction } from '@reduxjs/toolkit';
import { userApi } from 'api';
import { selectCurrentUser } from 'features/Auth/services/authSlice';
import { ApiResponse, User } from 'models';
import { PurchaseOrder } from 'models/PurchaseOrder';
import { Action } from 'redux';
import { call, put, select, takeLatest } from 'redux-saga/effects';
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
// function* handleSubmitPurchaseOrder(action: PayloadAction<PurchaseOrder>) {
//   try {
//     const cart: ICartItem[] = yield select(selectCartItems);
//     const orderBill: PurchaseOrder = {
//       ...action.payload,
//       cart: cart.map((item) => ({ ...item, product: item.product._id })),
//     };
//     const { results } = yield call(userApi.createPurchaseOrder, orderBill);
//     yield put(cartActions.submitPurchaseOrderSuccess(results));
//   } catch (error) {
//     yield put(cartActions.submitPurchaseOrderFailure(error));

//     console.log(error);
//   }
// }

export function* cartSaga() {
  yield takeLatest(
    [cartActions.addToCart, cartActions.removeFromCart, cartActions.mergeCart, cartActions.setQuantity],
    handleUpdateCart
  );
  // yield takeLatest(cartActions.submitPurchaseOrder.type, handleSubmitPurchaseOrder);
}