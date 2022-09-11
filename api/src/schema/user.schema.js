import * as yup from 'yup';
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

export const userSchema = {
  changePassword(payload) {
    return yup
      .object()
      .shape({
        oldPassword: yup.string().required('Mật khẩu không hợp lệ!'),
        newPassword: yup.string().required('Mật khẩu không hợp lệ!'),
        repeatPassword: yup
          .string()
          .required()
          .oneOf([yup.ref('newPassword')], 'Mật khẩu xác nhận chưa đúng!'),
      })
      .validateSync(payload, options);
  },
  updateProfile(payload) {
    return yup
      .object()
      .shape({
        name: yup.string().nullable(),
        email: yup.string().email().nullable(),
        phone: yup.string().nullable(),
        address: yup.string().nullable(),
        city: yup.number().nullable(),
        district: yup.number().nullable(),
        ward: yup.number().nullable(),
        avatar: yup.string().nullable(),
      })
      .validateSync(payload, options);
  },
  getOrderById(payload) {
    return yup
      .object()
      .shape({
        orderId: yup.string().required(),
      })
      .validateSync(payload, options);
  },
  addToCart(payload) {
    return yup
      .object()
      .shape({
        cart: yup.array().required(),
      })
      .validateSync(payload, options);
  },
  createPurchaseOrderUser(payload) {
    return yup
      .object()
      .shape({
        email: yup.string().email('Email không hợp lệ').required('Email không hợp lệ!'),
        name: yup.string().required('Tên không được để trống!'),
        phone: yup.string().required('Số điện thoại không được để trống!'),
        address: yup.string().required('Địa chỉ không được để trống!'),
        city: yup
          .number()
          .typeError('Thành phố không được để trống!')
          .required('Thành phố không được để trống!'),
        district: yup
          .number()
          .typeError('Quận/Huyện không được để trống!')
          .required('Quận/Huyện không được để trống!'),
        ward: yup
          .number()
          .typeError('Phường/Xã không được để trống!')
          .required('Phường/Xã không được để trống!'),
        orderDetail: yup
          .array()
          .of(
            yup.object().shape({
              quantity: yup.number(),
              product: yup.string(),
            })
          )
          .required('Giỏ hàng không được để trống!'),
      })
      .validateSync(payload, options);
  },
  cancelOrder(payload) {
    return yup
      .object()
      .shape({
        orderId: yup.string().required(),
      })
      .validateSync(payload, options);
  },
};
