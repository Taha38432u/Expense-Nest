import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://wletlppjtxxwizrdnolw.supabase.co";
const supabaseKey =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsZXRscHBqdHh4d2l6cmRub2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyMjIwMjAsImV4cCI6MjA0NDc5ODAyMH0.8XR2XwiV2wP_bjl54qRcLIQIfkZ4nHqFRrn7VfR0_qs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
