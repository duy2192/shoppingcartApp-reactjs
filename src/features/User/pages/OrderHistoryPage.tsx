import { OrderHistoryList } from '../components/OrderHistory';

export function OrderHistoryPage() {
  return (
    <div className="container ">
      <h1 className="border-b-2 text-2xl font-normal pb-2">Lịch sử đơn hàng</h1>

      <div className="mt-8">
        <OrderHistoryList />
      </div>
    </div>
  );
}
