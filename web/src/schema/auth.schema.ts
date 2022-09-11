import * as yup from 'yup';

export const loginSchema=yup.object().shape({
    identifier: yup.string().required('Vui lòng nhập Email hoặc Tên tài khoản!'),
    password: yup.string().required('Vui lòng nhập mật khẩu!'),
  })
export const registerSchema=yup.object().shape({
    email: yup.string().email('Email không hợp lệ!').required('Email không được để trống!'),
    username: yup.string().required('Tên tài khoản không được để trống!'),
    name: yup.string().required('Tên không được để trống!'),
    password: yup.string().required('Mật khẩu không được để trống!'),
    repeatPassword: yup.string().required('Vui lòng nhập lại mật khẩu!').oneOf([yup.ref('password'), null], 'Mật khẩu không khớp!'),
  })