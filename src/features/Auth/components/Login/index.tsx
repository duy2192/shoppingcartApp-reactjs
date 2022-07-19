import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from 'app/hooks';
import { login, LoginPayload } from 'features/Auth/services/authSlice';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../LoginForm';

export interface ILoginProps {}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const initialValues: LoginPayload = {
    identifier: '',
    password: '',
  };
  const handleSubmitLogin = async (formValues: LoginPayload) => {
    try {
      const resultAction = await dispatch(login(formValues));

      await unwrapResult(resultAction);

      navigate('/product');
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return <LoginForm initialValues={initialValues} onSubmit={handleSubmitLogin} />;
};

export default Login;
