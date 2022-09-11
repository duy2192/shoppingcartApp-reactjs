import provinces from 'assets/json/provinces-formatted.json';

export const commonService = {
  getProvinces(payload) {
    let data = provinces;

    return {
      city: data.city,
      district: data.district.filter((item) => (payload.city ? item.city === payload.city : true)),
      ward: data.ward.filter(
        (item) =>
          (payload.city ? item.city === payload.city : true) &&
          (payload.district ? item.district === payload.district : true)
      ),
    };
  },
  getLabelProvinces(key, value) {
    let data = provinces;
    let province = data[key].find((item) => item.value === value);
    if (province) {
      let label = province.text;
      return label;
    }
    return '';
  },
};
