import * as yup from 'yup';
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

export const productSchema = {
  getAllProduct(payload) {
    return yup.object().shape({
      category: yup.string().nullable(),
      _limit: yup.number().integer().positive().default(10),
      _page: yup.number().integer().positive().default(1),
      _sort: yup.string().default('createdAt').oneOf(["name", "price", "createdAt"]),
      _order: yup.string().default('DESC').oneOf(['ASC', 'DESC']),
      _search: yup.string().default(''),
      _priceFrom: yup.number().integer().positive().nullable(),
      _priceTo: yup.number().integer().positive().nullable(),

    }).validateSync(payload, options);
  },
  getProductById(payload) {
    return yup.object().shape({
      productId: yup.string().required(),
    }).validateSync(payload, options);
  },
  addProduct(payload) {
    return yup
      .object()
      .shape({
        name: yup.string().required('Sản phẩm không hợp lệ!'),
        description: yup.string().nullable(),
        categories: yup.array().min(1).required('Danh mục không hợp lệ!'),
        price: yup.number().required('Giá sản phẩm không hợp lệ!').typeError('Giá sản phẩm không hợp lệ!'),
        salePrice: yup.number().typeError('Giá sản phẩm không hợp lệ!').nullable().max(
          yup.ref("price"),
          "Giá khuyến mãi phải nhỏ hơn giá gốc!"
        ),
        thumbnails: yup.array().nullable(),
      })
      .validateSync(payload, options);
  },
  removeProduct(payload) {
    return yup
      .object()
      .shape({
        id: yup.string().required('Sản phẩm không hợp lệ!'),
      })
      .validateSync(payload, options);
  },
};
