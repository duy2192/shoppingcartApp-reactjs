import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { log } from '../utils';
dotenv.config({ path: process.env.NODE_ENV!=="development" ? `.env.production` : `.env.development` });

const db = process.env.DB;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPwd = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
export const connectDatabase = async () => {
  try {
    const uri = `${db}://${dbUser}:${dbPwd}@${dbHost}/${dbName}`;
    const options = {
      connectTimeoutMS: 10000,
      useNewUrlParser: true,
    };
    await mongoose.connect(uri, options);
    log.info('Connect MongoDB successfully!');
  } catch (error) {
    log.error(`Cannot connect MongoDB. Error ${error}`);
  }
};
connectDatabase();

export default mongoose;
