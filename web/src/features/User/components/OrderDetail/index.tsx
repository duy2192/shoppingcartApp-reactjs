import { userApi } from 'api';
import classNames from 'classnames';
import { SpinnerLoading } from 'components/Loading';
import { ORDER_STATUS } from 'constants/index';
import { PurchaseOrder } from 'models/PurchaseOrder';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatPrice, getDate, getLabelProvinces } from 'utils';
import { MobileOrderDetailItem } from './MobileOrderDetailItem';
import { OrderDetailItem } from './OrderDetailItem';

interface OrderDetailProps {
  orderId?: string;
}
export function OrderDetail({ orderId }: OrderDetailProps) {
  const [order, setOrder] = React.useState<PurchaseOrder>();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { results } = await userApi.getByIdOrders(orderId);
        setOrder(results);
      } catch (error) {
        navigate('/user/order');
      } finally {
        setLoading(false);
      }
    })();
  }, [orderId]);

  const handleCancelOrder = async () => {
    try {
      await userApi.cancelOrder(orderId);
      toast.success('Hủy đơn hàng thành công');

      navigate('/user/order');
    } catch (error) {
      toast.error('Có lỗi xảy ra!');

      console.log(error);
    }
  };
  if (loading) return <SpinnerLoading loading className="flex justify-center items-center mt-4" size="md" />;
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1 border-2 border-slate-700 flex flex-col p-3">
          <p className="text-slate-800 font-medium uppercase mb-2">Thông tin đơn hàng</p>
          <p className="text-slate-700 mb-1">
            <span className="text-slate-800">Mã đơn: </span> <span>{order?._id}</span>
          </p>
          <p className="text-slate-700 mb-1">
            <span className="text-slate-800">Ngày tạo: </span> <span>{getDate(order?.createdAt)}</span>
          </p>
          <p className="text-slate-700 mb-1">
            <span className="text-slate-800">Phương thức: </span> <span>Thanh toán khi nhận hàng</span>
          </p>
          <p className="text-slate-700 mb-1">
            <span className="text-slate-800">Trạng thái: </span>
            <span
              className={classNames(
                'font-medium',
                order?.status === 0 && ' text-red-500',
                order?.status === 1 && ' text-blue-500',
                order?.status === 2 && ' text-green-500'
              )}
            >
              {ORDER_STATUS[order?.status || 0]}
            </span>
          </p>

          {order?.status === 1 && (
            <div className="">
              <button
                onClick={handleCancelOrder}
                className="p-2 bg-slate-700 hover:bg-slate-500 text-slate-50 hover:text-slate-900 shadow-md rounded-sm text-sm mt-2"
              >
                Hủy đơn hàng
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 border-2 border-slate-700 flex flex-col p-3">
          <p className="text-slate-800 font-medium uppercase mb-2">Địa chỉ người nhận</p>
          <p className="text-slate-700 mb-1">
            <span className="text-slate-700 font-medium">{order?.name}</span>
          </p>
          <p className="text-slate-700 mb-1">
            <span className="text-slate-800">{order?.address + ', '}</span>
            <span>{getLabelProvinces('ward', order?.ward) + ', '},</span>
            <span>{getLabelProvinces('district', order?.district) + ', '}</span>
            <span>{getLabelProvinces('city', order?.city)}</span>
          </p>
          <p className="text-slate-700 mb-1">
            <span className="text-slate-800">{order?.phone}</span>
          </p>
        </div>
      </div>

      <div className="customTable hidden sm:block ">
        <table className=" w-full text-sm text-left mt-4">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b-2">
            <tr className="text-center">
              <th scope="col" className="py-2 px-3 w-2/6">
                Sản phẩm
              </th>
              <th scope="col" className="py-2 px-3 w-1/6">
                Giá
              </th>
              <th scope="col" className="py-2 px-3 w-1/6">
                Số lượng
              </th>
              <th scope="col" className="py-2 px-3 w-1/6">
                Giảm giá
              </th>
              <th scope="col" className="py-2 px-3 w-1/6">
                Tạm tính
              </th>
            </tr>
          </thead>

          <tbody className="max-h-96 ">
            {order?.orderDetail.map((item, index) => (
              <OrderDetailItem orderDetailItem={item} key={index} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:flex flex-row-reverse">
        <div className="flex flex-col gap-2 p-3 shadow-md mt-8 sm:w-80 mb-16 sm:mr-6">
          <div className="flex justify-between">
            <span className="font-normal text-slate-800">Tạm tính</span>
            <span>{formatPrice(order?.totalPrice || 0)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-normal text-slate-800">Phí vận chuyển</span>
            <span>{formatPrice(0)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-normal text-slate-800">Tổng cộng</span>
            <span className="text-slate-900 font-medium">{formatPrice(order?.totalPrice || 0)}</span>
          </div>
        </div>
      </div>
      <div className="block sm:hidden h-96 overflow-y-auto mt-8 mb-8">
        {order?.orderDetail.map((item, index) => (
          <MobileOrderDetailItem orderDetailItem={item} key={index} />
        ))}
      </div>
    </div>
  );
}
