'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Clock, 
  TrendingUp, 
  Star, 
  CheckCircle, 
  Circle, 
  ExternalLink,
  Copy,
  Download,
  PlayCircle,
  Code,
  Video,
  FileText,
  Globe,
  Calendar,
  User
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCases } from '@/data/useCases';
import { getDifficultyColor, getCategoryColor, formatCost } from '@/lib/utils';

interface UseCaseDetailPageProps {
  params: {
    id: string;
  };
}

export default function UseCaseDetailPage({ params }: UseCaseDetailPageProps) {
  const useCase = useCases.find(uc => uc.id === params.id);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  if (!useCase) {
    notFound();
  }

  const toggleStepCompletion = (stepId: string) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const categoryFormatted = useCase.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const difficultyFormatted = useCase.difficulty.charAt(0).toUpperCase() + useCase.difficulty.slice(1);

  return (
    <div className="min-h-screen bg-secondary-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-secondary-600 mb-8">
          <Link href="/" className="hover:text-secondary-900 transition-colors">
            ユースケース
          </Link>
          <span>/</span>
          <span className="text-secondary-900">{useCase.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                ユースケース一覧に戻る
              </Link>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant={getCategoryColor(useCase.category)}>
                  {categoryFormatted}
                </Badge>
                <Badge variant={getDifficultyColor(useCase.difficulty)}>
                  {difficultyFormatted}
                </Badge>
                {useCase.featured && (
                  <Badge variant="warning">
                    <Star className="w-3 h-3 mr-1" />
                    注目
                  </Badge>
                )}
                <Badge variant="default">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  人気度 {useCase.popularity}%
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                {useCase.title}
              </h1>

              <p className="text-lg text-secondary-600 mb-6">
                {useCase.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-secondary-400 mr-2" />
                  <div>
                    <div className="text-sm text-secondary-500">実装時間</div>
                    <div className="font-medium">{useCase.timeToImplement}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 text-secondary-400 mr-2" />
                  <div>
                    <div className="text-sm text-secondary-500">期待ROI</div>
                    <div className="font-medium">{useCase.roiExpected}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 text-secondary-400 mr-2 flex items-center justify-center">💰</div>
                  <div>
                    <div className="text-sm text-secondary-500">推定コスト</div>
                    <div className="font-medium">{formatCost(useCase.estimatedCost)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Implementation Steps */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                実装ガイド
              </h2>

              <div className="space-y-6">
                {useCase.steps.map((step, index) => (
                  <Card key={step.id} className={`transition-all duration-200 ${
                    activeStep === index ? 'ring-2 ring-primary-500 shadow-md' : ''
                  }`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <button
                            onClick={() => toggleStepCompletion(step.id)}
                            className="mt-1 text-primary-600 hover:text-primary-700"
                          >
                            {completedSteps.includes(step.id) ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : (
                              <Circle className="w-6 h-6" />
                            )}
                          </button>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm font-medium text-primary-600">
                                ステップ {index + 1}
                              </span>
                              <Badge variant={getDifficultyColor(step.difficulty)} size="sm">
                                {step.difficulty}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg">
                              {step.title}
                            </CardTitle>
                          </div>
                        </div>
                        <div className="text-sm text-secondary-500 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {step.duration}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-secondary-600 mb-4">
                        {step.description}
                      </p>

                      {step.prerequisites.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-secondary-800 mb-2">前提条件:</h4>
                          <ul className="list-disc list-inside text-sm text-secondary-600 space-y-1">
                            {step.prerequisites.map((prereq, i) => (
                              <li key={i}>{prereq}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {step.code && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-secondary-800">コード例:</h4>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => copyToClipboard(step.code!)}
                            >
                              <Copy className="w-4 h-4 mr-1" />
                              コピー
                            </Button>
                          </div>
                          <pre className="bg-secondary-900 text-secondary-100 p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{step.code}</code>
                          </pre>
                        </div>
                      )}

                      {step.resources.length > 0 && (
                        <div>
                          <h4 className="font-medium text-secondary-800 mb-2">リソース:</h4>
                          <div className="space-y-2">
                            {step.resources.map((resource, i) => (
                              <a
                                key={i}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-primary-600 hover:text-primary-700 text-sm"
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                {resource.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>

                    <CardFooter>
                      <Button
                        variant={activeStep === index ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setActiveStep(index)}
                      >
                        {activeStep === index ? '現在のステップ' : 'このステップに集中'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            {/* External Resources */}
            {useCase.externalResources && useCase.externalResources.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                  外部ツール・サービス
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {useCase.externalResources.map((resource) => (
                    <Card key={resource.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Globe className="w-5 h-5 text-primary-600" />
                            <Badge variant={resource.isPaid ? 'warning' : 'success'} size="sm">
                              {resource.isPaid ? '有料' : '無料'}
                            </Badge>
                          </div>
                          {resource.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-secondary-600">{resource.rating}</span>
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold text-secondary-900 mb-2">{resource.title}</h3>
                        <p className="text-sm text-secondary-600 mb-3">{resource.description}</p>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          サイトを見る
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Related Videos */}
            {useCase.relatedVideos && useCase.relatedVideos.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                  関連動画
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {useCase.relatedVideos.map((video) => (
                    <Card key={video.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                              <Video className="w-6 h-6 text-red-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-secondary-900 mb-2 line-clamp-2">
                              {video.title}
                            </h3>
                            <p className="text-sm text-secondary-600 mb-3 line-clamp-2">
                              {video.description}
                            </p>
                            <div className="flex items-center justify-between text-sm text-secondary-500 mb-3">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4" />
                                <span>{video.author}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4" />
                                <span>{video.duration}</span>
                              </div>
                            </div>
                            <a
                              href={video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
                            >
                              動画を見る
                              <PlayCircle className="w-4 h-4 ml-1" />
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Related Articles */}
            {useCase.relatedArticles && useCase.relatedArticles.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                  関連記事
                </h2>
                <div className="space-y-4">
                  {useCase.relatedArticles.map((article) => (
                    <Card key={article.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-secondary-900 mb-2">
                              {article.title}
                            </h3>
                            <p className="text-sm text-secondary-600 mb-3">
                              {article.description}
                            </p>
                            <div className="flex items-center justify-between text-sm text-secondary-500 mb-3">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <User className="w-4 h-4" />
                                  <span>{article.author}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span>{article.source}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{article.readingTime}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(article.publishedAt).toLocaleDateString('ja-JP')}</span>
                                </div>
                              </div>
                            </div>
                            <a
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
                            >
                              記事を読む
                              <ExternalLink className="w-4 h-4 ml-1" />
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Progress Tracking */}
            <Card>
              <CardHeader>
                <CardTitle>進捗状況</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-secondary-600">
                    {completedSteps.length} / {useCase.steps.length} ステップ完了
                  </span>
                  <span className="font-medium text-primary-600">
                    {Math.round((completedSteps.length / useCase.steps.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(completedSteps.length / useCase.steps.length) * 100}%` 
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tools & Technologies */}
            <Card>
              <CardHeader>
                <CardTitle>必要ツール</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {useCase.tools.map((tool) => (
                    <div key={tool.id} className="border border-secondary-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-secondary-900">{tool.name}</h4>
                        <Badge variant="secondary" size="sm">
                          {tool.pricing}
                        </Badge>
                      </div>
                      <p className="text-sm text-secondary-600 mb-3">
                        {tool.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant={getDifficultyColor(tool.difficulty)} size="sm">
                          {tool.difficulty}
                        </Badge>
                        <a
                          href={tool.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      
                      {tool.mcpServer && (
                        <div className="mt-3 pt-3 border-t border-secondary-100">
                          <div className="flex items-center space-x-2 mb-2">
                            <Code className="w-4 h-4 text-secondary-500" />
                            <span className="text-sm font-medium text-secondary-700">
                              MCPサーバー対応
                            </span>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            <PlayCircle className="w-4 h-4 mr-2" />
                            試してみる
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>タグ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {useCase.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-secondary-100 text-secondary-600 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Target Users */}
            <Card>
              <CardHeader>
                <CardTitle>対象ユーザー</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {useCase.userRoles.map((role) => (
                    <Badge key={role} variant="secondary">
                      {role.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Industries */}
            <Card>
              <CardHeader>
                <CardTitle>対象業界</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {useCase.industry.map((industry) => (
                    <Badge key={industry} variant="secondary">
                      {industry.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>クイックアクション</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="primary" size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  PDFガイドをダウンロード
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Star className="w-4 h-4 mr-2" />
                  ユースケースをブックマーク
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  チームでシェア
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}