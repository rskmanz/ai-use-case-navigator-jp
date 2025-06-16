import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AIユースケースナビゲーター - AIソリューションの発見、学習、実装',
  description: 'ビジネスニーズに合った実用的なAIユースケースを見つけましょう。ステップバイステップの実装ガイド、MCPサーバー設定、実例でAIを効果的に活用。',
  keywords: 'AIユースケース, 人工知能, ビジネス自動化, MCPサーバー, 実装ガイド, AIツール',
  authors: [{ name: 'AIナビゲーターチーム' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'AIユースケースナビゲーター',
    description: 'ステップバイステップの実装ガイドでビジネス向け実用AIソリューションを発見',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIユースケースナビゲーター',
    description: 'ステップバイステップの実装ガイドでビジネス向け実用AIソリューションを発見',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-secondary-50 text-secondary-900 antialiased">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}