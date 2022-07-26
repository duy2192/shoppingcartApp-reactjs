import { useAppSelector } from 'app/hooks';
import classNames from 'classnames';
import { selectCurrentUser } from 'features/Auth/services/authSlice';
import { selectCartItemsCount, selectCartNotification } from 'features/Cart/services/cartSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';
import UserMenu from './UserMenu';
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector(selectCurrentUser);
  const cartItemsCount = useAppSelector(selectCartItemsCount);
  const cartNotification = useAppSelector(selectCartNotification);

  const handleToCartPage = () => {
    navigate('/cart');
  };
  const handleLogin = () => {
    navigate('/auth/login');
  };
  return (
    <div className="h-14 flex items-center justify-around shadow-md fixed top-0 right-0 left-0 z-20 bg-slate-100">
      <div className="logo cursor-pointer" onClick={() => navigate('/product')}>
        <span className="select-none font-bold ml-10">LoGO</span>
      </div>
      <div className="flex gap-8 items-center">
        <div
          className="relative  cursor-pointer hover:bg-slate-200 hover:shadow-md p-2 rounded-full"
          onClick={handleToCartPage}
        >
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
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {cartItemsCount > 0 && (
            <span className="absolute rounded-full bg-red-500 w-5 h-5 text-center leading-5 text-slate-800  top-0 -right-1 font-semibold">
              {cartItemsCount}
            </span>
          )}

          {cartNotification !== '' && (
            <div
              className={classNames(
                ' cart-icon rounded-md shadow-lg bg-slate-50 m-20 absolute -top-10 -left-20  -right-80  p-3 hover:bg-slate-100 select-none'
              )}
            >
              <div className="flex">
                <div className="w-1/2 h-auto object-fit">
                  <img src={cartNotification} alt="" loading="lazy" />
                </div>
                <div className="flex ">
                  <span className="p-3 font-semibold">Bạn vừa thêm sản phẩm vào giỏ hàng!</span>
                </div>
              </div>
            </div>
          )}
        </div>
        {location.pathname.split('/')[1] !== 'auth' && (
          <div>
            {user ? (
              <div className="">
                <UserMenu />
              </div>
            ) : (
              <button
                className="w-auto p-2  rounded-md  bg-black text-slate-50 mx-auto font-semibold"
                onClick={handleLogin}
              >
                Đăng nhập
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
