import { commonApi } from 'api';
import { ProvinceParams } from 'models';
import React, { useEffect } from 'react';
import Dropdown, { DropdownData } from '../Dropdown';
export interface ProvincesFormProps {
  form: any;
  className?: string;
}
function ProvincesForm({ form, className }: ProvincesFormProps) {
  const [cityList, setCityList] = React.useState<DropdownData[]>([]);
  const [districtList, setDistrictList] = React.useState<DropdownData[]>([]);
  const [wardList, setWardList] = React.useState<DropdownData[]>([]);
  const [provincesParams, setProvincesParams] = React.useState<ProvinceParams>({
    city: form.getValues('city'),
    district: form.getValues('district'),
  });

  useEffect(() => {
    (async () => {
      try {
        const { results } = await commonApi.getProvinces(provincesParams);
        setCityList(results.city);
        setDistrictList(results.district);
        setWardList(results.ward);
      } catch (error) {}
    })();
  }, [provincesParams]);

  const handleChangeProvince = (name: keyof ProvinceParams, value: string | null) => {
    if (name === 'city') {
      form.setValue('district', null);
      form.setValue('ward', null);
    }
    if (name === 'district') form.setValue('ward', null);
    const { city } = form.getValues();
    setProvincesParams({ city, [name]: value });
  };
  return (
    <div className={className}>
      <Dropdown
        onChange={(value) => handleChangeProvince('city', value)}
        className="md:flex-1 sm:w-full mt-3"
        name="city"
        form={form}
        data={cityList}
        label="Chọn Tỉnh/TP"
        placeholder="Tìm kiếm ..."
      />
      <Dropdown
        onChange={(value) => handleChangeProvince('district', value)}
        className="md:flex-1 sm:w-full mt-3"
        name="district"
        form={form}
        data={districtList}
        label="Chọn Huyện/Quận"
        placeholder="Tìm kiếm ..."
      />
      <Dropdown
        className="md:flex-1 sm:w-full mt-3"
        name="ward"
        form={form}
        data={wardList}
        label="Chọn Xã/Phường"
        placeholder="Tìm kiếm ..."
      />
    </div>
  );
}

export default ProvincesForm;
