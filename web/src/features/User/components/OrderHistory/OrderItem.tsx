import classNames from 'classnames';
import { ORDER_STATUS } from 'constants/index';
import { PurchaseOrder } from 'models/PurchaseOrder';
import { useNavigate } from 'react-router-dom';
import { formatPrice, getDate, getLabelProvinces, getTime } from 'utils';
interface OrderItemProps {
  order: PurchaseOrder;
  className?: string;
}
export function OrderItem({ order, className }: OrderItemProps) {
  const navigate=useNavigate()
  const handleClick=()=>{
    navigate(`/user/order/${order._id}`)
  }
  return (
    <>
      <tr onClick={handleClick}
        className={
          'hidden sm:table-row border-b border-gray-200 hover:bg-slate-200 cursor-pointer w-full' + className
        }
      >
        <th scope="row" className="flex flex-col py-2 px-2 whitespace-wrap w-2/6">
          <span className="font-medium'">{order._id}</span>
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
        </th>
        <td className="py-2 px-3 w-1/6">
          <span className="text-slate-800">{getDate(order.createdAt)}</span>
          <br />
          <span className="text-slate-800">{getTime(order.createdAt)}</span>
        </td>
        <td className="py-2 px-3 dark:bg-gray-800 w-1/6">{order.name}</td>
        <td className="py-2 px-3 w-1/6 ">
          <p className="line-clamp-3">
            {order.address},&nbsp;{getLabelProvinces('ward', order.ward)},&nbsp;
            {getLabelProvinces('district', order.district)},&nbsp; {getLabelProvinces('city', order.city)}
          </p>
        </td>
        <td className="py-2 px-3 w-1/6">
          <span className="text-slate-900 font-medium">{formatPrice(order.totalPrice)}</span>
        </td>
      </tr>
    </>
  );
}
