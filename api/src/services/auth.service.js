import { User } from 'models';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from 'constants/index';
export const authService = {
  async register(payload) {
    if (!(await User.doesNotExist({ username: payload.username, email: payload.email })))
      throw 'Email hoặc tài khoản đã tồn tại!';
    const user = new User({
      ...payload,
    });
    await user.save();
    return user;
  },
  async login(payload) {
    const user = await User.findOne({
      $or: [{ email: payload.identifier }, { username: payload.identifier }],
    }).populate('cart.product');
    if (user) {
      const checkPassword = await user.comparePassword(payload.password);
      if (checkPassword) {
        const jsonObject = {
          _id: user._id,
          role: user.role,
          username: user.username,
        };
        const token = jwt.sign(jsonObject, JWT_KEY, {
          expiresIn: 60000,
        });
        return {
          token,
          user,
        };
      }
      throw 'Mật khẩu không chính xác';
    }
    throw 'Tài khoản không tồn tại!';
  },
  async checkToken(token) {
    return await jwt.verify(token, JWT_KEY);
  },
  async deleteUserById(payload) {
    await User.findByIdAndDelete(payload.id);
    return;
  },
  async deleteUserByEmail(payload) {
    await User.findOneAndDelete({ email: payload.email });
    return;
  },
};
