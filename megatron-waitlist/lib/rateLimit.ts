// Rate limiting for API protection
interface RateLimitEntry {
    count: number;
    resetTime: number;
}

const ipLimits = new Map<string, RateLimitEntry>();
const emailLimits = new Map<string, RateLimitEntry>();

// Cleanup expired entries every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of ipLimits.entries()) {
        if (entry.resetTime < now) {
            ipLimits.delete(key);
        }
    }
    for (const [key, entry] of emailLimits.entries()) {
        if (entry.resetTime < now) {
            emailLimits.delete(key);
        }
    }
}, 5 * 60 * 1000);

export function checkRateLimit(identifier: string, type: 'ip' | 'email'): boolean {
    const limits = type === 'ip' ? ipLimits : emailLimits;
    const maxRequests = type === 'ip' ? 3 : 1;
    const windowMs = type === 'ip' ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 1 hour for IP, 24h for email

    const now = Date.now();
    const entry = limits.get(identifier);

    if (!entry || entry.resetTime < now) {
        // Create new entry
        limits.set(identifier, {
            count: 1,
            resetTime: now + windowMs,
        });
        return true;
    }

    if (entry.count >= maxRequests) {
        return false; // Rate limit exceeded
    }

    // Increment count
    entry.count++;
    limits.set(identifier, entry);
    return true;
}
