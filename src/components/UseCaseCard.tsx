import React from 'react';
import Link from 'next/link';
import { Clock, TrendingUp, Star, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { UseCase } from '@/types';
import { getDifficultyColor, getCategoryColor, truncateText, formatCost } from '@/lib/utils';

interface UseCaseCardProps {
  useCase: UseCase;
  compact?: boolean;
}

export const UseCaseCard: React.FC<UseCaseCardProps> = ({ useCase, compact = false }) => {
  const categoryFormatted = useCase.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const difficultyFormatted = useCase.difficulty.charAt(0).toUpperCase() + useCase.difficulty.slice(1);

  return (
    <Card hover className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant={getCategoryColor(useCase.category)} size="sm">
              {categoryFormatted}
            </Badge>
            <Badge variant={getDifficultyColor(useCase.difficulty)} size="sm">
              {difficultyFormatted}
            </Badge>
            {useCase.featured && (
              <Badge variant="warning" size="sm">
                <Star className="w-3 h-3 mr-1" />
                注目
              </Badge>
            )}
          </div>
          <div className="text-xs text-secondary-500 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            {useCase.popularity}%
          </div>
        </div>
        
        <CardTitle className="line-clamp-2">
          {useCase.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-secondary-600 mb-4 line-clamp-3">
          {compact ? truncateText(useCase.description, 120) : useCase.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-secondary-500">
            <Clock className="w-4 h-4 mr-2" />
            <span>{useCase.timeToImplement}</span>
          </div>
          <div className="flex items-center text-sm text-secondary-500">
            <TrendingUp className="w-4 h-4 mr-2" />
            <span>{useCase.roiExpected}</span>
          </div>
          <div className="text-sm text-secondary-500">
            <span className="font-medium">コスト: </span>
            {formatCost(useCase.estimatedCost)}
          </div>
        </div>

        {!compact && (
          <>
            {/* Tools */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-secondary-700 mb-2">主要ツール:</h4>
              <div className="flex flex-wrap gap-1">
                {useCase.tools.slice(0, 3).map((tool) => (
                  <Badge key={tool.id} variant="secondary" size="sm">
                    {tool.name}
                  </Badge>
                ))}
                {useCase.tools.length > 3 && (
                  <Badge variant="secondary" size="sm">
                    +{useCase.tools.length - 3}個
                  </Badge>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {useCase.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-secondary-50 text-secondary-600 rounded"
                  >
                    #{tag}
                  </span>
                ))}
                {useCase.tags.length > 4 && (
                  <span className="px-2 py-1 text-xs bg-secondary-50 text-secondary-600 rounded">
                    +{useCase.tags.length - 4}
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>

      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <div className="text-xs text-secondary-500">
            {useCase.steps.length}ステップ
          </div>
          <Link href={`/use-cases/${useCase.id}`}>
            <Button size="sm" className="group">
              ガイドを見る
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};