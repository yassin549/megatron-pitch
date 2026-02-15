import { Pool } from 'pg';
import { nanoid } from 'nanoid';

const params = new URL(process.env.PLATFORM_DATABASE_URL!);

const pool = new Pool({
    connectionString: process.env.PLATFORM_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export async function ensurePlatformUser(email: string) {
    const client = await pool.connect();
    try {
        // Check if user exists (using double quotes for case sensitivity if Prisma created tables)
        const checkRes = await client.query(
            'SELECT id, email FROM "User" WHERE email = $1',
            [email]
        );

        if (checkRes.rows.length > 0) {
            return checkRes.rows[0];
        }

        // Create new user if not exists
        // Note: Prisma uses CUIDs or UUIDs by default. providing a UUID here.
        const userId = crypto.randomUUID();
        const now = new Date();

        const insertRes = await client.query(
            `INSERT INTO "User" (id, email, "passwordHash", "createdAt", "updatedAt", "isAdmin", "isBlacklisted", "walletHotBalance", "walletColdBalance")
             VALUES ($1, $2, '', $3, $3, false, false, 0, 0)
             RETURNING id, email`,
            [userId, email, now]
        );

        console.log(`Created new platform user for ${email}`);
        return insertRes.rows[0];
    } catch (e) {
        console.error('Error ensuring platform user:', e);
        throw e;
    } finally {
        client.release();
    }
}
