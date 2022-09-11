import { purchaseOrderSchema } from 'schema/purchaseOrder.schema';
import { purchaseOrderService } from 'services';
import { failed, log, success } from 'utils';

export const purchaseOrderController = {
  async createPurchaseOrderGuest(req, res) {
    try {
      const payload = purchaseOrderSchema.createPurchaseOrderGuest(req.body);
      const results = await purchaseOrderService.createPurchaseOrderGuest(payload);
      success(res, results);
    } catch (error) {
      log.error(error);
      failed(res, error);
    }
  },
};
