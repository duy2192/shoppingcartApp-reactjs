import dotenv from 'dotenv';
dotenv.config({ path: process.env.NODE_ENV!=="development" ? `.env.production` : `.env.development` });
import express from 'express';
import cors from 'cors';
import { log } from 'utils';
import requestLogger from 'middleware/logger.middleware';
import apiRouter from 'routes';
import fileUpload from 'express-fileupload';

const app = express();
const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use('/api', apiRouter);
app.listen(PORT, () => {
  log.info('Server is starting on port ' + PORT);
});

app.get('/', (req, res) => {
  res.send('NodeJs!');
});

export default app