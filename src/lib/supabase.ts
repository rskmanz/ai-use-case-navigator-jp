import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nvnwsgddikyzfqkrcdmd.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52bndzZ2RkaWt5emZxa3JjZG1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1NTYyNjcsImV4cCI6MjA1ODEzMjI2N30.tEeLIOPIXo0zZxKn7WFxPiXCdlqyNVzUCOj5Fz43Zyo';

// Create a single instance for client-side usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
});

// Client-side Supabase client factory
export const createClientSupabase = () => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true
    }
  });
};

// 必要最低限のデータベース型定義
export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string; // 日本語名
          slug: string;
          description: string | null;
          icon: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          icon?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          icon?: string | null;
        };
      };
      use_cases: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          category_id: string | null;
          difficulty: string | null; // '初心者' | '中級者' | '上級者'
          time_to_implement: string | null;
          roi_expected: string | null;
          estimated_cost: string | null; // '無料' | '低価格' | '中価格' | '高価格' | 'カスタム'
          is_featured: boolean;
          popularity: number;
          tags: string[] | null; // 日本語タグ
          industries: string[] | null; // 日本語業界名
          user_roles: string[] | null; // 日本語役割名
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          category_id?: string | null;
          difficulty?: string | null;
          time_to_implement?: string | null;
          roi_expected?: string | null;
          estimated_cost?: string | null;
          is_featured?: boolean;
          popularity?: number;
          tags?: string[] | null;
          industries?: string[] | null;
          user_roles?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          category_id?: string | null;
          difficulty?: string | null;
          time_to_implement?: string | null;
          roi_expected?: string | null;
          estimated_cost?: string | null;
          is_featured?: boolean;
          popularity?: number;
          tags?: string[] | null;
          industries?: string[] | null;
          user_roles?: string[] | null;
          updated_at?: string;
        };
      };
      implementation_steps: {
        Row: {
          id: string;
          use_case_id: string;
          step_number: number;
          title: string;
          description: string | null;
          code: string | null;
          duration: string | null; // '30分' など
          difficulty: string | null; // '簡単' | '普通' | '難しい'
          created_at: string;
        };
        Insert: {
          id?: string;
          use_case_id: string;
          step_number: number;
          title: string;
          description?: string | null;
          code?: string | null;
          duration?: string | null;
          difficulty?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          use_case_id?: string;
          step_number?: number;
          title?: string;
          description?: string | null;
          code?: string | null;
          duration?: string | null;
          difficulty?: string | null;
        };
      };
    };
  };
};