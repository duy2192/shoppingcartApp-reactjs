import { authController } from 'controllers';
import { Router } from 'express';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.delete('/:id', authController.deleteUserById);
router.delete('/', authController.deleteUserByEmail);

export default router;
