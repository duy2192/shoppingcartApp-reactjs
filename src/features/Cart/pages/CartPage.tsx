import { useAppSelector } from 'app/hooks';
import emptyCart from 'assets/img/emptyCart.png';
import { Link } from 'react-router-dom';
import CartInfo from '../components/CartInfo';
import DeliveryInfo from '../components/DeliveryInfo';
import { selectCartItems } from '../services/cartSlice';

export default function CartPage() {
  const cartItems = useAppSelector(selectCartItems);

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="grid grid-flow-row-col xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
          <div className="">
            <DeliveryInfo />
          </div>

          <div className="">
            <CartInfo />
          </div>
        </div>
      ) : (
        <>
          <div
            className="mt-32 h-60 mb-80 flex items-center justify-center"
            style={{
              backgroundImage: `url(${emptyCart})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
            }}
          >
            <Link to="/product" className="p-3 bg-slate-900 text-slate-50 mt-72 font-semibold hover:text-slate-300 ">Tiếp tục mua sắm</Link>
          </div>
        </>
      )}
    </>
  );
}
