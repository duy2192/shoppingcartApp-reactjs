import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';

export default function CartFeature() {
  return (
    <Routes>
      <Route path="/" element={<CartPage />}></Route>
      <Route path="*" element={<Navigate replace to="/notfound" />}></Route>
    </Routes>
  );
}
