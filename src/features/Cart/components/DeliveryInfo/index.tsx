import { yupResolver } from '@hookform/resolvers/yup';
import { commonApi } from 'api';
import Dropdown, { DropdownData, FormDropdownData } from 'components/FormControl/Dropdown';
import InputField from 'components/FormControl/InputField';
import { Province, ProvinceParams } from 'models';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export default function DeliveryInfo() {
  const [cityList, setCityList] = React.useState<Province[]>([]);
  const [districtList, setDistrictList] = React.useState<Province[]>([]);
  const [wardList, setWardList] = React.useState<Province[]>([]);
  const [provincesParams, setProvincesParams] = React.useState<ProvinceParams|undefined>()
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    (async () => {
      try {
        const { results } = await commonApi.getProvinces(provincesParams);
        if (provincesParams?.city  && provincesParams?.district) {
          setWardList(results);
          return
        }
        if (provincesParams?.city ) {
          setDistrictList(results);
          return
        }
          setCityList(results);
        
      } catch (error) {}
    })();
  }, [provincesParams]);

  const schema = yup.object().shape({
    name: yup.string().required('Họ tên không được để trống!').typeError('Họ tên không được để trống!'),
    phone: yup
      .string()
      .required('Số điện thoại không được để trống!')
      .typeError('Số điện thoại không được để trống!'),
    address: yup.string().required('Địa chỉ không được để trống!').typeError('Địa chỉ không được để trống!'),
    email: yup
      .string()
      .email('Email không hợp lệ!')
      .required('Email không được để trống!')
      .typeError('Email không được để trống!'),
    city: yup
      .object()
      .required('Tỉnh/Thành phố không được để trống!')
      .typeError('Tỉnh/Thành phố không được để trống!'),
    district: yup
      .object()
      .required('Quận/Huyện không được để trống!')
      .typeError('Quận/Huyện không được để trống!'),
    ward: yup.object().required('Phường/Xã không được để trống!').typeError('Phường/Xã không được để trống!'),
    note: yup.string(),
  });
  const form = useForm<FormDropdownData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      email: '',
      city: null,
      district: null,
      ward: null,
      note: '',
    },
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
  });
  const handleSubmit = (data: any) => {
    form.reset({
      name: '',
      phone: '',
      address: '',
      email: '',
      city: null,
      district: null,
      ward: null,
      note: '',
    })

    console.log(data);

    enqueueSnackbar("Success!", { variant: "success" });

  };

  const handleChangeProvince = (name: keyof ProvinceParams, value: DropdownData | undefined) => {
    const {city}=form.getValues()
    setProvincesParams({ city:city?.value,[name]:value?.value });
  };

  return (
    <div className="">
      <div className="p-10 min-h-screen">
        <span className="font-bold text-2xl mb-10 block">Thông tin vận chuyển</span>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="">
          <div className="flex gap-4">
            <InputField className="bg-white flex-1" name="name" form={form} placeholder="Họ tên" />
            <InputField className="bg-white flex-1" name="phone" form={form} placeholder="Số điện thoại" />
          </div>
          <InputField className="bg-white mt-4" name="email" form={form} placeholder="Email" />
          <InputField className="bg-white mt-4" name="address" form={form} placeholder="Địa chỉ" />

          <div className="md:flex gap-3 mt-4 md:flex-wrap sm:block">
            <Dropdown
              onChange={(value) => handleChangeProvince('city', value)}
              className="md:flex-1 sm:w-full"
              name="city"
              form={form}
              data={cityList}
              label="Chọn Tỉnh/TP"
              placeholder="Tìm kiếm ..."
            />
            <Dropdown
              onChange={(value) => handleChangeProvince('district', value)}
              className="md:flex-1 sm:w-full"
              name="district"
              form={form}
              data={districtList}
              label="Chọn Huyện/Quận"
              placeholder="Tìm kiếm ..."
            />
            <Dropdown
              className="md:flex-1 sm:w-full"
              name="ward"
              form={form}
              data={wardList}
              label="Chọn Xã/Phường"
              placeholder="Tìm kiếm ..."
            />
          </div>
          <InputField className="bg-white mt-4" name="note" form={form} placeholder="Ghi chú" />

          <button
            className="mt-4 p-3 text-center w-full bg-slate-800 rounded-md font-semibold hover:bg-slate-400 hover:text-black text-slate-50 "
            type="submit"
          >
            Đặt hàng
          </button>
        </form>
      </div>
    </div>
  );
}
