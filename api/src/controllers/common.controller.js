import { commonSchema } from 'schema';
import { commonService } from 'services';
import { failed, success } from 'utils';

export const commonController = {
  async getProvinces(req, res) {
    try {
      const payload = commonSchema.getProvinces(req.query);

      const results = await commonService.getProvinces(payload);

      success(res, results);
    } catch (e) {
      failed(res, e.message);
    }
  },
};
