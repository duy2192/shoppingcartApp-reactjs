import { commonController } from 'controllers';
import { Router } from 'express';

const router = Router();


router.get('/provinces', commonController.getProvinces);



export default router;