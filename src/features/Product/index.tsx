import { Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage';

export default function ProductFeature() {

  return (
    <>
    <Routes>
        <Route path="/" element={<ProductPage />}></Route>
    </Routes>
    </>
  )
}
