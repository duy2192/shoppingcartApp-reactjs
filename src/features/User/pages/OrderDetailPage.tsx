import { OrderDetail } from '../components/OrderDetail';

export function OrderDetailPage() {
  return (
    <div className="container ">
      <h1 className="border-b-2 text-2xl font-normal pb-2">Lịch sử đơn hàng</h1>

      <div className="mt-8">
        <OrderDetail />
      </div>
    </div>
  );
}
