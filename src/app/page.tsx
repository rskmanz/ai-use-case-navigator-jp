'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles, TrendingUp, BookOpen, Zap, Filter } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { UseCaseCard } from '@/components/UseCaseCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { fetchUseCases, fetchFeaturedUseCases } from '@/lib/api/useCases';
import { analytics } from '@/lib/analytics';
import { useAuth } from '@/lib/hooks/useSupabase';
import { UseCase, UseCaseFilter, UseCaseCategory, DifficultyLevel } from '@/types';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<UseCaseFilter>({
    categories: [],
    difficulties: [],
    industries: [],
    userRoles: [],
    tools: [],
    timeToImplement: [],
    featured: false,
    searchQuery: ''
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<UseCaseCategory | 'all'>('all');
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [featuredUseCases, setFeaturedUseCases] = useState<UseCase[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth();

  useEffect(() => {
    loadData();
    // Track page view
    analytics.pageView('homepage', user?.id);
  }, [user]);

  const loadData = async () => {
    try {
      const [allUseCases, featured] = await Promise.all([
        fetchUseCases(),
        fetchFeaturedUseCases()
      ]);
      setUseCases(allUseCases);
      setFeaturedUseCases(featured);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Track search with results count
    setTimeout(() => {
      const resultsCount = filteredUseCases.length;
      analytics.search(query, resultsCount, user?.id);
    }, 100);
  };

  const filteredUseCases = useMemo(() => {
    let filtered = useCases;

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(useCase =>
        useCase.title.toLowerCase().includes(query) ||
        useCase.description.toLowerCase().includes(query) ||
        useCase.tags.some(tag => tag.toLowerCase().includes(query)) ||
        useCase.tools.some(tool => tool.name.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(useCase => useCase.category === selectedCategory);
    }

    // Apply other filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter(useCase => filters.categories.includes(useCase.category));
    }

    if (filters.difficulties.length > 0) {
      filtered = filtered.filter(useCase => filters.difficulties.includes(useCase.difficulty));
    }

    if (filters.industries.length > 0) {
      filtered = filtered.filter(useCase => 
        useCase.industry.some(industry => filters.industries.includes(industry))
      );
    }

    if (filters.userRoles.length > 0) {
      filtered = filtered.filter(useCase => 
        useCase.userRoles.some(role => filters.userRoles.includes(role))
      );
    }

    if (filters.featured) {
      filtered = filtered.filter(useCase => useCase.featured);
    }

    return filtered.sort((a, b) => b.popularity - a.popularity);
  }, [useCases, searchQuery, selectedCategory, filters]);

  const categories = Object.values(UseCaseCategory);

  const formatCategoryLabel = (category: string) => {
    return category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getCategoryIcon = (category: UseCaseCategory) => {
    const iconMap = {
      [UseCaseCategory.BUSINESS_AUTOMATION]: '⚡',
      [UseCaseCategory.CONTENT_CREATION]: '✍️',
      [UseCaseCategory.DATA_ANALYSIS]: '📊',
      [UseCaseCategory.CUSTOMER_SERVICE]: '🎧',
      [UseCaseCategory.DEVELOPMENT]: '💻',
      [UseCaseCategory.RESEARCH]: '🔬',
      [UseCaseCategory.DESIGN]: '🎨',
      [UseCaseCategory.FINANCE]: '💰',
      [UseCaseCategory.HR]: '👥',
      [UseCaseCategory.SALES]: '📈'
    };
    return iconMap[category] || '🤖';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50">
        <Header onSearch={handleSearch} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-secondary-600">AIユースケースを読み込み中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <Header onSearch={handleSearch} />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-accent-50 border-b border-secondary-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm border border-primary-200">
                  <Sparkles className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium text-primary-700">
                    実際に使えるAIソリューション
                  </span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
                AI ユースケース
                <span className="text-primary-600"> ナビゲーター</span>
              </h1>
              <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto">
                あなたのニーズに合った実用的なAIユースケースを見つけて、
                ステップバイステップで実装しましょう。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group">
                  <BookOpen className="w-5 h-5 mr-2" />
                  ユースケースを探索
                  <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                </Button>
                <Button variant="outline" size="lg">
                  <Zap className="w-5 h-5 mr-2" />
                  MCPプレイグラウンド
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* MCP Ecosystem Diagram Section */}
        <section className="bg-white border-b border-secondary-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                <Zap className="w-8 h-8 inline-block mr-2 text-accent-600" />
                MCPエコシステム構成図
              </h2>
              <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
                Claude Code、Claude Desktop、MCPが実現する新しいAI活用の可能性
              </p>
            </div>

            {/* MCP Ecosystem Illustration */}
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 rounded-2xl p-8 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                
                {/* MCP Clients */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-blue-900 text-center mb-6">MCP Client</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-200 group hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-blue-900">Claude Code</div>
                          <div className="text-sm text-blue-600">開発環境AI</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-200 group hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-blue-900">Claude Desktop</div>
                          <div className="text-sm text-blue-600">デスクトップAI</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-200 group hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-7.5 3.5h2v2h-2v-2zm0 3h2v2h-2v-2zm-3-3h2v2h-2v-2zm0 3h2v2h-2v-2z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-blue-900">Windows Surface</div>
                          <div className="text-sm text-blue-600">デバイス例</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MCP Protocol */}
                <div className="text-center">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    
                    {/* Connection lines */}
                    <div className="hidden lg:block absolute top-16 left-full w-16 h-0.5 bg-purple-300 animate-pulse"></div>
                    <div className="hidden lg:block absolute top-16 right-full w-16 h-0.5 bg-purple-300 animate-pulse"></div>
                    
                    <h3 className="text-2xl font-bold text-purple-900 mb-2">MCP</h3>
                    <p className="text-purple-700 font-medium">Model Context Protocol</p>
                    <div className="mt-4 bg-purple-100 rounded-lg p-3">
                      <div className="text-2xl font-bold text-purple-600">∞</div>
                      <div className="text-sm text-purple-700">無限の連携</div>
                    </div>
                  </div>
                </div>

                {/* MCP Servers */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-green-900 text-center mb-6">MCP Server</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-green-200 group hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3.064 7.51A9.996 9.996 0 0112 2c2.695 0 4.959.99 6.69 2.605l-2.867.802A6.5 6.5 0 0012 4.5c-1.777 0-3.418.68-4.64 1.91L3.064 7.51z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-green-900">Google Workspace</div>
                          <div className="text-sm text-green-600">Gmail, Drive, Docs</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-green-200 group hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-green-900">GitHub</div>
                          <div className="text-sm text-green-600">コード管理</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-green-200 group hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l.537-.039c.15-.013.27-.133.27-.284V2.8c0-.424.349-.772.772-.772h.926c.424 0 .772.348.772.772v1.555c0 .151.12.271.27.284l.543.04c1.401.094 1.681.14 2.427-.466C13.532 3.593 14.981 3.04 16.2 4.46c1.022 1.198.17 2.426-.618 3.242l-.442.459c-.107.112-.107.291 0 .403l.442.459c.789.816 1.64 2.044.618 3.242-1.219 1.42-2.668.867-3.796.247-.746-.606-1.026-.56-2.428-.466l-.537.039c-.15.013-.27.133-.27.284v1.555c0 .424-.349.772-.772.772h-.926a.772.772 0 0 1-.772-.772v-1.555c0-.151-.12-.271-.27-.284l-.543-.04c-1.401-.094-1.681-.14-2.427.466-1.128.62-2.577 1.173-3.796-.247-1.022-1.198-.17-2.426.618-3.242l.442-.459c.107-.112.107-.291 0-.403l-.442-.459C-.451 9.929-1.299 8.701-.277 7.503c1.219-1.42 2.668-.867 3.796-.247l-.06-.048z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-green-900">その他API</div>
                          <div className="text-sm text-green-600">Notion, Zapier等</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white border-b border-secondary-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">{useCases.length}+</div>
                <div className="text-secondary-600">ユースケース</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600">50+</div>
                <div className="text-secondary-600">AIツール</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">10+</div>
                <div className="text-secondary-600">業界</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">10+</div>
                <div className="text-secondary-600">業界</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Use Cases */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                <TrendingUp className="w-8 h-8 inline-block mr-2 text-primary-600" />
                注目のユースケース
              </h2>
              <p className="text-secondary-600 max-w-2xl mx-auto">
                最も人気があり、実証済みのAI実装。これらのユースケースは
                数百人のユーザーによってテストされ、一貫した結果を提供します。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {featuredUseCases.slice(0, 3).map((useCase) => (
                <UseCaseCard key={useCase.id} useCase={useCase} />
              ))}
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="bg-white border-y border-secondary-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h3 className="text-2xl font-bold text-secondary-900 mb-6">カテゴリーで探す</h3>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <Button
                variant={selectedCategory === 'all' ? 'primary' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className="flex items-center"
              >
                🌟 すべてのカテゴリー
              </Button>
              
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center"
                >
                  <span className="mr-2">{getCategoryIcon(category)}</span>
                  {formatCategoryLabel(category)}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              <FilterSidebar
                filters={filters}
                onFiltersChange={setFilters}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />

              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-secondary-900">
                      {selectedCategory === 'all' ? 'すべてのユースケース' : formatCategoryLabel(selectedCategory)}
                    </h2>
                    <p className="text-secondary-600">
                      {filteredUseCases.length}件のユースケースが見つかりました
                      {searchQuery && ` （検索: "${searchQuery}"）`}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="lg:hidden"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    フィルター
                  </Button>
                </div>

                {filteredUseCases.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                        ユースケースが見つかりません
                      </h3>
                      <p className="text-secondary-600 mb-4">
                        フィルターや検索条件を変更して、お探しのものを見つけてください。
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSearchQuery('');
                          setFilters({
                            categories: [],
                            difficulties: [],
                            industries: [],
                            userRoles: [],
                            tools: [],
                            timeToImplement: [],
                            featured: false,
                            searchQuery: ''
                          });
                          setSelectedCategory('all');
                        }}
                      >
                        すべてのフィルターをクリア
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredUseCases.map((useCase) => (
                      <UseCaseCard key={useCase.id} useCase={useCase} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* AI Navigator Steps Timeline */}
        <section className="bg-secondary-50 border-b border-secondary-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                <BookOpen className="w-8 h-8 inline-block mr-2 text-primary-600" />
                AIナビゲーター 5ステップ
              </h2>
              <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
                業務にAIを導入するための体系的なアプローチ
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-primary-200"></div>
                
                {/* Step 1 */}
                <div className="relative flex items-start mb-12">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl relative z-10">
                    1
                  </div>
                  <div className="ml-8 flex-1">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">📋 業務内容の明確化</h3>
                      <p className="text-secondary-600 mb-3">
                        現在の業務プロセス、課題、目標を整理して、AI導入の目的を明確にします
                      </p>
                      <div className="text-sm text-primary-600 font-medium">
                        所要時間: 30分 | 難易度: 簡単
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-start mb-12">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white font-bold text-xl relative z-10">
                    2
                  </div>
                  <div className="ml-8 flex-1">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">🔍 ユースケース調査</h3>
                      <p className="text-secondary-600 mb-3">
                        あなたの業務に最適なAIユースケースを見つけて、実装方法を学習します
                      </p>
                      <div className="text-sm text-accent-600 font-medium">
                        所要時間: 1-2時間 | 難易度: 簡単
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-start mb-12">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl relative z-10">
                    3
                  </div>
                  <div className="ml-8 flex-1">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">🚀 AI導入実行</h3>
                      <p className="text-secondary-600 mb-3">
                        ステップバイステップガイドに従って、実際にAIツールを導入・設定します
                      </p>
                      <div className="text-sm text-green-600 font-medium">
                        所要時間: 2-8時間 | 難易度: 普通
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative flex items-start mb-12">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl relative z-10">
                    4
                  </div>
                  <div className="ml-8 flex-1">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">⚙️ 技術設定・連携</h3>
                      <p className="text-secondary-600 mb-3">
                        MCP、API設定など、システム間の連携を構築して自動化を実現します
                      </p>
                      <div className="text-sm text-purple-600 font-medium">
                        所要時間: 1-3時間 | 難易度: 難しい
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="relative flex items-start mb-8">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl relative z-10">
                    5
                  </div>
                  <div className="ml-8 flex-1">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">📊 効果測定・改善</h3>
                      <p className="text-secondary-600 mb-3">
                        導入効果を測定し、継続的な改善でAI活用の価値を最大化します
                      </p>
                      <div className="text-sm text-orange-600 font-medium">
                        所要時間: 継続的 | 難易度: 普通
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support CTA */}
              <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-8 border border-primary-200">
                  <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                    🤝 サポートが必要ですか？
                  </h3>
                  <p className="text-secondary-600 mb-6">
                    どのステップでお困りでも、専門コンサルタントがサポートします
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="primary" size="lg">
                      💬 無料相談を予約
                    </Button>
                    <Button variant="outline" size="lg">
                      📋 サブスクリプションプラン
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary-600 to-accent-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                AIでワークフローを変革する準備はできましたか？
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                すでにAIを使ってタスクを自動化し、生産性を向上させ、
                より良い結果を達成している数千人のプロフェッショナルに加わりましょう。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  無料で始める
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                  ツールを探す
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary-900 text-secondary-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AIナビゲーター</span>
              </div>
              <p className="text-secondary-400">
                ステップバイステップの実装ガイドで実用的なAIソリューションを発見。
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">ユースケース</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">ビジネス自動化</a></li>
                <li><a href="#" className="hover:text-white transition-colors">コンテンツ作成</a></li>
                <li><a href="#" className="hover:text-white transition-colors">データ分析</a></li>
                <li><a href="#" className="hover:text-white transition-colors">カスタマーサービス</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">リソース</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">実装ガイド</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AIツールディレクトリ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AIツールディレクトリ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ドキュメント</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">コミュニティ</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ニュースレター</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-secondary-800 pt-8 mt-8 text-center">
            <p>&copy; 2024 AIユースケースナビゲーター. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}