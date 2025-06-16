import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, BookOpen, User, LogOut, Settings, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AuthModal } from '@/components/auth/AuthModal';
import { useAuth } from '@/lib/hooks/useSupabase';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user, loading, signOut } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
  };

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <header className="bg-white border-b border-secondary-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-secondary-900">
                  AIナビゲーター
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-secondary-600 hover:text-secondary-900 transition-colors">
                ユースケース
              </Link>
              <Link href="/guides" className="text-secondary-600 hover:text-secondary-900 transition-colors">
                実装ガイド
              </Link>
              <Link href="/tools" className="text-secondary-600 hover:text-secondary-900 transition-colors">
                AIツール
              </Link>
            </nav>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8 hidden lg:block">
              <form onSubmit={handleSearch}>
                <Input
                  type="text"
                  placeholder="ユースケース、ツール、ガイドを検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="w-4 h-4 text-secondary-400" />}
                />
              </form>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {loading ? (
                <div className="w-8 h-8 animate-pulse bg-secondary-200 rounded-full"></div>
              ) : user ? (
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="hidden sm:block">
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                  </Button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-secondary-200 py-1 z-10">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        プロフィール
                      </Link>
                      <Link
                        href="/bookmarks"
                        className="flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Bookmark className="w-4 h-4 mr-2" />
                        ブックマーク
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        設定
                      </Link>
                      <div className="border-t border-secondary-200 my-1"></div>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        サインアウト
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={() => openAuthModal('signin')}>
                    サインイン
                  </Button>
                  <Button size="sm" onClick={() => openAuthModal('signup')}>
                    今すぐ始める
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden pb-4">
            <form onSubmit={handleSearch}>
              <Input
                type="text"
                placeholder="Search use cases, tools, or guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-4 h-4 text-secondary-400" />}
              />
            </form>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-secondary-200">
            <div className="px-4 py-3 space-y-3">
              <Link href="/" className="block text-secondary-600 hover:text-secondary-900 transition-colors">
                ユースケース
              </Link>
              <Link href="/guides" className="block text-secondary-600 hover:text-secondary-900 transition-colors">
                実装ガイド
              </Link>
              <Link href="/tools" className="block text-secondary-600 hover:text-secondary-900 transition-colors">
                AIツール
              </Link>
              
              {user ? (
                <div className="pt-3 border-t border-secondary-200 space-y-2">
                  <div className="flex items-center space-x-2 px-2 py-1">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="text-sm text-secondary-700">
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                  </div>
                  <Link
                    href="/profile"
                    className="block text-secondary-600 hover:text-secondary-900 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/bookmarks"
                    className="block text-secondary-600 hover:text-secondary-900 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Bookmarks
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left text-secondary-600 hover:text-secondary-900 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="pt-3 border-t border-secondary-200 space-y-2">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => openAuthModal('signin')}>
                    サインイン
                  </Button>
                  <Button size="sm" className="w-full" onClick={() => openAuthModal('signup')}>
                    今すぐ始める
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </>
  );
};