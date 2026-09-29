// Placeholder types. Regenerate from your linked Supabase project with:
//   pnpm db:types
// This file is checked in so the app builds before you link a Supabase project.
// After running `pnpm db:types`, this file will be overwritten with generated
// types that reflect the actual schema.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      // Example feature — safe to remove after `pnpm db:types` regenerates.
      notes: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          image_path: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content: string;
          image_path?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content?: string;
          image_path?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
