import { authSchema } from 'schema';
import { authService } from 'services';
import { failed, log, success } from 'utils';

export const authController = {
  async register(req, res) {
    try {
      const payload = authSchema.register(req.body);
      const result = await authService.register(payload);
      success(res, result);
    } catch (error) {
      failed(res, error);
      log.error(error);
    }
  },
  async login(req, res) {
    try {
      const payload = authSchema.login(req.body);
      const results = await authService.login(payload);
      success(res, results);
    } catch (error) {
      failed(res, error);
    }
  },
  async deleteUserById(req, res) {
    try {
      const results = await authService.deleteUserById(req.params);
      success(res, results);
    } catch (error) {
      failed(res, error);
    }
  },
  async deleteUserByEmail(req, res) {
    try {
      const results = await authService.deleteUserByEmail(req.body);
      success(res, results);
    } catch (error) {
      failed(res, error);
    }
  },
};
