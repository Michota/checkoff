import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ngnyjjkggzusgcwaiylo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nbnlqamtnZ3p1c2djd2FpeWxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM4NDg0NjIsImV4cCI6MjAwOTQyNDQ2Mn0.yrtfF537-TSgDXBGr-GhyARz2rQLhjgqBX5cO99qfOM";

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
