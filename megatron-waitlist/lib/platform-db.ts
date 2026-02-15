import { Pool } from 'pg';
import crypto from 'node:crypto';
import { nanoid } from 'nanoid';

// Initializing the pool only if the environment variable is present prevents build-time errors.
// The checks inside ensurePlatformUser ensure runtime safety.
const pool = process.env.PLATFORM_DATABASE_URL
    ? new Pool({
        connectionString: process.env.PLATFORM_DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })
    : null;

export async function ensurePlatformUser(email: string) {
    if (!pool) {
        console.warn('PLATFORM_DATABASE_URL is not set. Skipping platform user creation.');
        return null;
    }
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
