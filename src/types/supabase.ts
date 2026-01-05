export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      seo_pages: {
        Row: {
          id: string
          slug: string
          title: string
          meta_description: string | null
          h1: string | null
          content: string | null
          keywords: Json
          category: string | null
          published: boolean
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          meta_description?: string | null
          h1?: string | null
          content?: string | null
          keywords?: Json
          category?: string | null
          published?: boolean
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          meta_description?: string | null
          h1?: string | null
          content?: string | null
          keywords?: Json
          category?: string | null
          published?: boolean
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      keywords: {
        Row: {
          id: string
          keyword: string
          search_volume: number | null
          difficulty: number | null
          category: string | null
          priority: number
          target_url: string | null
          status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          keyword: string
          search_volume?: number | null
          difficulty?: number | null
          category?: string | null
          priority?: number
          target_url?: string | null
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          keyword?: string
          search_volume?: number | null
          difficulty?: number | null
          category?: string | null
          priority?: number
          target_url?: string | null
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      analytics: {
        Row: {
          id: string
          page_slug: string
          page_views: number
          unique_visitors: number
          clicks: number
          conversions: number
          avg_time_on_page: number | null
          bounce_rate: number | null
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          page_slug: string
          page_views?: number
          unique_visitors?: number
          clicks?: number
          conversions?: number
          avg_time_on_page?: number | null
          bounce_rate?: number | null
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          page_slug?: string
          page_views?: number
          unique_visitors?: number
          clicks?: number
          conversions?: number
          avg_time_on_page?: number | null
          bounce_rate?: number | null
          date?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_page_slug_fkey"
            columns: ["page_slug"]
            referencedRelation: "seo_pages"
            referencedColumns: ["slug"]
          }
        ]
      }

      content_generations: {
        Row: {
          id: string
          page_id: string | null
          prompt: string
          generated_content: string
          model_used: string | null
          version: number
          quality_score: number | null
          tokens_used: number | null
          generation_time: number | null
          status: string
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          page_id?: string | null
          prompt: string
          generated_content: string
          model_used?: string | null
          version?: number
          quality_score?: number | null
          tokens_used?: number | null
          generation_time?: number | null
          status?: string
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          page_id?: string | null
          prompt?: string
          generated_content?: string
          model_used?: string | null
          version?: number
          quality_score?: number | null
          tokens_used?: number | null
          generation_time?: number | null
          status?: string
          metadata?: Json
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_generations_page_id_fkey"
            columns: ["page_id"]
            referencedRelation: "seo_pages"
            referencedColumns: ["id"]
          }
        ]
      }

      image_generations: {
        Row: {
          id: string
          session_id: string | null
          style: string
          custom_description: string | null
          status: string
          processing_time: number | null
          error_message: string | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id?: string | null
          style: string
          custom_description?: string | null
          status?: string
          processing_time?: number | null
          error_message?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string | null
          style?: string
          custom_description?: string | null
          status?: string
          processing_time?: number | null
          error_message?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Relationships: []
      }

      page_keywords: {
        Row: {
          page_id: string
          keyword_id: string
          relevance_score: number | null
          created_at: string
        }
        Insert: {
          page_id: string
          keyword_id: string
          relevance_score?: number | null
          created_at?: string
        }
        Update: {
          page_id?: string
          keyword_id?: string
          relevance_score?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_keywords_page_id_fkey"
            columns: ["page_id"]
            referencedRelation: "seo_pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "page_keywords_keyword_id_fkey"
            columns: ["keyword_id"]
            referencedRelation: "keywords"
            referencedColumns: ["id"]
          }
        ]
      }
    }

    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

// Helper types for easier use
export type SEOPage = Database['public']['Tables']['seo_pages']['Row']
export type SEOPageInsert = Database['public']['Tables']['seo_pages']['Insert']
export type SEOPageUpdate = Database['public']['Tables']['seo_pages']['Update']

export type Keyword = Database['public']['Tables']['keywords']['Row']
export type KeywordInsert = Database['public']['Tables']['keywords']['Insert']
export type KeywordUpdate = Database['public']['Tables']['keywords']['Update']

export type Analytics = Database['public']['Tables']['analytics']['Row']
export type AnalyticsInsert = Database['public']['Tables']['analytics']['Insert']
export type AnalyticsUpdate = Database['public']['Tables']['analytics']['Update']

export type ContentGeneration = Database['public']['Tables']['content_generations']['Row']
export type ContentGenerationInsert = Database['public']['Tables']['content_generations']['Insert']
export type ContentGenerationUpdate = Database['public']['Tables']['content_generations']['Update']

export type PageKeyword = Database['public']['Tables']['page_keywords']['Row']
export type PageKeywordInsert = Database['public']['Tables']['page_keywords']['Insert']
export type PageKeywordUpdate = Database['public']['Tables']['page_keywords']['Update']

export type ImageGeneration = Database['public']['Tables']['image_generations']['Row']
export type ImageGenerationInsert = Database['public']['Tables']['image_generations']['Insert']
export type ImageGenerationUpdate = Database['public']['Tables']['image_generations']['Update']
