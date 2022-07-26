import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from 'app/hooks';
import { login, LoginPayload } from 'features/Auth/services/authSlice';
import { cartActions } from 'features/Cart/services/cartSlice';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

export interface ILoginProps {}

const Login = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const initialValues: LoginPayload = {
    identifier: '',
    password: '',
  };

  const handleSubmitLogin = async (formValues: LoginPayload) => {
    try {
      setLoading(true);
      const resultAction = await dispatch(login(formValues));

      const { user } = await unwrapResult(resultAction);

      dispatch(cartActions.mergeCart(user.cart));
      navigate('/product');
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' }); //
    } finally {
      setLoading(false);
    }
  };
  return <LoginForm initialValues={initialValues} onSubmit={handleSubmitLogin} loading={loading} />;
};

export default Login;
