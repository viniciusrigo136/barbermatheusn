import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = 'https://sbxcxxghpypwtxqxnsmm.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNieGN4eGdocHlwd3R4cXhuc21tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NzkzMjYsImV4cCI6MjA2MzA1NTMyNn0.8BzUMAInAkE6ktA4ZoYP-2CnMyiav0KjaH8_suQKAtQ';

    if (!supabaseUrl || !supabaseAnonKey) {
      // Esta verificação agora é mais para um sanity check, já que os valores estão hardcoded.
      // Em um cenário de variáveis de ambiente, ela seria crucial.
      console.error("Supabase URL or Anon Key is missing. This should not happen with hardcoded values.");
    }
    
    export const supabase = createClient(supabaseUrl, supabaseAnonKey);