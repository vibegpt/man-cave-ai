export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type SubscriptionTier = "free" | "basic" | "pro";

export type ProjectAssetType =
    | "original"
    | "reference"
    | "inspiration"
    | "generated"
    | "other";

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string; // uuid
                    email: string;
                    created_at: string; // timestamptz
                    subscription_tier: SubscriptionTier;
                    generation_count: number;
                    generation_limit: number;
                };
                Insert: {
                    id: string; // uuid (matches auth.users.id)
                    email: string;
                    created_at?: string;
                    subscription_tier?: SubscriptionTier;
                    generation_count?: number;
                    generation_limit?: number;
                };
                Update: {
                    id?: string;
                    email?: string;
                    created_at?: string;
                    subscription_tier?: SubscriptionTier;
                    generation_count?: number;
                    generation_limit?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: "users_id_fkey";
                        columns: ["id"];
                        referencedRelation: "users"; // auth.users (not introspectable in public types)
                        referencedColumns: ["id"];
                    }
                ];
            };

            projects: {
                Row: {
                    id: string; // uuid
                    user_id: string; // uuid
                    name: string;
                    room_type: string;
                    created_at: string; // timestamptz
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    name: string;
                    room_type: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    name?: string;
                    room_type?: string;
                    created_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "projects_user_id_fkey";
                        columns: ["user_id"];
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };

            generations: {
                Row: {
                    id: string; // uuid
                    user_id: string; // uuid
                    project_id: string | null; // uuid
                    style: string;
                    original_image_url: string | null;
                    generated_image_url: string | null;
                    prompt_used: string | null;
                    generation_time: number | null; // ms
                    created_at: string; // timestamptz
                    is_favorite: boolean;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    project_id?: string | null;
                    style: string;
                    original_image_url?: string | null;
                    generated_image_url?: string | null;
                    prompt_used?: string | null;
                    generation_time?: number | null;
                    created_at?: string;
                    is_favorite?: boolean;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    project_id?: string | null;
                    style?: string;
                    original_image_url?: string | null;
                    generated_image_url?: string | null;
                    prompt_used?: string | null;
                    generation_time?: number | null;
                    created_at?: string;
                    is_favorite?: boolean;
                };
                Relationships: [
                    {
                        foreignKeyName: "generations_user_id_fkey";
                        columns: ["user_id"];
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "generations_project_id_fkey";
                        columns: ["project_id"];
                        referencedRelation: "projects";
                        referencedColumns: ["id"];
                    }
                ];
            };

            subscriptions: {
                Row: {
                    id: string; // uuid
                    user_id: string; // uuid
                    stripe_customer_id: string | null;
                    stripe_subscription_id: string | null;
                    status: string | null;
                    current_period_end: string | null; // timestamptz
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    stripe_customer_id?: string | null;
                    stripe_subscription_id?: string | null;
                    status?: string | null;
                    current_period_end?: string | null;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    stripe_customer_id?: string | null;
                    stripe_subscription_id?: string | null;
                    status?: string | null;
                    current_period_end?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "subscriptions_user_id_fkey";
                        columns: ["user_id"];
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };

            style_presets: {
                Row: {
                    id: string;
                    name: string;
                    slug: string;
                    category: string | null;
                    description: string | null;
                    keywords: string[];
                    prompt_template: string;
                    is_public: boolean;
                    created_by: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    slug: string;
                    category?: string | null;
                    description?: string | null;
                    keywords?: string[];
                    prompt_template: string;
                    is_public?: boolean;
                    created_by?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    slug?: string;
                    category?: string | null;
                    description?: string | null;
                    keywords?: string[];
                    prompt_template?: string;
                    is_public?: boolean;
                    created_by?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "style_presets_created_by_fkey";
                        columns: ["created_by"];
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };

            project_assets: {
                Row: {
                    id: string;
                    project_id: string;
                    asset_type: ProjectAssetType;
                    storage_path: string | null;
                    file_url: string | null;
                    mime_type: string | null;
                    size_bytes: number | null;
                    width: number | null;
                    height: number | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    project_id: string;
                    asset_type?: ProjectAssetType;
                    storage_path?: string | null;
                    file_url?: string | null;
                    mime_type?: string | null;
                    size_bytes?: number | null;
                    width?: number | null;
                    height?: number | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    project_id?: string;
                    asset_type?: ProjectAssetType;
                    storage_path?: string | null;
                    file_url?: string | null;
                    mime_type?: string | null;
                    size_bytes?: number | null;
                    width?: number | null;
                    height?: number | null;
                    created_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "project_assets_project_id_fkey";
                        columns: ["project_id"];
                        referencedRelation: "projects";
                        referencedColumns: ["id"];
                    }
                ];
            };

            products: {
                Row: {
                    id: string;
                    name: string;
                    slug: string;
                    brand: string | null;
                    category: string | null;
                    tags: string[];
                    retailer: string | null;
                    product_url: string | null;
                    affiliate_url: string | null;
                    image_url: string | null;
                    price: number | null;
                    currency: string | null;
                    is_active: boolean;
                    created_by: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    slug: string;
                    brand?: string | null;
                    category?: string | null;
                    tags?: string[];
                    retailer?: string | null;
                    product_url?: string | null;
                    affiliate_url?: string | null;
                    image_url?: string | null;
                    price?: number | null;
                    currency?: string | null;
                    is_active?: boolean;
                    created_by?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    slug?: string;
                    brand?: string | null;
                    category?: string | null;
                    tags?: string[];
                    retailer?: string | null;
                    product_url?: string | null;
                    affiliate_url?: string | null;
                    image_url?: string | null;
                    price?: number | null;
                    currency?: string | null;
                    is_active?: boolean;
                    created_by?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "products_created_by_fkey";
                        columns: ["created_by"];
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };

            generation_products: {
                Row: {
                    id: string;
                    generation_id: string;
                    product_id: string;
                    quantity: number;
                    position: number | null;
                    notes: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    generation_id: string;
                    product_id: string;
                    quantity?: number;
                    position?: number | null;
                    notes?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    generation_id?: string;
                    product_id?: string;
                    quantity?: number;
                    position?: number | null;
                    notes?: string | null;
                    created_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "generation_products_generation_id_fkey";
                        columns: ["generation_id"];
                        referencedRelation: "generations";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "generation_products_product_id_fkey";
                        columns: ["product_id"];
                        referencedRelation: "products";
                        referencedColumns: ["id"];
                    }
                ];
            };
        };

        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
        CompositeTypes: Record<string, never>;
    };
}