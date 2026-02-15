import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { supabase } from '@/lib/supabase';
import { waitlistSchema } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rateLimit';
import { ensurePlatformUser } from '@/lib/platform-db';

export async function POST(request: NextRequest) {
    try {
        // Get IP address for rate limiting
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

        // Check IP rate limit
        if (!checkRateLimit(ip, 'ip')) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        // Parse and validate request body
        const body = await request.json();

        // Validation with Zod
        const validation = waitlistSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.issues[0].message },
                { status: 400 }
            );
        }

        const { email, name, website } = validation.data;

        // Honeypot check
        if (website && website.length > 0) {
            // Silent fail for bots
            return NextResponse.json(
                { success: true, referralCode: 'SPAM', referralUrl: '' },
                { status: 200 }
            );
        }

        // Check email rate limit
        if (!checkRateLimit(email, 'email')) {
            return NextResponse.json(
                { error: 'This email has already been registered.' },
                { status: 429 }
            );
        }

        // Generate unique referral code
        const referralCode = nanoid(8).toUpperCase();

        // Extract referral code from query params if exists
        const referredBy = body.referredBy || null;

        // Insert into Supabase
        const { data, error } = await supabase
            .from('waitlist')
            .insert([
                {
                    email,
                    name: name || null,
                    referral_code: referralCode,
                    referred_by: referredBy,
                    metadata: {
                        user_agent: request.headers.get('user-agent'),
                        ip,
                        timestamp: new Date().toISOString(),
                    },
                },
            ])
            .select()
            .single();

        if (error) {
            // Check for duplicate email
            if (error.code === '23505') {
                return NextResponse.json(
                    { error: 'This email is already on the waitlist.' },
                    { status: 400 }
                );
            }

            console.error('Supabase error detailed:', JSON.stringify(error));
            return NextResponse.json(
                { error: `Failed to join waitlist: ${error.message || 'Please try again.'}` },
                { status: 500 }
            );
        }

        // Create platform user (shadow account)
        try {
            ensurePlatformUser(email).catch(err => {
                console.error('Failed to create platform user asynchronously:', err);
            });
        } catch (syncErr) {
            console.error('Synchronous error calling ensurePlatformUser:', syncErr);
        }

        // Success response
        return NextResponse.json({
            success: true,
            message: 'Welcome to Megatron! 🚀',
            referralCode,
            referralUrl: `${request.nextUrl.origin}?ref=${referralCode}`,
        });

    } catch (error) {
        console.error('Waitlist API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
