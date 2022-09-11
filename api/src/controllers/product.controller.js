import { productSchema } from 'schema';
import { productService } from 'services';
import { failed, log, success } from 'utils';

export const productController = {
  async getAllProduct(req, res) {
    try {
      const payload = productSchema.getAllProduct(req.query);
      const {data,pagination} = await productService.getAllProduct(payload);
      success(res, data,pagination);
    } catch (error) {
      log.error(error);
      failed(res, error);
    }
  },
  async getProductById(req, res) {
    try {
      const payload = productSchema.getProductById(req.params);
      const product = await productService.getProductById(payload);
      success(res, product);
    } catch (error) {
      log.error(error);
      failed(res, error);
    }
  },
  async addProduct(req, res) {
    try {
      const payload = productSchema.addProduct(req.body);
      const result = await productService.addProduct(payload);
      success(res, result);
    } catch (error) {
      log.error(error);

      failed(res, error);
    }
  },
  async removeProduct(req, res) {
    try {
      const payload = productSchema.removeProduct(req.params);
      const result = await productService.removeProduct(payload);
      success(res, result);
    } catch (error) {
      failed(res, error);
    }
  },
  
};
