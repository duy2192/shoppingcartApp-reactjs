import { useAppSelector } from 'app/hooks';
import { ICartItem, selectCartItems } from 'features/Cart/services/cartSlice';
import CartItem from './CartItem';
import CartSubmit from './CartSubmit';

export default function CartInfo() {
  const cartItems = useAppSelector(selectCartItems);
  return (
    <>
      {cartItems.length > 0 ? (
        <div>
          <div className="p-10 border-l-2 min-h-screen relative">
            <span className="font-bold text-2xl mb-10 block">Giỏ hàng</span>
            <div className="flex flex-col gap-4 max-h-96 overflow-y-auto">
              {cartItems.map((item: ICartItem, index: number) => (
                <div key={index}>
                  <CartItem item={item} />
                </div>
              ))}
            </div>
            <div className="">
              <CartSubmit />
            </div>
          </div>
        </div>
      ) : (
        <div className=""></div>
      )}
    </>
  );
}
