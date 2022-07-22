import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AccountPage from './pages/AccountPage';
import InformationPage from './pages/InformationPage';
import OrderPage from './pages/OrderPage';

function UserFeature() {
  return (
    <div className="min-h-screen">
      <div className="relative mt-32">
        <div className="absolute inset-0 h-screen  bg-transparent">
          <div className="lg:w-72 w-60 bg-white">
            <div className="float-right lg:mr-10  ">
              <Sidebar />
            </div>
          </div>
        </div>
        <div className="lg:ml-72 sm:ml-0">
          <Routes>
            <Route path="/" element={<InformationPage />}></Route>
            <Route path="/account" element={<AccountPage />}></Route>
            <Route path="/order" element={<OrderPage />}></Route>
            <Route path="*" element={<Navigate to="/notfound" />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default UserFeature;
