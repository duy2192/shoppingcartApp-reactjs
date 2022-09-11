import { userApi } from 'api';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/Auth/services/authSlice';
import { User } from 'models';
import { toast } from 'react-toastify';
import ProfileForm from './ProfileForm';

function Profile() {
  const dispatch = useAppDispatch();
  const handleSubmitUpdate = async (data: User) => {
    try {
      const { results } = await userApi.updateProfile(data);
      dispatch(authActions.setUser(results));
      toast.success('Cập nhật thành công');
    } catch (error) {
      toast.error('Có lỗi xảy ra!');
    }
  };
  return <ProfileForm onSubmit={handleSubmitUpdate} />;
}

export default Profile;
