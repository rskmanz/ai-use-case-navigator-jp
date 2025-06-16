-- AIユースケースナビゲーター - 必要最低限データベーススキーマ
-- コア機能のみに絞った設計

-- 拡張機能を有効化
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- カテゴリー（日本語）
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL, -- 日本語名
    slug TEXT UNIQUE NOT NULL, -- URL用
    description TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ユースケース（メインテーブル）
CREATE TABLE IF NOT EXISTS use_cases (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category_id UUID REFERENCES categories(id),
    difficulty TEXT CHECK (difficulty IN ('初心者', '中級者', '上級者')),
    time_to_implement TEXT, -- "2-4時間" など
    roi_expected TEXT, -- "50%の時間節約" など
    estimated_cost TEXT CHECK (estimated_cost IN ('無料', '低価格', '中価格', '高価格', 'カスタム')),
    is_featured BOOLEAN DEFAULT false,
    popularity INTEGER DEFAULT 0,
    tags TEXT[], -- 日本語タグの配列
    industries TEXT[], -- 業界（日本語）
    user_roles TEXT[], -- ユーザー役割（日本語）
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 実装ステップ
CREATE TABLE IF NOT EXISTS implementation_steps (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    use_case_id UUID REFERENCES use_cases(id) ON DELETE CASCADE,
    step_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    code TEXT,
    duration TEXT, -- "30分" など
    difficulty TEXT CHECK (difficulty IN ('簡単', '普通', '難しい')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス（パフォーマンス向上）
CREATE INDEX IF NOT EXISTS idx_use_cases_category ON use_cases(category_id);
CREATE INDEX IF NOT EXISTS idx_use_cases_featured ON use_cases(is_featured);
CREATE INDEX IF NOT EXISTS idx_use_cases_popularity ON use_cases(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_implementation_steps_use_case ON implementation_steps(use_case_id, step_number);

-- パブリックデータ: 誰でも読み取り可能
CREATE POLICY "誰でもカテゴリーを表示" ON categories
    FOR SELECT USING (true);

CREATE POLICY "誰でもユースケースを表示" ON use_cases
    FOR SELECT USING (true);

CREATE POLICY "誰でも実装ステップを表示" ON implementation_steps
    FOR SELECT USING (true);

-- 更新日時の自動更新機能
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_use_cases_updated_at BEFORE UPDATE ON use_cases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 新規ユーザー登録時にプロフィール作成
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 初期データ（カテゴリー）
INSERT INTO categories (name, slug, description, icon) VALUES
('ビジネス自動化', 'business-automation', 'メール、CRM、タスク管理の自動化', '⚡'),
('コンテンツ作成', 'content-creation', 'ブログ、SNS、マーケティング素材の作成', '✍️'),
('データ分析', 'data-analysis', 'レポート作成、ダッシュボード、データ可視化', '📊'),
('カスタマーサービス', 'customer-service', 'チャットボット、問い合わせ対応、FAQ', '🎧'),
('開発', 'development', 'コードレビュー、テスト、ドキュメント作成', '💻'),
('研究', 'research', '情報収集、文献調査、データ収集', '🔬'),
('デザイン', 'design', 'ロゴ作成、UI/UX、ブランディング', '🎨'),
('ファイナンス', 'finance', '経理、予算管理、投資分析', '💰'),
('人事', 'hr', '採用、評価、研修管理', '👥'),
('セールス', 'sales', 'リード生成、営業支援、パイプライン管理', '📈')
ON CONFLICT (slug) DO NOTHING;