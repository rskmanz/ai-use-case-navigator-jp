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
            <p className="text-secondary-600">Loading AI use cases...</p>
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
                    Discover AI Solutions That Actually Work
                  </span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
                AI Use Case
                <span className="text-primary-600"> Navigator</span>
              </h1>
              
              <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto">
                Find practical AI use cases for your specific needs. Get step-by-step implementation guides, 
                MCP server configurations, and real-world examples to help you leverage AI effectively.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Use Cases
                  <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                </Button>
                <Button variant="outline" size="lg">
                  <Zap className="w-5 h-5 mr-2" />
                  MCP Playground
                </Button>
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
                <div className="text-secondary-600">Use Cases</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600">50+</div>
                <div className="text-secondary-600">AI Tools</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">15+</div>
                <div className="text-secondary-600">MCP Servers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">10+</div>
                <div className="text-secondary-600">Industries</div>
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
                Featured Use Cases
              </h2>
              <p className="text-secondary-600 max-w-2xl mx-auto">
                Our most popular and proven AI implementations. These use cases have been tested by 
                hundreds of users and deliver consistent results.
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
            <h3 className="text-2xl font-bold text-secondary-900 mb-6">Browse by Category</h3>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <Button
                variant={selectedCategory === 'all' ? 'primary' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className="flex items-center"
              >
                🌟 All Categories
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
                      {selectedCategory === 'all' ? 'All Use Cases' : formatCategoryLabel(selectedCategory)}
                    </h2>
                    <p className="text-secondary-600">
                      {filteredUseCases.length} use case{filteredUseCases.length !== 1 ? 's' : ''} found
                      {searchQuery && ` for "${searchQuery}"`}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="lg:hidden"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>

                {filteredUseCases.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                        No use cases found
                      </h3>
                      <p className="text-secondary-600 mb-4">
                        Try adjusting your filters or search query to find what you're looking for.
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
                            timeToImplement: []
                          });
                          setSelectedCategory('all');
                        }}
                      >
                        Clear all filters
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

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary-600 to-accent-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Workflow with AI?
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who are already using AI to automate tasks, 
                boost productivity, and achieve better results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  Get Started Free
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                  View MCP Playground
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
                <span className="text-xl font-bold text-white">AI Navigator</span>
              </div>
              <p className="text-secondary-400">
                Discover practical AI solutions with step-by-step implementation guides.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Use Cases</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Business Automation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Content Creation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Analysis</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Customer Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Implementation Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">MCP Playground</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Tools Directory</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Community</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-secondary-800 pt-8 mt-8 text-center">
            <p>&copy; 2024 AI Use Case Navigator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}