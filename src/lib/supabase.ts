import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jcnbjdptespaklszrafq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjbmJqZHB0ZXNwYWtsc3pyYWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4ODY5OTksImV4cCI6MjA1NjQ2Mjk5OX0.5K8HYuKpYbxXlVQSqTUGZ5DBKfC7M5k1sXJT2da6aKo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
