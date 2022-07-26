import { useAppSelector } from 'app/hooks';
import { selectToken } from 'features/Auth/services/authSlice';
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute() {
  const token = useAppSelector(selectToken);

  if (!token) return <Navigate replace to="/auth/login" />;
  return <Outlet />;
}
