import { userApi } from 'api';
import { toast } from 'react-toastify';
import { AccountForm, IChangePassword } from './AccountForm';

export function Account() {
  const handleSubmitUpdate = async (data: IChangePassword) => {
    try {
      await userApi.changePassword(data);
      toast.error('Cập nhật thành công');
    } catch (error: any) {
      toast.error('Có lỗi xảy ra!');
    }
  };
  return <AccountForm onSubmit={handleSubmitUpdate} />;
}
