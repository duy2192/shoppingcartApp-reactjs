import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';

export default function CartFeature() {
  return (
    <Routes>
      <Route path="/" element={<CartPage />}></Route>
    </Routes>
  );
}
