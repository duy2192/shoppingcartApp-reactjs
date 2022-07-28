import classNames from 'classnames';
import { ORDER_STATUS } from 'constants/index';
import { PurchaseOrder } from 'models/PurchaseOrder';
import { Link } from 'react-router-dom';
import { formatPrice, getCountProduct, getDate, getTime } from 'utils';
interface OrderItemProps {
  order: PurchaseOrder;
  className?: string;
}
function MobileOrderItem({ order, className }: OrderItemProps) {
  return (
    <div className="block sm:hidden shadow p-2 ">
      <div className="flex flex-wrap justify-between border-b-2">
        <span
          className={classNames(
            'font-medium',
            order.status === 0 && ' text-red-500',
            order.status === 1 && ' text-blue-500',
            order.status === 2 && ' text-green-500'
          )}
        >
          {ORDER_STATUS[order.status]}
        </span>
        <div>
          <span>{getDate(order.createdAt)} </span>
          <span>{getTime(order.createdAt)}</span>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="font-semibold line-clamp-1">{order._id}</p>
        <p className="font-medium text-slate-800">{order.name}</p>
        <p>
          <span className=" font-normal text-sm">{getCountProduct(order.orderDetail)} sản phẩm | </span>
          <span className="text-sm">{formatPrice(order.totalPrice)}</span>
        </p>
      </div>

      <div className="flex justify-center mt-4">
        <Link
          to={`${order._id}`}
          className="mx-auto border-2 p-1 font-normal text-slate-900 hover:bg-slate-100 select-none"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
}

export default MobileOrderItem;
