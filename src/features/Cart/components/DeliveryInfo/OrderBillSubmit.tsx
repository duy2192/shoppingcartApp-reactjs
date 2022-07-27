import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from 'app/hooks';
import InputField from 'components/FormControl/InputField';
import ProvincesForm from 'components/FormControl/ProvincesForm';
import { PHONE_REGEX } from 'constants/index';
import { selectCurrentUser } from 'features/Auth/services/authSlice';
import { PurchaseOrder } from 'models/PurchaseOrder';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
export interface IOrderBillSubmitProps {
  onSubmit: (data: PurchaseOrder) => Promise<void>;
}
export default function OrderBillSubmit({ onSubmit }: IOrderBillSubmitProps) {
  const currenUser = useAppSelector(selectCurrentUser);

  const schema = yup.object().shape({
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

  const form = useForm({
    defaultValues: {
      name: currenUser?.name || '',
      phone: currenUser?.phone || '',
      address: currenUser?.address || '',
      email: currenUser?.email || '',
      city: currenUser?.city || null,
      district: currenUser?.district || null,
      ward: currenUser?.ward || null,
      note: '',
    },
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
  });
  const handleSubmit = async (data: any) => {
    try {
      await onSubmit(data);
      form.reset({
        name: '',
        phone: '',
        address: '',
        email: '',
        city: null,
        district: null,
        ward: null,
        note: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="p-10 ">
        <span className="font-bold text-2xl mb-10 block">Thông tin vận chuyển</span>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="">
          <div className="flex gap-4">
            <InputField className="bg-white flex-1" name="name" form={form} placeholder="Họ tên" />
            <InputField className="bg-white flex-1" name="phone" form={form} placeholder="Số điện thoại" />
          </div>
          <InputField className="bg-white mt-4" name="email" form={form} placeholder="Email" />
          <InputField className="bg-white mt-4" name="address" form={form} placeholder="Địa chỉ" />

          <div>
            <ProvincesForm form={form} className="md:flex gap-3 mt-4 md:flex-wrap sm:block" />
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
