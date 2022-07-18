import { ClassNames } from '@emotion/react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectCurrentUser } from 'features/Auth/services/authSlice';
import { selectCartItemsCount, selectCartNotification } from 'features/Cart/services/cartSlice';
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import classNames from 'classnames';
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const cartItemsCount = useAppSelector(selectCartItemsCount);
  const cartNotification = useAppSelector(selectCartNotification);
  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/auth/login');
  };

  const handleToCartPage=()=>{
    navigate('/cart');
  }

  return (
    <div className="h-14 flex items-center justify-around shadow-md fixed top-0 right-0 left-0 z-50 bg-slate-100">
      <div className="logo cursor-pointer" onClick={()=>navigate("/product")}>
        <span className="select-none font-bold">LoGO</span>
      </div>
      <div className="flex gap-8 items-center">
      {user&&  <div className="relative  cursor-pointer hover:bg-slate-200 hover:shadow-md p-2 rounded-full" onClick={handleToCartPage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          {cartItemsCount > 0 && (
            <span className="absolute rounded-full bg-red-500 w-5 h-5 text-center leading-5 text-slate-800  top-0 -right-1 font-semibold">
              {cartItemsCount}
            </span>
          )}

          {cartNotification!=="" && (
            <div
            className={classNames(
              ' cart-icon rounded-md shadow-lg bg-slate-50 m-20 absolute -top-10 -left-20  -right-80  p-3 hover:bg-slate-100 select-none',
            )}
          >
            <div className="flex">
              <div className="w-1/2 h-auto object-fit">
                <img
                  src={cartNotification}
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="flex ">
                <span className="p-3 font-semibold">Bạn vừa thêm sản phẩm vào giỏ hàng!</span>
              </div>
            </div>
          </div>
          )}
        </div>}
        <div>
          {user && (
            <button className="w-auto p-2  rounded-md  bg-black text-slate-50 mx-auto font-semibold" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
