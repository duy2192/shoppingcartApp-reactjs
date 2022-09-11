import { categorySchema } from 'schema';
import { categoryService } from 'services';
import { failed, success } from 'utils';

export const categoryController = {
  async getAllCategory(req, res) {
    try {
      const payload = categorySchema.getAllCategory(req.query);
      const result = await categoryService.getAllCategory(payload);
      success(res, result);
    } catch (error) {
      failed(res, error);
    }
  },
  async addCategory(req, res) {
    try {
      const payload = categorySchema.addCategory(req.body);
      const result = await categoryService.addCategory(payload);
      success(res, result);
    } catch (error) {
      failed(res, error);
    }
  },
  async removeCategory(req, res) {
    try {
      const payload = categorySchema.removeCategory(req.params);
      const result = await categoryService.removeCategory(payload);
      success(res, result);
    } catch (error) {
      failed(res, error);
    }
  }

};
