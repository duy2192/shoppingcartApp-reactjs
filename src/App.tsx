import { NotFound, PrivateRoute } from 'components/Common';
import Auth from 'features/Auth';
import ProductFeature from 'features/Product';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from 'components/Header';
import CartFeature from 'features/Cart';
import Footer from 'components/Footer';
function App() {
  return (
    <>
      <Header />
      <div className="mt-14"></div>
      <Routes>
        <Route path="/" element={<Navigate to="/product" />}></Route>
        <Route path="/auth/*" element={<Auth />}></Route>

        <Route element={<PrivateRoute />}>
          <Route path="/product/*" element={<ProductFeature />} />
          <Route path="/cart/*" element={<CartFeature />} />
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
