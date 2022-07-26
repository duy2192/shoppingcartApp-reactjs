import { Navigate, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage';

export default function ProductFeature() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductPage />}></Route>
        <Route path="*" element={<Navigate to="/notfound" />}></Route>
      </Routes>
    </>
  );
}
