import { useAppSelector } from 'app/hooks';
import { selectCartTotal } from 'features/Cart/services/cartSlice';
import { formatPrice } from 'utils';

export default function CartSubmit() {
  const cartTotal = useAppSelector(selectCartTotal);

  return (
    <div className="">
      <div className="flex justify-between mt-5">
        <p className='font-semibold'>Tạm tính</p>
        <p className='font-semibold text-slate-500'>{formatPrice(cartTotal)}</p>
      </div>
      <div className="flex justify-between mt-3">
        <p className='font-semibold'>Giảm giá</p>
        <p className='font-semibold text-slate-500'>{formatPrice(0)}</p>
      </div>
      <div className="flex justify-between mt-3 border-b-2">
        <p className='font-semibold'>Phí giao hàng</p>
        <p className='font-semibold text-slate-500'>{formatPrice(30000)}</p>
      </div>
      <div className="flex justify-between mt-3">
        <p className='font-bold'>Tổng tiền</p>
        <p className='font-bold text-black'>{formatPrice(cartTotal)}</p>
      </div>
    </div>
  );
}
