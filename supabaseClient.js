import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rcxmpkmepnewxdnayppl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjeG1wa21lcG5ld3hkbmF5cHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MTk2NDIsImV4cCI6MjA1OTQ5NTY0Mn0.aRfr5KFqdTFmXySqFOBHSQ8hDNr_VYjNvusC1gh6wPQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);