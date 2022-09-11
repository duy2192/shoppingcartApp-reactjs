import { uploadController } from 'controllers';
import { Router } from 'express';

const router = Router();

router.post('/image', uploadController.uploadImage);

export default router;
