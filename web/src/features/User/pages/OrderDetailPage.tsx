import {  useParams } from 'react-router-dom';
import { OrderDetail } from '../components/OrderDetail';

export function OrderDetailPage() {
  const params=useParams()
  const orderId=params.orderId
  return (
    <div className=" ">
      <h1 className="border-b-2 text-2xl font-normal pb-2">Thông tin đơn hàng</h1>

      <div className="mt-8">
        <OrderDetail orderId={orderId} />
      </div>
    </div>
  );
}
