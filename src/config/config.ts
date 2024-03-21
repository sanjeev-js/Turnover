import dotenv from 'dotenv';

dotenv.config({path: '../../.env'});

dotenv.config();

export const DB = {
    USER: process.env.DB_USER || 'db user',
    PASSWORD: process.env.DB_PASSWORD || 'db user password',
    HOST: process.env.DB_HOST || 'db host',
    NAME: process.env.DB_NAME || 'db name',
    PORT: process.env.DB_PORT || 'db port'
}

export const JWT_EXPIRE = process.env.JWT_EXPIRE || '1d';
export const JWT_SECRET = process.env.JWT_SECRET || "my random secret";

export const MAILID = process.env.MAILID || '';
export const MAILPASS = process.env.MAILPASS || '';