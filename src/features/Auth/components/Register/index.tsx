import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from 'app/hooks';
import { register, RegisterPayload } from 'features/Auth/services/authSlice';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';

const Register = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const initialValues: RegisterPayload = {
    email: '',
    name: '',
    username: '',
    password: '',
    repeatPassword: '',
  };

  const handleSubmitRegister = async (formValues: RegisterPayload) => {
    try {
      setLoading(true);
      const resultAction = await dispatch(register(formValues));

      await unwrapResult(resultAction);
      enqueueSnackbar('Đăng ký thành công', { variant: 'success' }); //

      navigate('/auth/login'); //
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' }); //
    } finally {
      setLoading(false);
    }
  };
  return <RegisterForm initialValues={initialValues} onSubmit={handleSubmitRegister} loading={loading} />;
};

export default Register;
