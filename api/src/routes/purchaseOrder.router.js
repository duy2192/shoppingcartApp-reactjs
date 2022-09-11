import { purchaseOrderController } from 'controllers';
import { Router } from 'express';

const router = Router();

router.post('/', purchaseOrderController.createPurchaseOrderGuest);

export default router;
