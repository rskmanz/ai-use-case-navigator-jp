import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/supabase';

// 型エイリアス
type UseCase = Database['public']['Tables']['use_cases']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];
type ImplementationStep = Database['public']['Tables']['implementation_steps']['Row'];

// カテゴリー取得
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('カテゴリー取得エラー:', error);
    throw error;
  }

  return data || [];
}

// ユースケース一覧取得
export async function getUseCases(filters?: {
  category_id?: string;
  difficulty?: string;
  is_featured?: boolean;
  search?: string;
}): Promise<UseCase[]> {
  let query = supabase
    .from('use_cases')
    .select('*');

  // フィルター適用
  if (filters?.category_id) {
    query = query.eq('category_id', filters.category_id);
  }

  if (filters?.difficulty) {
    query = query.eq('difficulty', filters.difficulty);
  }

  if (filters?.is_featured !== undefined) {
    query = query.eq('is_featured', filters.is_featured);
  }

  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  query = query.order('popularity', { ascending: false });

  const { data, error } = await query;

  if (error) {
    console.error('ユースケース取得エラー:', error);
    throw error;
  }

  return data || [];
}

// 注目のユースケース取得
export async function getFeaturedUseCases(): Promise<UseCase[]> {
  return getUseCases({ is_featured: true });
}

// 特定のユースケース取得（詳細ページ用）
export async function getUseCaseById(id: string): Promise<{
  useCase: UseCase;
  steps: ImplementationStep[];
} | null> {
  // ユースケース基本情報
  const { data: useCase, error: useCaseError } = await supabase
    .from('use_cases')
    .select('*')
    .eq('id', id)
    .single();

  if (useCaseError || !useCase) {
    console.error('ユースケース取得エラー:', useCaseError);
    return null;
  }

  // 実装ステップ取得
  const { data: steps, error: stepsError } = await supabase
    .from('implementation_steps')
    .select('*')
    .eq('use_case_id', id)
    .order('step_number');

  if (stepsError) {
    console.error('ステップ取得エラー:', stepsError);
  }

  return {
    useCase,
    steps: steps || []
  };
}

