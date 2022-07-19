import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'components/FormControl/InputField';
import { LoginPayload } from 'features/Auth/services/authSlice';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

export interface ILoginFormProps {
  initialValues: LoginPayload;
  onSubmit: (values: LoginPayload) => void;
  loading?: boolean;
}

export default function LoginForm({ initialValues, onSubmit, loading = false }: ILoginFormProps) {
  const schema = yup.object().shape({
    identifier: yup.string().required('Vui lòng nhập Email hoặc Tên tài khoản!'),
    password: yup.string().required('Vui lòng nhập mật khẩu!'),
  });
  const form = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
  });
  const handleSubmit = (value: LoginPayload) => {
    onSubmit?.(value);
  };
  return (
    <>
      <div className="p-10">
        <h1 className="text-center font-bold text-2xl">Đăng nhập</h1>
      </div>
      <div className="flex items-center justify-center flex-col">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <InputField
            name="identifier"
            label="Tài khoản"
            form={form}
            disabled={loading}
            placeholder="Tài khoản"
            className="w-96"
          />
          <InputField
            name="password"
            label="Mật khẩu"
            form={form}
            disabled={loading}
            className="mt-2 w-96"
            placeholder="Mật khẩu"
            type="password"
          />

          <button
            className="bg-slate-900 p-2 w-full text-slate-50 rounded-md mt-4 mb-3"
            disabled={form.formState.isSubmitting}
          >
            {loading ? (
              <div role="status" className="flex justify-center items-center">
                <svg
                  aria-hidden="true"
                  className="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-black"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              'Đăng nhập'
            )}
          </button>
          <div className="flex justify-between">
            <Link className="font-semibold " to="/auth/forgot">
              Quên mật khẩu?
            </Link>
            <Link className="font-semibold " to="/auth/signup">
              {'Bạn chưa có tài khoản? Đăng ký'}
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
