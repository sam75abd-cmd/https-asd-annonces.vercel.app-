// Types générés à la main pour correspondre au schéma SQL fourni dans
// supabase/schema.sql. Si vous régénérez les types avec la CLI Supabase
// ('supabase gen types typescript'), vous pouvez remplacer ce fichier.

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "12";
  };
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          city: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          city?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          phone?: string | null;
          city?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          icon: string | null;
          sort_order: number;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          icon?: string | null;
          sort_order?: number;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          icon?: string | null;
          sort_order?: number;
        };
        Relationships: [];
      };
      listings: {
        Row: {
          id: string;
          owner_id: string;
          category_id: string;
          title: string;
          description: string;
          price: number | null;
          currency: string;
          city: string;
          images: string[];
          status: "active" | "sold" | "archived";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          category_id: string;
          title: string;
          description: string;
          price?: number | null;
          currency?: string;
          city: string;
          images?: string[];
          status?: "active" | "sold" | "archived";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          category_id?: string;
          title?: string;
          description?: string;
          price?: number | null;
          currency?: string;
          city?: string;
          images?: string[];
          status?: "active" | "sold" | "archived";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "listings_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      favorites: {
        Row: {
          user_id: string;
          listing_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          listing_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          listing_id?: string;
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

export type Listing = Database["public"]["Tables"]["listings"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type ListingWithCategory = Listing & {
  categories: Pick<Category, "id" | "name" | "slug"> | null;
};
