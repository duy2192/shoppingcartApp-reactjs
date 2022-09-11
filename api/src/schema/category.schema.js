import * as yup from "yup";
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

export const categorySchema = {
  getAllCategory(payload) {
    return yup
      .object()
      .shape({
        
      })
      .validateSync(payload, options);
  },
  addCategory(payload) {
    return yup
      .object()
      .shape({
        name: yup
          .string()
          .required("Danh mục không hợp lệ!"),
        description: yup
          .string()

      })
      .validateSync(payload, options);
  },
  removeCategory(payload) {
    return yup
      .object()
      .shape({
        id: yup
          .string()
          .required("Danh mục không hợp lệ!"),

      })
      .validateSync(payload, options);
  },

};
