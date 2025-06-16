import { supabase } from '@/lib/supabase';
import { UseCase, UseCaseFilter } from '@/types';
import { useCases, getFeaturedUseCases, searchUseCases as searchStaticUseCases } from '@/data/useCases';

export async function fetchUseCases(filters?: UseCaseFilter): Promise<UseCase[]> {
  try {
    let query = supabase
      .from('use_cases')
      .select(`
        *,
        categories:category_id(name, slug, icon, color),
        use_case_tools:use_case_tools(
          tools:tool_id(*)
        ),
        implementation_steps:implementation_steps(
          *,
          resources:resources(*)
        )
      `);

    // Apply filters
    if (filters) {
      if (filters.categories.length > 0) {
        const categoryIds = await getCategoryIds(filters.categories);
        query = query.in('category_id', categoryIds);
      }

      if (filters.difficulties.length > 0) {
        query = query.in('difficulty', filters.difficulties);
      }

      if (filters.industries.length > 0) {
        query = query.overlaps('industries', filters.industries);
      }

      if (filters.userRoles.length > 0) {
        query = query.overlaps('user_roles', filters.userRoles);
      }

      if (filters.featured) {
        query = query.eq('is_featured', true);
      }

      if (filters.searchQuery) {
        query = query.or(`
          title.ilike.%${filters.searchQuery}%,
          description.ilike.%${filters.searchQuery}%,
          tags.cs.{${filters.searchQuery}}
        `);
      }
    }

    const { data, error } = await query.order('popularity', { ascending: false });

    if (error) {
      console.error('Error fetching use cases from Supabase, falling back to static data:', error);
      return useCases;
    }

    return transformUseCases(data || []);
  } catch (error) {
    console.error('Supabase connection failed, using static data:', error);
    return useCases;
  }
}

export async function fetchUseCaseById(id: string): Promise<UseCase | null> {
  const { data, error } = await supabase
    .from('use_cases')
    .select(`
      *,
      categories:category_id(name, slug, icon, color),
      use_case_tools:use_case_tools(
        tools:tool_id(*,
          mcp_servers:mcp_servers(*)
        )
      ),
      implementation_steps:implementation_steps(
        *,
        resources:resources(*)
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching use case:', error);
    return null;
  }

  return transformUseCase(data);
}

export async function fetchFeaturedUseCases(): Promise<UseCase[]> {
  try {
    const { data, error } = await supabase
      .from('use_cases')
      .select(`
        *,
        categories:category_id(name, slug, icon, color),
        use_case_tools:use_case_tools(
          tools:tool_id(*)
        ),
        implementation_steps:implementation_steps(
          *,
          resources:resources(*)
        )
      `)
      .eq('is_featured', true)
      .order('popularity', { ascending: false })
      .limit(6);

    if (error) {
      console.error('Error fetching featured use cases from Supabase, falling back to static data:', error);
      return getFeaturedUseCases();
    }

    return transformUseCases(data || []);
  } catch (error) {
    console.error('Supabase connection failed, using static featured data:', error);
    return getFeaturedUseCases();
  }
}

export async function searchUseCases(query: string): Promise<UseCase[]> {
  const { data, error } = await supabase
    .from('use_cases')
    .select(`
      *,
      categories:category_id(name, slug, icon, color),
      use_case_tools:use_case_tools(
        tools:tool_id(*)
      ),
      implementation_steps:implementation_steps(
        *,
        resources:resources(*)
      )
    `)
    .or(`
      title.ilike.%${query}%,
      description.ilike.%${query}%,
      tags.cs.{${query}}
    `)
    .order('popularity', { ascending: false });

  if (error) {
    console.error('Error searching use cases:', error);
    return [];
  }

  return transformUseCases(data || []);
}

export async function fetchCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
}

async function getCategoryIds(categorySlugs: string[]): Promise<string[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('id')
    .in('slug', categorySlugs);

  if (error) {
    console.error('Error fetching category IDs:', error);
    return [];
  }

  return data?.map(cat => cat.id) || [];
}

function transformUseCase(data: any): UseCase {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    category: data.categories?.slug || 'unknown',
    difficulty: data.difficulty,
    timeToImplement: data.time_to_implement,
    roiExpected: data.roi_expected,
    estimatedCost: data.estimated_cost,
    featured: data.is_featured,
    popularity: data.popularity,
    tags: data.tags || [],
    industry: data.industries || [],
    userRoles: data.user_roles || [],
    lastUpdated: new Date(data.updated_at),
    tools: data.use_case_tools?.map((ut: any) => ({
      id: ut.tools.id,
      name: ut.tools.name,
      description: ut.tools.description,
      website: ut.tools.website,
      pricing: ut.tools.pricing,
      category: ut.tools.category,
      difficulty: ut.tools.difficulty,
      features: ut.tools.features || [],
      integrations: ut.tools.integrations || [],
      mcpServer: ut.tools.mcp_servers ? transformMCPServer(ut.tools.mcp_servers) : undefined
    })) || [],
    steps: data.implementation_steps?.map((step: any) => ({
      id: step.id,
      title: step.title,
      description: step.description,
      code: step.code,
      codeLanguage: step.code_language,
      duration: step.duration,
      difficulty: step.difficulty,
      prerequisites: step.prerequisites || [],
      resources: step.resources?.map((resource: any) => ({
        title: resource.title,
        url: resource.url,
        type: resource.type
      })) || []
    })).sort((a: any, b: any) => a.step_number - b.step_number) || []
  };
}

function transformUseCases(data: any[]): UseCase[] {
  return data.map(transformUseCase);
}

function transformMCPServer(data: any) {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    repository: data.repository,
    installCommand: data.install_command,
    configExample: JSON.stringify(data.config_example),
    capabilities: data.capabilities || [],
    requirements: data.requirements || [],
    category: data.category,
    official: data.is_official,
    documentation: data.documentation_url
  };
}