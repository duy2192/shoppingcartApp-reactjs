import { userController } from 'controllers';
import { Router } from 'express';

const router = Router();

router.put('/', userController.updateProfile);
router.post('/cart', userController.addToCart);
router.post('/order', userController.createPurchaseOrderGuest);
router.put('/changePassword', userController.changePassword);
router.get('/order', userController.getAllOrders);
router.get('/order/:orderId', userController.getOrderById);
router.put('/order/cancel/:orderId', userController.cancelOrder);

export default router;
