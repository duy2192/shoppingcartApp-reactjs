import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/Auth/services/authSlice';
import avatarBlank from 'assets/img/avatar.png';
import InputField from 'components/FormControl/InputField';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { uploadApi } from 'api';
import { MIME_IMAGE, PHONE_REGEX } from 'constants/index';
import { User } from 'models';
import ProvincesForm from 'components/FormControl/ProvincesForm';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface ProfileFormProps {
  onSubmit: (data: User) => void;
}

function ProfileForm({ onSubmit }: ProfileFormProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const schema = yup.object().shape({
    name: yup.string().required('Họ tên không được để trống!'),
    email: yup.string().email('Email không hợp lệ!').required('Email không được để trống!'),
    phone: yup
      .string()
      .matches(PHONE_REGEX, 'Số điện thoại không hợp lệ!')
      .min(10, 'Số điện thoại không hợp lệ!')
      .required('Số điện thoại không được để trống!'),
    address: yup.string().required('Địa chỉ không được để trống!'),
    city: yup.number().typeError('Thành phố không được để trống!').required('Thành phố không được để trống!'),
    district: yup
      .number()
      .typeError('Quận/Huyện không được để trống!')
      .required('Quận/Huyện không được để trống!'),
    ward: yup.number().typeError('Phường/Xã không được để trống!').required('Phường/Xã không được để trống!'),
    avatar: yup.string(),
  });

  const form = useForm<User>({
    defaultValues: {
      name: currentUser?.name,
      email: currentUser?.email,
      phone: currentUser?.phone,
      address: currentUser?.address,
      city: currentUser?.city,
      district: currentUser?.district,
      ward: currentUser?.ward,
      avatar: currentUser?.avatar,
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (data: User) => {
    try {
      await onSubmit(data);
    } catch (error) {}
  };

  const handleUpload = async (e: any) => {
    try {
      setLoadingUpload(true);
      if (!MIME_IMAGE.includes(e.target.files[0].type)) return;
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append('file', file);
      const { results } = await uploadApi.uploadImage(formData);
      form.setValue('avatar', results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUpload(false);
    }
  };

  return (
    <div className="container ">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="relative select-none">
          <span className="text-lg font-medium ml-2">Avatar</span>
          <img
            loading="lazy"
            src={
              form.getValues('avatar') ||
              (fileUploadRef.current?.files && URL.createObjectURL(fileUploadRef?.current?.files[0])) ||
              avatarBlank
            }
            alt=""
            className="w-40 h-40 p-1 rounded-full shadow-sm object-center"
          />
          {loadingUpload && (
            <div className="bg-slate-200 absolute top-7 shadow-sm w-40 h-40 rounded-full flex justify-center items-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="mr-2 w-8 h-8 text-slate-50 animate-spin dark:text-gray-600 fill-blue-600"
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
            </div>
          )}

          <div className="select-none outline-blue-400 overflow-hidden">
            <label
              htmlFor="avatar"
              className="absolute -bottom-2 left-4 bg-slate-600 text-slate-50 rounded-md px-2 cursor-pointer"
            >
              Sửa
            </label>
            <input ref={fileUploadRef} type="file" id="avatar" className="hidden" onChange={handleUpload} />
          </div>
        </div>

        <div className="mt-4">
          <div className="">
            <span className="text-lg font-medium ml-2">Họ tên</span>
            <InputField form={form} name="name" className="p-1  max-w-md" size="sm" />
          </div>

          <div className="">
            <span className="text-lg font-medium ml-2">Email</span>
            <InputField form={form} name="email" className="p-1 max-w-md" size="sm" />
          </div>

          <div className="">
            <span className="text-lg font-medium ml-2">Số điện thoại</span>
            <InputField form={form} name="phone" className="p-1 max-w-md" size="sm" />
          </div>

          <div className="">
            <span className="text-lg font-medium ml-2">Địa chỉ</span>
            <InputField form={form} name="address" className="p-1 max-w-md" size="sm" />
          </div>
          <div className="max-w-[calc(28rem_-_4px)] ml-1">
            <ProvincesForm form={form} />
          </div>

          <div className="flex justify-center my-4 max-w-md">
            <button
              type="submit"
              className="bg-slate-500  p-2 rounded-md shadow-md text-slate-50 text-center"
            >
              Cập nhật
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
