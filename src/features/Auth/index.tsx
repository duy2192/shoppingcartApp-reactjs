import { authApi } from 'api';
import { useAppSelector } from 'app/hooks';
import { NotFound } from 'components/Common';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { authActions, selectToken } from './services/authSlice';

export interface IAuthProps {}
export default function AuthFeature() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useAppSelector(selectToken);
  useEffect((): void => {
    (async (): Promise<void> => {
      try {
        if (token) {
          await authApi.checkToken(token);
          navigate('/');
        }
      } catch (error) {
        dispatch(authActions.logout());
      }
    })();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}
