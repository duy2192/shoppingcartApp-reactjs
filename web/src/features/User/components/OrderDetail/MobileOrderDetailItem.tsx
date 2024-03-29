import { IOrderItem } from 'models/PurchaseOrder';
import { useNavigate } from 'react-router-dom';
import { formatPrice, getPrice } from 'utils';
interface OrderItemProps {
  orderDetailItem: IOrderItem;
  className?: string;
}
export function MobileOrderDetailItem({ orderDetailItem, className }: OrderItemProps) {
  const navigate = useNavigate();
  const handleProductClick = () => {
    // navigate(`/product/${orderDetailItem.product._id}`)
  };
  return (
    <div
      className={'block sm:hidden shadow p-2 cursor-pointer hover:bg-slate-50 ' + className}
      onClick={handleProductClick}
    >
      <div className="flex">
        <img className="w-32 h-auto" src={orderDetailItem.product.thumbnails[0]} alt="product" />
        <div className="mt-6">
          <p className="font-medium line-clamp-3">{orderDetailItem.product.name}</p>
          <p className="font-normal text-md">
            <span className=" line-through">{getPrice(orderDetailItem.product)}</span>
            <br />
            <span>{getPrice(orderDetailItem.product)}</span>x<span>{orderDetailItem.quantity}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
