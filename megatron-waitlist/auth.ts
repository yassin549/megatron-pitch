import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { ensurePlatformUser } from "./lib/platform-db"
import { getSupabaseAdmin } from "./lib/supabase-admin"
import { nanoid } from "nanoid"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google" && user.email) {
                try {
                    console.log(`Google sign in for ${user.email}`);

                    const supabaseAdmin = getSupabaseAdmin();
                    if (!supabaseAdmin) {
                        console.warn("Supabase admin client not configured. Skipping waitlist sync.");
                        return true;
                    }

                    // 1. Ensure user exists in Platform DB (Neon)
                    await ensurePlatformUser(user.email);

                    // 2. Add to Waitlist (Supabase) if not already present
                    // Check if exists in waitlist
                    const { data: existingWaitlist } = await supabaseAdmin
                        .from('waitlist')
                        .select('email')
                        .eq('email', user.email)
                        .single();

                    if (!existingWaitlist) {
                        const referralCode = nanoid(8).toUpperCase();

                        await supabaseAdmin
                            .from('waitlist')
                            .insert([
                                {
                                    email: user.email,
                                    name: user.name || null,
                                    referral_code: referralCode,
                                    metadata: {
                                        source: 'google_oauth',
                                        timestamp: new Date().toISOString(),
                                    },
                                },
                            ]);
                        console.log(`Added ${user.email} to waitlist via Google auth`);
                    }

                    return true;
                } catch (error) {
                    console.error("Error in signIn callback:", error);
                    return false;
                }
            }
            return true;
        },
    },
})
