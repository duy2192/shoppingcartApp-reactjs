import { userApi } from 'api';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/Auth/services/authSlice';
import { User } from 'models';
import { useSnackbar } from 'notistack';
import ProfileForm from './ProfileForm';

function Profile() {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmitUpdate = async (data: User) => {
    try {
      const { results } = await userApi.updateProfile(data);
      dispatch(authActions.setUser(results));
      enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Có lỗi xảy ra!', { variant: 'error' });
    }
  };
  return <ProfileForm onSubmit={handleSubmitUpdate} />;
}

export default Profile;
