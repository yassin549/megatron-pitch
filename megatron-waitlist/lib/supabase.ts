// Supabase configuration with environment variables
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false,
    },
});

// Database types
export interface WaitlistEntry {
    id: string;
    email: string;
    name?: string;
    referral_code: string;
    referred_by?: string;
    created_at: string;
    metadata?: Record<string, any>;
}
