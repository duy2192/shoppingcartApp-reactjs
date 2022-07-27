import classNames from 'classnames';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AccountPage from './pages/AccountPage';
import ProfilePage from './pages/ProfilePage';
import { OrderHistoryPage } from './pages/OrderHistoryPage';
import './styles.scss';
import { OrderDetailPage } from './pages/OrderDetailPage';

function UserFeature() {
  const [open, setOpen] = React.useState(window.innerWidth > 1024);
  const sidebarButtonRef = React.useRef<HTMLButtonElement>(null);
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1024) {
        setOpen(true);
        return;
      }
      setOpen(false);
    }
    function handleClickOutside(e: any) {
      if (sidebarButtonRef.current && sidebarButtonRef.current.contains(e.target)) {
        setOpen(!open);
        return;
      }
      if (sidebarRef.current && sidebarRef.current.contains(e.target)) {
        return;
      }
      if (window.innerWidth < 1024) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);

    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [open, window]);

  return (
    <div className="">
      <button ref={sidebarButtonRef} className="block ml-2 mt-4 lg:hidden fixed -top-2 z-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="min-h-screen">
        <div className="fixed bg-white h-screen shadow-md z-20 top-0 lg:z-10 lg:max-w-[calc(100%_/_5)]">
          <div className={classNames(!open ? 'hidden' : 'sidebar mt-20')}>
            <Sidebar open={open} />
          </div>
        </div>

        <div className="lg:ml-[calc(100%_/_5)] mt-20 ml-8">
          <Routes>
            <Route path="/" element={<ProfilePage />}></Route>
            <Route path="/account" element={<AccountPage />}></Route>
            <Route path="/order" element={<OrderHistoryPage />}></Route>
            <Route path="/order/:orderId" element={<OrderDetailPage />}></Route>
            <Route path="*" element={<Navigate to="/notfound" />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default UserFeature;
