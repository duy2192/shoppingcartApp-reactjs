import { PHONE_REGEX } from 'constants/index';
import * as yup from 'yup';

export const orderSubmitSchema=yup.object().shape({
    name: yup.string().required('Họ tên không được để trống!').typeError('Họ tên không được để trống!'),
    phone: yup
      .string()
      .matches(PHONE_REGEX, 'Số điện thoại không hợp lệ!')
      .min(10, 'Số điện thoại không hợp lệ!')
      .required('Số điện thoại không được để trống!')
      .typeError('Số điện thoại không được để trống!'),
    address: yup.string().required('Địa chỉ không được để trống!').typeError('Địa chỉ không được để trống!'),
    email: yup
      .string()
      .email('Email không hợp lệ!')
      .required('Email không được để trống!')
      .typeError('Email không được để trống!'),
    city: yup.number().typeError('Thành phố không được để trống!').required('Thành phố không được để trống!'),
    district: yup
      .number()
      .typeError('Quận/Huyện không được để trống!')
      .required('Quận/Huyện không được để trống!'),
    ward: yup.number().typeError('Phường/Xã không được để trống!').required('Phường/Xã không được để trống!'),
    note: yup.string(),
  });
