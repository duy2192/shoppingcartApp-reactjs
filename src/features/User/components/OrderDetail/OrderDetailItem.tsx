import { IOrderItem } from 'models/PurchaseOrder';
import { formatPrice } from 'utils';

interface OrderDetailItemProps{
    orderDetailItem:IOrderItem;
    className?:string;
}
export function OrderDetailItem({orderDetailItem,className}:OrderDetailItemProps) {
    return (
        <>
        <tr
        className={
          ' w-full  border-b border-gray-200 cursor-pointer ' + className
        }
      >
        <td scope="row" className="flex items-center py-2 px-1 whitespace-wrap w-full">
          <img src={orderDetailItem.product.thumbnails[0]} alt=""  className='w-20 h-auto'/>
          <p className='font-medium'>
            {orderDetailItem.product.name}
          </p>
        </td>

        <td className="py-2 px-3 w-1/6 text-center">
            <span className='font-normal text-sm'>
            {orderDetailItem.product.salePrice?formatPrice(orderDetailItem.product.salePrice):formatPrice(orderDetailItem.product.price)}

            </span>
        </td>

        <td className="py-2 px-3 dark:bg-gray-800 w-1/6 text-center" >
            <span className='font-normal text-sm'>
            {orderDetailItem.quantity}
            </span>
        </td>

        <td className="py-2 px-3  w-1/6 text-center">
         <span className='font-normal text-sm'>0</span>
        </td>

        <td className="py-2 px-3 w-1/6 text-center">
        {orderDetailItem.product.salePrice?formatPrice(orderDetailItem.product.salePrice * orderDetailItem.quantity):formatPrice(orderDetailItem.product.price* orderDetailItem.quantity)}

        </td>
      </tr>
        </>
    );
}

