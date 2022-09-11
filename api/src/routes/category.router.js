import { categoryController } from 'controllers';
import { Router } from 'express';

const router = Router();

router.get('/',categoryController.getAllCategory);
router.post('/',categoryController.addCategory);




export default router;