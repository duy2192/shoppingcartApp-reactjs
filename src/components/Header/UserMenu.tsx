import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectCurrentUser } from 'features/Auth/services/authSlice';
import { cartActions } from 'features/Cart/services/cartSlice';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from 'assets/img/avatar.png';
function UserMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    function handleClickOutside(e: any) {
      if (dropdownRef.current && dropdownRef.current.contains(e.target)) {
        setOpen(!open);
        return;
      }
      setOpen(false);
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open]);

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(cartActions.setCart([]));
    navigate('/');
  };
  return (
    <div className="flex justify-center p-12 select-none">
      <div className="relative" ref={dropdownRef}>
        <button className="block h-12 w-12 rounded-full overflow-hidden focus:outline-none shadow-md flex justify-center items-center">
          {currentUser?.avatar ? (
            <img className="h-8 w-8 object-cover" src={currentUser?.avatar || avatar} alt="avatar" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-auto w-8 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          )}
        </button>
        {open && (
          <div className="absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl">
            <ul className="">
              <Link
                className="hover:no-underline block p-2 text-slate-900 font-semibold hover:bg-slate-700 hover:text-slate-200 cursor-pointer"
                to="/user/account"
              >
                Tài khoản
              </Link>
              <Link
                className="hover:no-underline block p-2 text-slate-900 font-semibold hover:bg-slate-700 hover:text-slate-200 cursor-pointer"
                to="/user/order"
              >
                Đơn hàng
              </Link>
              <Link
                to=""
                className="hover:no-underline block p-2 text-slate-900 font-semibold hover:bg-slate-700 hover:text-slate-200 cursor-pointer border-t-2"
                onClick={handleLogout}
              >
                Đăng xuất
              </Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserMenu;
