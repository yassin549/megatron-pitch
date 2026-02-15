const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (!fs.existsSync(envPath)) {
            console.error('.env.local file not found at:', envPath);
            return {};
        }
        const envFile = fs.readFileSync(envPath, 'utf8');
        const envVars = {};
        envFile.split(/\r?\n/).forEach(line => {
            line = line.trim();
            if (!line || line.startsWith('#')) return;

            const match = line.match(/^([^=]+?)\s*=\s*(.*)$/);
            if (match) {
                const key = match[1].trim();
                let value = match[2].trim();
                // Remove quotes if present
                if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }
                envVars[key] = value;
            }
        });
        console.log(`Loaded ${Object.keys(envVars).length} env vars from .env.local`);
        return envVars;
    } catch (e) {
        console.error('Error reading .env.local:', e.message);
        return {};
    }
}

async function testConnection() {
    const env = loadEnv();
    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error('Error: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing in .env.local');
        return;
    }

    console.log(`Testing connection to: ${supabaseUrl}`);

    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        // Simple query: select nothing from a common table or just check session
        // We'll try to select from 'waitlist' as that's the relevant table
        const { data, error } = await supabase.from('waitlist').select('count', { count: 'exact', head: true });

        if (error) {
            console.log('Connection established but query returned error (this confirms credentials work, but maybe table/permissions issue):');
            console.log(error.message);
        } else {
            console.log('Connection successful! Query executed without error.');
        }

    } catch (err) {
        console.error('Unexpected error during connection test:', err);
    }
}

testConnection();
