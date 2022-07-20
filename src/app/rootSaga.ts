import { cartSaga } from 'features/Cart/services/cartSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([cartSaga()]);
}
