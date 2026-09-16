import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // On ne bloque pas le build, mais on prévient clairement en dev/prod
  // que la connexion Supabase n'est pas configurée.
  // eslint-disable-next-line no-console
  console.warn(
    "[ASD Annonces] Variables VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY manquantes. " +
      "Copiez .env.example vers .env et renseignez vos clés Supabase."
  );
}

export const supabase = createClient<Database>(
  supabaseUrl ?? "https://placeholder.supabase.co",
  supabaseAnonKey ?? "placeholder-anon-key"
);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
