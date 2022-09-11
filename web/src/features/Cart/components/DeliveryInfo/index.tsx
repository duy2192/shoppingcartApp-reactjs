import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/Auth/services/authSlice';
import {
  ICartItem,
  selectCartItems,
  submitPurchaseOrderGuest,
  submitPurchaseOrderUser,
} from 'features/Cart/services/cartSlice';
import { PurchaseOrderSubmit } from 'models/PurchaseOrder';
import { toast } from 'react-toastify';
import OrderBillSubmit from './OrderBillSubmit';

export default function DeliveryInfo() {
  const currentCart = useAppSelector(selectCartItems);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const handleSubmit = async (data: PurchaseOrderSubmit) => {
    try {
      const orderBill: PurchaseOrderSubmit = {
        ...data,
        orderDetail: currentCart.map((item: ICartItem) => ({ ...item, product: item.product._id })),
      };
      if (!currentUser) {
        const resultAction = await dispatch(submitPurchaseOrderGuest(orderBill));
        await unwrapResult(resultAction);
      } else {
        const resultAction = await dispatch(submitPurchaseOrderUser(orderBill));
        await unwrapResult(resultAction);
      }

      toast.success('Đặt hàng thành công!');
    } catch (error) {
      toast.error('Có lỗi xảy ra!');
      throw error;
    }
  };

  return <OrderBillSubmit onSubmit={handleSubmit} />;
}
