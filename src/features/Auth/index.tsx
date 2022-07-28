import { useAppSelector } from 'app/hooks';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { selectToken } from './services/authSlice';

export default function AuthFeature() {
  const token = useAppSelector(selectToken);
  if (token) return <Navigate replace to="/" />;
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="*" element={<Navigate to="/notfound" />}></Route>
    </Routes>
  );
}
