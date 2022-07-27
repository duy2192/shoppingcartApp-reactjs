import { userApi } from 'api';
import { useSnackbar } from 'notistack';
import { AccountForm, IChangePassword } from './AccountForm';

export function Account() {
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmitUpdate = async (data: IChangePassword) => {
    try {
      await userApi.changePassword(data);
      enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar(error.message || 'Có lỗi xảy ra!', { variant: 'error' });
    }
  };
  return <AccountForm onSubmit={handleSubmitUpdate} />;
}
