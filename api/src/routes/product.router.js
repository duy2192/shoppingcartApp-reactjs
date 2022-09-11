import { productController } from 'controllers';
import { Router } from 'express';

const router = Router();

router.get('/',productController.getAllProduct);
router.get('/:productId',productController.getProductById);
router.post('/',productController.addProduct);
router.delete('/:id',productController.removeProduct);




export default router;