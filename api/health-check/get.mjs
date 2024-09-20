import pgPool from "../../utils/pg.mjs";

export default async (event) => {
  try {
    const client = await pgPool.getConnection();
    const res = await client.query('SELECT 1');
    await client.release();
    
    if (res.rows[0]['?column?'] === 1) {
      return {
        statusCode: 200,
        body: JSON.stringify({ status: "healthy", message: "Database connection successful" })
      };
    } else {
      throw new Error("Unexpected database response");
    }
  } catch (error) {
    console.error("Database health check failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ status: "unhealthy", message: "Database connection failed" })
    };
  }
}