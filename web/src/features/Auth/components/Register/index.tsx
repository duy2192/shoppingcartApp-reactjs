import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from 'app/hooks';
import { register, RegisterPayload } from 'features/Auth/services/authSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { toast } from 'react-toastify';

const Register = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
      toast.success('Đăng ký thành công');

      navigate('/auth/login'); //
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return <RegisterForm initialValues={initialValues} onSubmit={handleSubmitRegister} loading={loading} />;
};

export default Register;
