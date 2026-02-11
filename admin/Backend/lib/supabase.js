const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !key) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY are required in env');
}

const supabase = createClient(SUPABASE_URL, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

module.exports = { supabase };
