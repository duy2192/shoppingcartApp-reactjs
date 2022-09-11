import dotenv from 'dotenv';
dotenv.config({ path: process.env.NODE_ENV!=="development" ? `.env.production` : `.env.development` });
export const JWT_KEY = process.env.JWT_KEY;
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PWD = process.env.SMTP_PWD;
export const BASE_URL = `http://localhost:${process.env.PORT}/api/`;
