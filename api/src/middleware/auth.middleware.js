import { User } from 'models';
import { authService } from 'services';
import { failed } from 'utils';

export const authMiddleware = {
  async authentication(req, res, next) {
    try {
      const token = req.header('Authorization');
      if (!token) throw 'Invalid token';
      const data = await authService.checkToken(token);
      const user = await User.findById(data._id);
      if (!user) throw 'Invalid User!';
      req.user = user._id;
      next();
    } catch (error) {
      failed(res, 'Unauthorized error!', 401);
    }
  },
  async authorization(req, res, next) {
    try {
      next();
    } catch (error) {
      failed(res, 'Unauthorized error!', 401);
    }
  },
};
