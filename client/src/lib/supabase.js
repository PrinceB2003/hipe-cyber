import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://ncoygncrxzrkubyshkyk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jb3lnbmNyeHpya3VieXNoa3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0NjI2NTAsImV4cCI6MjA3MTAzODY1MH0.q5xkMSKowhqOyJdkYM1H5gvuwIhkdkIYvDanbzGqlw4';

export const supabase = createClient(supabaseUrl, supabaseKey); 

