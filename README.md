# AIユースケースナビゲーター

特定のビジネスニーズに対するAIソリューションを発見、理解、実装するための包括的なWebアプリケーション。Next.js、TypeScript、Tailwind CSSで構築されています。

## 🚀 機能

### 🔍 ユースケース探索
- **包括的なデータベース**: 10以上の業界にわたる100以上の実世界AIユースケース
- **高度なフィルタリング**: カテゴリー、難易度、業界、ユーザー役割などでフィルター
- **スマート検索**: キーワード、ツール、ビジネス目標でユースケースを検索
- **人気ランキング**: 最も成功している実装を発見

### 📚 実装ガイド
- **ステップバイステップ説明**: 各ユースケースの詳細な実装ガイド
- **コード例**: すぐに使えるコードスニペットと設定ファイル
- **ツール推奨**: 価格と機能を含むAIツールの厳選リスト
- **進捗追跡**: 実装の進捗を追跡
- **リソースリンク**: ドキュメント、チュートリアル、ツールへの直接リンク

### ⚡ MCPプレイグラウンド
- **インタラクティブ設定**: MCPサーバー設定を視覚的に構築
- **15以上のMCPサーバー**: 公式およびコミュニティ製サーバー
- **自動生成設定**: すぐに使えるClaude Desktop設定ファイルをダウンロード
- **ライブテスト**: サーバーの組み合わせをリアルタイムでテスト
- **セットアップ手順**: 異なるプラットフォーム向けの完全なセットアップガイド

### 🎯 スマート推奨
- **パーソナライズされた提案**: 役割と業界に合わせたユースケースを取得
- **クイックスタートテンプレート**: 一般的なシナリオ向けの事前設定済みワークフロー
- **ROI推定**: 期待される時間節約とビジネスへの影響
- **難易度評価**: 実装の複雑さの明確な指標

## 🛠 技術スタック

- **フロントエンド**: Next.js 15, React 18, TypeScript
- **スタイリング**: カスタムデザインシステムを含むTailwind CSS
- **アイコン**: Lucide React
- **開発**: ホットリロード、TypeScript strictモード
- **ビルド**: Next.jsで最適化されたプロダクションビルド

## 🏗 プロジェクト構造

```
ai-use-case-navigator/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── use-cases/[id]/    # Use case detail pages
│   │   └── mcp-playground/    # MCP configuration tool
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Basic UI components
│   │   ├── layout/           # Layout components
│   │   ├── UseCaseCard.tsx   # Use case display component
│   │   ├── MCPServerCard.tsx # MCP server component
│   │   └── FilterSidebar.tsx # Advanced filtering
│   ├── data/                 # Static data and content
│   │   ├── useCases.ts       # Use case database
│   │   └── mcpServers.ts     # MCP server database
│   ├── lib/                  # Utility functions
│   │   └── utils.ts          # Helper utilities
│   └── types/                # TypeScript type definitions
│       └── index.ts          # Core type definitions
├── public/                   # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── next.config.ts           # Next.js configuration
└── tsconfig.json           # TypeScript configuration
```

## 📊 コンテンツデータベース

### ユースケース (100+)
- **ビジネス自動化**: メールワークフロー、CRM自動化、タスク管理
- **コンテンツ作成**: ブログ執筆、ソーシャルメディア、マーケティングコピー
- **データ分析**: ダッシュボード自動化、レポート作成、視覚化
- **カスタマーサービス**: チャットボット、チケットルーティング、ナレッジベース
- **開発**: コードレビュー、ドキュメンテーション、テスト
- **研究**: 文献レビュー、データ収集、分析
- **デザイン**: アセット生成、ブランド一貫性、プロトタイピング
- **ファイナンス**: 簿記、予測、コンプライアンス
- **HR**: 採用、オンボーディング、パフォーマンス追跡
- **セールス**: リード生成、プロスペクティング、パイプライン管理

### MCPサーバー (15+)
- **公式サーバー**: GitHub, Filesystem, Memory, PostgreSQL, Puppeteer
- **コミュニティサーバー**: Slack, Google Drive, Firecrawl, Todoist, MySQL
- **カテゴリー**: データベース、Webスクレイピング、API統合、開発、コミュニケーション

### ツール＆技術 (50+)
- **AIアシスタント**: ChatGPT, Claude, Jasper, Copy.ai
- **自動化**: Zapier, Make, n8n, Microsoft Power Automate
- **CRM**: HubSpot, Salesforce, Pipedrive, Zendesk
- **分析**: Tableau, Power BI, Google Analytics, Mixpanel
- **開発**: GitHub Copilot, Cursor, Tabnine, CodeWhisperer

## 🚀 はじめ方

### 前提条件
- Node.js 18+とnpm
- 最新のWebブラウザ
- バージョン管理用のGit

### インストール

1. **リポジトリをクローン**
   ```bash
   git clone https://github.com/your-username/ai-use-case-navigator.git
   cd ai-use-case-navigator
   ```

2. **依存関係をインストール**
   ```bash
   npm install
   ```

3. **開発サーバーを起動**
   ```bash
   npm run dev
   ```

4. **ブラウザを開く**
   ```
   http://localhost:3000
   ```

### プロダクション用ビルド

```bash
# 最適化されたプロダクションビルドを作成
npm run build

# プロダクションサーバーを起動
npm start
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones for actions and highlights
- **Secondary**: Gray tones for text and borders
- **Accent**: Orange tones for emphasis and warnings
- **Success**: Green for positive actions
- **Warning**: Yellow for cautions
- **Danger**: Red for errors and advanced difficulty

### Typography
- **Font Family**: Inter (sans-serif), JetBrains Mono (code)
- **Scale**: Responsive typography with consistent spacing
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Consistent shadow and border radius
- **Buttons**: Multiple variants with hover states
- **Badges**: Color-coded information indicators
- **Forms**: Accessible inputs with validation states

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:

```env
# API Keys (if needed for future features)
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
NEXT_PUBLIC_API_BASE_URL=your_api_url
```

### Tailwind Customization
Modify `tailwind.config.ts` to customize the design system:

```typescript
// Add custom colors, fonts, or spacing
extend: {
  colors: {
    // Custom color palette
  },
  fontFamily: {
    // Custom fonts
  }
}
```

## 📈 Performance Features

- **Static Generation**: Pre-built pages for optimal loading
- **Image Optimization**: Automatic image optimization with Next.js
- **Code Splitting**: Automatic code splitting for faster loads
- **Responsive Design**: Mobile-first responsive layouts
- **SEO Optimized**: Meta tags, structured data, and sitemap

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Add new use cases to `src/data/useCases.ts`
   - Add new MCP servers to `src/data/mcpServers.ts`
   - Update components and styling as needed
4. **Test your changes**
   ```bash
   npm run dev
   npm run build
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Content Contributions
We welcome contributions of:
- New AI use cases with implementation guides
- Additional MCP servers and configurations
- Tool reviews and recommendations
- Industry-specific examples
- Translation and localization

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Anthropic** for the Model Context Protocol and Claude
- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon library
- **Community Contributors** for use case submissions and feedback

## 📞 Support

- **Documentation**: [Full documentation](docs/)
- **Issues**: [GitHub Issues](https://github.com/your-username/ai-use-case-navigator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/ai-use-case-navigator/discussions)
- **Email**: support@ai-navigator.com

---

**Built with ❤️ for the AI community**

Helping businesses discover and implement practical AI solutions, one use case at a time.