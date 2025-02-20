import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // For production
});

pool.connect()
    .then(() => console.info('Connected to PostgreSQL database'))
    .catch((err) => console.error('Database connection error:', err));

export default pool;
