import { useAppDispatch, useAppSelector } from 'app/hooks';
import emptyCart from 'assets/img/emptyCart.mp4';
import purchaseSuccess from 'assets/img/purchaseCompleted.mp4';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartInfo from '../components/CartInfo';
import DeliveryInfo from '../components/DeliveryInfo';
import { cartActions, selectCartItems, selectCompletedCart } from '../services/cartSlice';
export default function CartPage() {
  const cartItems = useAppSelector(selectCartItems);
  const completedOrder = useAppSelector(selectCompletedCart);
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(cartActions.completedOrder(false));
    };
  }, [dispatch]);
  if (completedOrder) {
    return (
      <>
        <div className="h-80 w-full flex flex-col items-center mb-[320px]">
          <video autoPlay={true} loop muted>
            <source src={purchaseSuccess} type="video/mp4"></source>
          </video>
          <p className="font-6xl font-semibold text-slate-900 mb-10">
            Đặt hàng thành công! Kiểm tra email để biết thêm thông tin
          </p>
          <Link to="/product" className="p-3 bg-slate-900 text-slate-50  font-semibold hover:text-slate-300 ">
            Tiếp tục mua sắm
          </Link>
        </div>
      </>
    );
  }
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
          <div className="h-80 w-full flex flex-col items-center mb-[320px]">
            <video autoPlay={true} loop muted>
              <source src={emptyCart} type="video/mp4"></source>
            </video>
            <Link
              to="/product"
              className="p-3 bg-slate-900 text-slate-50  font-semibold hover:text-slate-300 "
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </>
      )}
    </>
  );
}
