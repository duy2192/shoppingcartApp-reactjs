import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/Auth/services/authSlice';
import {
  ICartItem,
  selectCartItems,
  submitPurchaseOrderGuest,
  submitPurchaseOrderUser,
} from 'features/Cart/services/cartSlice';
import { PurchaseOrder } from 'models/PurchaseOrder';
import { useSnackbar } from 'notistack';
import OrderBillSubmit from './OrderBillSubmit';

export default function DeliveryInfo() {
  const { enqueueSnackbar } = useSnackbar();
  const currentCart = useAppSelector(selectCartItems);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const handleSubmit = async (data: PurchaseOrder) => {
    try {
      const orderBill: PurchaseOrder = {
        ...data,
        cart: currentCart.map((item: ICartItem) => ({ ...item, product: item.product._id })),
      };
      if (!currentUser) {
        const resultAction = await dispatch(submitPurchaseOrderGuest(orderBill));
        await unwrapResult(resultAction);
      } else {
        const resultAction = await dispatch(submitPurchaseOrderUser(orderBill));
        await unwrapResult(resultAction);
      }

      enqueueSnackbar('Success!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error!', { variant: 'error' });
    }
  };

  return <OrderBillSubmit onSubmit={handleSubmit} />;
}
