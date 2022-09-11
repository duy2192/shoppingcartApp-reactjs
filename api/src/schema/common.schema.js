import * as yup from 'yup';
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

export const commonSchema = {
  getProvinces(payload) {
    return yup
      .object()
      .shape({
        city: yup.number().nullable(),
        district: yup.number().nullable(),
        ward: yup.number().nullable(),
      })
      .validateSync(payload, options);
  },
};
