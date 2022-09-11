import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from 'app/hooks';
import InputField from 'components/FormControl/InputField';
import ProvincesForm from 'components/FormControl/ProvincesForm';
import { selectCurrentUser } from 'features/Auth/services/authSlice';
import { PurchaseOrderSubmit } from 'models/PurchaseOrder';
import { useForm } from 'react-hook-form';
import { orderSubmitSchema } from 'schema';
export interface IOrderBillSubmitProps {
  onSubmit: (data: PurchaseOrderSubmit) => Promise<void>;
}
export default function OrderBillSubmit({ onSubmit }: IOrderBillSubmitProps) {
  const currenUser = useAppSelector(selectCurrentUser);

  const form = useForm<PurchaseOrderSubmit>({
    defaultValues: {
      name: currenUser?.name || '',
      phone: currenUser?.phone || '',
      address: currenUser?.address || '',
      email: currenUser?.email || '',
      city: currenUser?.city,
      district: currenUser?.district,
      ward: currenUser?.ward,
      note: '',
    },
    resolver: yupResolver(orderSubmitSchema),
  });
  const handleSubmit = async (data: PurchaseOrderSubmit) => {
    try {
      await onSubmit(data);
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
