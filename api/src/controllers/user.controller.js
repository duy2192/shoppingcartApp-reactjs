import { userSchema } from 'schema';
import { userService } from 'services';
import { failed, log, success } from 'utils';

export const userController = {
  async updateProfile(req, res) {
    try {
      const payload = userSchema.updateProfile(req.body);
      const results = await userService.updateProfile(req.user, payload);
      success(res, results);
    } catch (error) {
      log.error(error);
      failed(res, error);
    }
  },
  async changePassword(req, res) {
    try {
      const payload = userSchema.changePassword(req.body);
      const results = await userService.changePassword(req.user, payload);
      success(res, results);
    } catch (error) {
      log.error(error);
      failed(res, error);
    }
  },
  async getAllOrders(req, res) {
    try {
      const payload = req.body;
      const results = await userService.getAllOrders(req.user, payload);
      success(res, results);
    } catch (error) {
      log.error(error);
      failed(res, error);
    }
  },
  async getOrderById(req, res) {
    try {
      const payload = userSchema.getOrderById(req.params);
      const results = await userService.getOrderById(req.user, payload);
      success(res, results);
    } catch (error) {
      log.error(error);
      failed(res, error);
    }
  },
  async addToCart(req, res) {
    try {
      const payload = userSchema.addToCart(req.body);
      const results = await userService.addToCart(req.user, payload);
      success(res, results);
    } catch (error) {
      log.error(error);
      failed(res, error);
    }
  },
  async createPurchaseOrderGuest(req, res) {
    try {
      const payload = userSchema.createPurchaseOrderUser(req.body);
      const results = await userService.createPurchaseOrderUser(req.user, payload);
      success(res, results);
    } catch (error) {
      log.error(error);
      failed(res, error);
    }
  },
  async cancelOrder(req, res) {
    try {
      const payload = userSchema.cancelOrder(req.params);
      const results = await userService.cancelOrder(req.user, payload);
      success(res, results);
    } catch (error) {
      log.error(error);
      failed(res, error);
    }
  },
};
