-- サンプルデータ（日本語対応）

-- ユースケースのサンプルデータ
INSERT INTO use_cases (
    id,
    title,
    description,
    category_id,
    difficulty,
    time_to_implement,
    roi_expected,
    estimated_cost,
    is_featured,
    popularity,
    tags,
    industries,
    user_roles
) VALUES
(
    'email-automation-japanese',
    'メール自動化で営業効率3倍アップ',
    '顧客の行動に応じて自動でメールを送信し、フォローアップを自動化します。営業チームの作業時間を大幅に削減しながら、コンバージョン率を向上させます。',
    (SELECT id FROM categories WHERE slug = 'business-automation'),
    '初心者',
    '2-4時間',
    '50%の時間節約、25%のコンバージョン率向上',
    '低価格',
    true,
    95,
    ARRAY['メール', '自動化', 'CRM', 'リード育成', 'コンバージョン'],
    ARRAY['マーケティング', '営業', 'スタートアップ'],
    ARRAY['マーケティング担当者', '営業担当者', '起業家']
),
(
    'chatbot-customer-support',
    'AIチャットボットで24時間カスタマーサポート',
    '問い合わせの80%を自動対応するAIチャットボットを導入。夜間や休日でも顧客対応が可能になり、サポートチームの負荷を大幅に軽減します。',
    (SELECT id FROM categories WHERE slug = 'customer-service'),
    '中級者',
    '1-2日',
    '60%のサポートコスト削減、顧客満足度20%向上',
    '中価格',
    true,
    88,
    ARRAY['チャットボット', 'AI', '顧客対応', '自動化', 'FAQ'],
    ARRAY['Eコマース', 'SaaS', 'サービス業'],
    ARRAY['カスタマーサポート', 'プロダクトマネージャー', '経営者']
),
(
    'content-creation-automation',
    'SNS投稿を自動生成・予約投稿',
    'ブログ記事からSNS用のコンテンツを自動生成し、最適なタイミングで予約投稿。一度の作業で複数のプラットフォームに展開できます。',
    (SELECT id FROM categories WHERE slug = 'content-creation'),
    '初心者',
    '3-5時間',
    '70%の投稿作業時間削減、エンゲージメント30%向上',
    '低価格',
    false,
    76,
    ARRAY['SNS', 'コンテンツ作成', '自動投稿', 'マーケティング'],
    ARRAY['マーケティング', 'メディア', 'スタートアップ'],
    ARRAY['マーケティング担当者', 'コンテンツクリエイター', 'SNS担当者']
),
(
    'data-dashboard-automation',
    '売上ダッシュボードの自動更新システム',
    '複数のデータソースから自動でデータを収集し、リアルタイムでダッシュボードを更新。毎日の売上レポート作成作業を完全自動化します。',
    (SELECT id FROM categories WHERE slug = 'data-analysis'),
    '上級者',
    '1週間',
    '90%のレポート作成時間削減、意思決定スピード向上',
    '中価格',
    true,
    82,
    ARRAY['ダッシュボード', 'データ分析', '自動化', 'BI', 'レポート'],
    ARRAY['Eコマース', '小売業', 'SaaS'],
    ARRAY['データアナリスト', '経営者', 'プロダクトマネージャー']
);

-- 実装ステップのサンプルデータ
INSERT INTO implementation_steps (
    use_case_id,
    step_number,
    title,
    description,
    code,
    duration,
    difficulty
) VALUES
-- メール自動化のステップ
(
    'email-automation-japanese',
    1,
    'HubSpotアカウントの設定',
    'HubSpotの無料アカウントを作成し、基本的なCRM設定を行います。連絡先リストのインポートとメールテンプレートの作成を行います。',
    NULL,
    '30分',
    '簡単'
),
(
    'email-automation-japanese',
    2,
    'メール自動化ワークフローの作成',
    'トリガー条件（フォーム送信、ページ訪問など）を設定し、自動送信するメールの内容とタイミングを設定します。',
    'trigger: form_submit
action: send_email
delay: 1 hour
template: welcome_email',
    '1時間',
    '普通'
),
(
    'email-automation-japanese',
    3,
    'テストと最適化',
    'テスト用のメールアドレスで自動化の動作を確認し、開封率やクリック率を測定して改善を行います。',
    NULL,
    '1時間',
    '簡単'
),
-- チャットボットのステップ
(
    'chatbot-customer-support',
    1,
    'チャットボットプラットフォームの選択',
    'Dialogflow、Chatfuel、ManyChat等のプラットフォームを比較検討し、要件に最適なものを選択します。',
    NULL,
    '2時間',
    '普通'
),
(
    'chatbot-customer-support',
    2,
    'FAQ対応の設定',
    'よくある質問とその回答を整理し、チャットボットに学習させます。自然言語処理の精度を向上させるため、複数の表現パターンを登録します。',
    'intents:
  - name: "商品について"
    examples:
      - "商品の詳細を教えて"
      - "価格はいくらですか"
    response: "商品ページをご確認ください..."',
    '4時間',
    '普通'
),
(
    'chatbot-customer-support',
    3,
    '有人対応へのエスカレーション設定',
    'チャットボットで解決できない問い合わせを人間のオペレーターに引き継ぐ仕組みを構築します。',
    NULL,
    '2時間',
    '難しい'
);

