import { userApi } from 'api';
import { SpinnerLoading } from 'components/Loading';
import { PurchaseOrder } from 'models/PurchaseOrder';
import React from 'react';
import MobileOrderItem from './MobileOrderItem';
import { OrderItem } from './OrderItem';

export function OrderHistoryList() {
  const [orders, setOrders] = React.useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { results } = await userApi.getAllOrders();
        setOrders(results);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (loading) return <SpinnerLoading loading className='flex justify-center items-center mt-4' size="md"/>;
  return (
    <div>
      {/* Laptop */}
      <div className="customTable hidden sm:block overflow-x-auto relative shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left ">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b-2">
            <tr>
              <th scope="col" className="py-3 px-3 w-2/6">
                Mã đơn hàng
              </th>
              <th scope="col" className="py-3 px-3  w-1/6">
                Ngày tạo
              </th>
              <th scope="col" className="py-3 px-3 w-1/6">
                Người nhận
              </th>
              <th scope="col" className="py-3 px-3 w-1/6">
                Địa chỉ
              </th>
              <th scope="col" className="py-3 px-3 w-1/6">
                Số tiền
              </th>
            </tr>
          </thead>
          <tbody className='max-h-96'>
            {orders.map((order, index) => (
              <OrderItem key={index} order={order} />
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile */}
      <div className="flex flex-col sm:hidden gap-4">
        {orders.map((order, index) => (
          <MobileOrderItem key={index} order={order} />
        ))}
      </div>
    </div>
  );
}
