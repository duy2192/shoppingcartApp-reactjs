import express from 'express';
import authRouter from './auth.router';
import categoryRouter from './category.router';
import productRouter from './product.router';
import userRouter from './user.router';
import purchaseOrderRouter from './purchaseOrder.router';
import commonRouter from './common.router';
import uploadRouter from './upload.router';
import { authMiddleware } from 'middleware/auth.middleware';

const apiRouter = express();

apiRouter.use('/auth', authRouter);
apiRouter.use('/category', categoryRouter);
apiRouter.use('/product', productRouter);
apiRouter.use('/common', commonRouter);
apiRouter.use('/user', authMiddleware.authentication, userRouter);
apiRouter.use('/order', purchaseOrderRouter);
apiRouter.use('/upload', authMiddleware.authentication, uploadRouter);

export default apiRouter;
