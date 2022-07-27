import React from 'react';

export function OrderHistoryList() {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {})();
  }, []);
  return (
    <div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-2 bg-gray-50 dark:bg-gray-800">
                Mã đơn hàng
              </th>
              <th scope="col" className="py-3 px-6">
                Ngày tạo
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Người nhận
              </th>
              <th scope="col" className="py-3 px-6">
                Địa chỉ
              </th>
              <th scope="col" className="py-3 px-6">
                Số tiền
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}
