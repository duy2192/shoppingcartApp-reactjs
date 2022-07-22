import { authApi } from 'api';
import { useAppSelector } from 'app/hooks';
import { authActions, selectToken } from 'features/Auth/services/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

export function PrivateRoute() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useAppSelector(selectToken);
  useEffect((): void => {
    (async (): Promise<void> => {
      try {
        if (token) await authApi.checkToken(token);
      } catch (error) {
        dispatch(authActions.logout());
        navigate('/auth');
      }
    })();
  }, []);
  if (!token) return <Navigate replace to="/auth/login" />;
  return <Outlet />;
}
