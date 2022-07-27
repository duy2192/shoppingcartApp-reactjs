import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from 'app/hooks';
import InputField from 'components/FormControl/InputField';
import ProvincesForm from 'components/FormControl/ProvincesForm';
import { selectCurrentUser } from 'features/Auth/services/authSlice';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface AccountFormProps {
  onSubmit: (data: IChangePassword) => void;
}
export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
}

export function AccountForm({ onSubmit }: AccountFormProps) {
  const currentUser = useAppSelector(selectCurrentUser);

  const schema = yup.object().shape({
    oldPassword: yup.string().required('Mật khẩu không hợp lệ!'),
    newPassword: yup.string().required('Mật khẩu không hợp lệ!'),
    repeatPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('newPassword')], 'Mật khẩu xác nhận chưa đúng!'),
  });

  const form = useForm<IChangePassword>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (data: IChangePassword) => {
    try {
      await onSubmit(data);
      form.reset();
    } catch (error) {}
  };

  return (
    <div className="container ">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="mt-4">
          <div className="">
            <span className="text-lg font-medium ml-2">Tài khoản</span>
            <InputField
              form={form}
              name="username"
              className="p-1  max-w-md"
              size="sm"
              readOnly
              disabled
              placeholder={currentUser?.username}
            />
          </div>
          <div className="">
            <span className="text-lg font-medium ml-2">Mật khẩu cũ</span>
            <InputField form={form} name="oldPassword" className="p-1  max-w-md" size="sm" type="password" />
          </div>

          <div className="">
            <span className="text-lg font-medium ml-2">Mật khẩu</span>
            <InputField form={form} name="newPassword" className="p-1 max-w-md" size="sm" type="password" />
          </div>

          <div className="">
            <span className="text-lg font-medium ml-2">Xác nhận mật khẩu</span>
            <InputField
              form={form}
              name="repeatPassword"
              className="p-1 max-w-md"
              size="sm"
              type="password"
            />
          </div>

          <div className="flex justify-center my-4 max-w-md">
            <button
              type="submit"
              className="bg-slate-500  p-2 rounded-md shadow-md text-slate-50 text-center"
            >
              Đổi mật khẩu
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
