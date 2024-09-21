import pgPool from './pg.mjs';

class Cache {
    constructor(cacheName) {
        this.cacheName = cacheName;
        this.initializeTable();
    }

    async initializeTable() {
        const client = await pgPool.getConnection();
        try {
            // Check if the table exists
            const { rows } = await client.query(`
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_name = 'cache'
                );
            `);

            if (!rows[0].exists) {
                // Create the table if it doesn't exist
                await client.query(`
                    CREATE TABLE cache (
                        cache_name VARCHAR(255),
                        cache_id VARCHAR(255),
                        data JSONB NOT NULL,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                        PRIMARY KEY (cache_name, cache_id)
                    );
                `);
            }
        } catch (error) {
            console.error("Error initializing cache table:", error);
            throw error;
        } finally {
            client.release();
        }
    }

    async get(cacheId) {
        const client = await pgPool.getConnection();
        try {
            const { rows } = await client.query(
                'SELECT data FROM cache WHERE cache_name = $1 AND cache_id = $2',
                [this.cacheName, cacheId]
            );
            return rows.length > 0 ? rows[0].data : null;
        } catch (error) {
            console.error("Error fetching cache", this.cacheName, cacheId, error);
            throw error;
        } finally {
            client.release();
        }
    }

    async set(cacheId, data) {
        const client = await pgPool.getConnection();
        try {
            await client.query(
                'INSERT INTO cache (cache_name, cache_id, data) VALUES ($1, $2, $3) ON CONFLICT (cache_name, cache_id) DO UPDATE SET data = $3',
                [this.cacheName, cacheId, JSON.stringify(data)]
            );
        } finally {
            client.release();
        }
    }

    async delete(cacheId) {
        const client = await pgPool.getConnection();
        try {
            await client.query(
                'DELETE FROM cache WHERE cache_name = $1 AND cache_id = $2',
                [this.cacheName, cacheId]
            );
        } finally {
            client.release();
        }
    }

    async fetch(cacheId, fetchFunction) {
        let data = await this.get(cacheId);
        if (data === null) {
            data = await fetchFunction();
            await this.set(cacheId, data);
        }
        return data;
    }
}

export default Cache;
