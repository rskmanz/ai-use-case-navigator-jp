import React from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { UseCaseCategory, DifficultyLevel, Industry, UserRole, UseCaseFilter } from '@/types';

interface FilterSidebarProps {
  filters: UseCaseFilter;
  onFiltersChange: (filters: UseCaseFilter) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFiltersChange,
  isOpen,
  onToggle
}) => {
  const categories = Object.values(UseCaseCategory);
  const difficulties = Object.values(DifficultyLevel);
  const industries = Object.values(Industry);
  const userRoles = Object.values(UserRole);

  const updateFilter = <K extends keyof UseCaseFilter>(
    key: K,
    value: UseCaseFilter[K]
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const toggleArrayFilter = <T extends string>(
    key: keyof UseCaseFilter,
    value: T,
    currentArray: T[]
  ) => {
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray as any);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      difficulties: [],
      industries: [],
      userRoles: [],
      tools: [],
      timeToImplement: []
    });
  };

  const hasActiveFilters = 
    filters.categories.length > 0 ||
    filters.difficulties.length > 0 ||
    filters.industries.length > 0 ||
    filters.userRoles.length > 0 ||
    filters.tools.length > 0 ||
    filters.timeToImplement.length > 0;

  const formatLabel = (value: string) => {
    return value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (!isOpen) {
    return (
      <div className="lg:w-64 flex-shrink-0">
        <Button
          variant="outline"
          onClick={onToggle}
          className="lg:hidden mb-4"
        >
          <Filter className="w-4 h-4 mr-2" />
          フィルター
          {hasActiveFilters && (
            <Badge variant="primary" size="sm" className="ml-2">
              {filters.categories.length + filters.difficulties.length + filters.industries.length + filters.userRoles.length}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="lg:w-64 flex-shrink-0">
      <div className="bg-white border border-secondary-200 rounded-lg p-4 sticky top-20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-secondary-900 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            フィルター
          </h3>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                クリア
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onToggle} className="lg:hidden">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h4 className="font-medium text-secondary-800 mb-2">カテゴリー</h4>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => toggleArrayFilter('categories', category, filters.categories)}
                    className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-secondary-600">
                    {formatLabel(category)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <h4 className="font-medium text-secondary-800 mb-2">難易度</h4>
            <div className="space-y-2">
              {difficulties.map(difficulty => (
                <label key={difficulty} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.difficulties.includes(difficulty)}
                    onChange={() => toggleArrayFilter('difficulties', difficulty, filters.difficulties)}
                    className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-secondary-600">
                    {formatLabel(difficulty)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-medium text-secondary-800 mb-2">業界</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {industries.map(industry => (
                <label key={industry} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.industries.includes(industry)}
                    onChange={() => toggleArrayFilter('industries', industry, filters.industries)}
                    className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-secondary-600">
                    {formatLabel(industry)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* User Roles */}
          <div>
            <h4 className="font-medium text-secondary-800 mb-2">ユーザー役割</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {userRoles.map(role => (
                <label key={role} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.userRoles.includes(role)}
                    onChange={() => toggleArrayFilter('userRoles', role, filters.userRoles)}
                    className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-secondary-600">
                    {formatLabel(role)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Time to Implement */}
          <div>
            <h4 className="font-medium text-secondary-800 mb-2">実装時間</h4>
            <div className="space-y-2">
              {['、1時間未満', '1-4時間', '1-2日', '3日以上'].map(time => (
                <label key={time} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.timeToImplement.includes(time)}
                    onChange={() => toggleArrayFilter('timeToImplement', time, filters.timeToImplement)}
                    className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-secondary-600">
                    {time}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Featured */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.featured || false}
                onChange={(e) => updateFilter('featured', e.target.checked)}
                className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-secondary-600">
                注目のみ
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};