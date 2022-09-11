import { Navigate, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';

export default function ProductFeature() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductPage />}></Route>
        <Route path="/:productId" element={<ProductDetailPage />}></Route>
        <Route path="*" element={<Navigate to="/notfound" />}></Route>
      </Routes>
    </>
  );
}
