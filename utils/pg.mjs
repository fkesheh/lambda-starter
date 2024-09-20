import pg from "pg";
import dotenv from "dotenv";
const { Pool } = pg;

dotenv.config();

const pgPool = {
  pool: null,
  getPool: () => {
    if (!pgPool.pool) {
      pgPool.pool = new Pool({
        connectionString: process.env.DATABASE_URL
      });
    }
    return pgPool.pool;
  },
  closePool: () => {
    pgPool.pool.end();
  },
  getConnection: async () => {
    const pool = pgPool.getPool();
    const client = await pool.connect();
    return client;
  }
};

export default pgPool;
