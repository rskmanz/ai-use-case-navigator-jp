export interface UseCase {
  id: string;
  title: string;
  description: string;
  category: UseCaseCategory;
  difficulty: DifficultyLevel;
  timeToImplement: string;
  roiExpected: string;
  tools: Tool[];
  steps: ImplementationStep[];
  tags: string[];
  industry: Industry[];
  userRoles: UserRole[];
  estimatedCost: CostRange;
  featured: boolean;
  popularity: number;
  lastUpdated: Date;
  externalResources?: ExternalResource[];
  relatedVideos?: VideoResource[];
  relatedArticles?: ArticleResource[];
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  website: string;
  pricing: string;
  category: ToolCategory;
  difficulty: DifficultyLevel;
  features: string[];
  mcpServer?: MCPServer;
  integrations: string[];
  logo?: string;
}

export interface MCPServer {
  id: string;
  name: string;
  description: string;
  repository: string;
  installCommand: string;
  configExample: string;
  capabilities: string[];
  requirements: string[];
  category: MCPCategory;
  official: boolean;
  documentation: string;
}

export interface ImplementationStep {
  id: string;
  title: string;
  description: string;
  code?: string;
  codeLanguage?: string;
  duration: string;
  difficulty: DifficultyLevel;
  prerequisites: string[];
  resources: Resource[];
}

export interface Resource {
  title: string;
  url: string;
  type: ResourceType;
}

export interface ExternalResource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'tool' | 'service' | 'platform' | 'library';
  isPaid: boolean;
  rating?: number;
}

export interface VideoResource {
  id: string;
  title: string;
  description: string;
  url: string;
  platform: 'youtube' | 'vimeo' | 'other';
  duration: string;
  thumbnailUrl?: string;
  author: string;
  publishedAt: Date;
}

export interface ArticleResource {
  id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  publishedAt: Date;
  readingTime: string;
  source: string;
}

export interface UseCaseFilter {
  categories: UseCaseCategory[];
  difficulties: DifficultyLevel[];
  industries: Industry[];
  userRoles: UserRole[];
  tools: string[];
  timeToImplement: string[];
  featured?: boolean;
  searchQuery?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  industry: Industry;
  experience: DifficultyLevel;
  interests: UseCaseCategory[];
  completedUseCases: string[];
  bookmarkedUseCases: string[];
  mcpServersInstalled: string[];
}

// Enums
export enum UseCaseCategory {
  BUSINESS_AUTOMATION = 'business-automation',
  CONTENT_CREATION = 'content-creation',
  DATA_ANALYSIS = 'data-analysis',
  CUSTOMER_SERVICE = 'customer-service',
  DEVELOPMENT = 'development',
  RESEARCH = 'research',
  DESIGN = 'design',
  FINANCE = 'finance',
  HR = 'hr',
  SALES = 'sales'
}

export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

export enum Industry {
  TECHNOLOGY = 'technology',
  HEALTHCARE = 'healthcare',
  FINANCE = 'finance',
  EDUCATION = 'education',
  RETAIL = 'retail',
  MANUFACTURING = 'manufacturing',
  MARKETING = 'marketing',
  CONSULTING = 'consulting',
  STARTUP = 'startup',
  ENTERPRISE = 'enterprise'
}

export enum UserRole {
  DEVELOPER = 'developer',
  BUSINESS_ANALYST = 'business-analyst',
  MARKETING_MANAGER = 'marketing-manager',
  SALES_MANAGER = 'sales-manager',
  DATA_ANALYST = 'data-analyst',
  PROJECT_MANAGER = 'project-manager',
  ENTREPRENEUR = 'entrepreneur',
  CONSULTANT = 'consultant',
  DESIGNER = 'designer',
  EXECUTIVE = 'executive'
}

export enum ToolCategory {
  AI_ASSISTANT = 'ai-assistant',
  AUTOMATION = 'automation',
  DATABASE = 'database',
  CRM = 'crm',
  DESIGN = 'design',
  DEVELOPMENT = 'development',
  COMMUNICATION = 'communication',
  ANALYTICS = 'analytics'
}

export enum MCPCategory {
  FILESYSTEM = 'filesystem',
  DATABASE = 'database',
  WEB_SCRAPING = 'web-scraping',
  API_INTEGRATION = 'api-integration',
  DEVELOPMENT = 'development',
  COMMUNICATION = 'communication',
  CREATIVE = 'creative',
  MEMORY = 'memory'
}

export enum ResourceType {
  DOCUMENTATION = 'documentation',
  TUTORIAL = 'tutorial',
  VIDEO = 'video',
  BLOG_POST = 'blog-post',
  TOOL = 'tool',
  TEMPLATE = 'template'
}

export enum CostRange {
  FREE = 'free',
  LOW = 'low', // $0-50/month
  MEDIUM = 'medium', // $50-200/month
  HIGH = 'high', // $200+/month
  CUSTOM = 'custom'
}