import * as yup from 'yup';
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

export const authSchema = {
  register(payload) {
    return yup
      .object()
      .shape({
        email: yup.string().email('Email không hợp lệ').required('Email không hợp lệ!'),
        username: yup.string().min(3).max(30).required('Tên tài khoản không hợp lệ!'),
        address: yup.string(),
        phone: yup.string(),
        password: yup.string().required('Mật khẩu không hợp lệ!'),

        repeatPassword: yup
          .string()
          .required()
          .oneOf([yup.ref('password')], 'Mật khẩu xác nhận chưa đúng!'),
        name: yup.string(),
        role: yup.string(),
        avatar: yup.string(),
      })
      .validateSync(payload, options);
  },

  login(payload) {
    return yup
      .object()
      .shape({
        identifier: yup.string().required('Chưa nhập tên tài khoản!'),
        password: yup.string().required('Chưa nhập mật khẩu!'),
      })
      .validateSync(payload, options);
  },
};
