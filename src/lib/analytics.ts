import { supabase } from './supabase';

export interface AnalyticsEvent {
  event_type: string;
  user_id?: string;
  use_case_id?: string;
  mcp_server_id?: string;
  event_data?: Record<string, any>;
}

// Track user interactions
export async function trackEvent(event: AnalyticsEvent) {
  try {
    const { error } = await supabase
      .from('analytics_events')
      .insert({
        ...event,
        event_data: event.event_data || {},
        created_at: new Date().toISOString()
      });

    if (error) {
      console.error('Analytics tracking error:', error);
    }
  } catch (error) {
    console.error('Analytics tracking failed:', error);
  }
}

// Specific tracking functions
export const analytics = {
  // Use case interactions
  viewUseCase: (useCaseId: string, userId?: string) => 
    trackEvent({
      event_type: 'use_case_viewed',
      use_case_id: useCaseId,
      user_id: userId
    }),

  bookmarkUseCase: (useCaseId: string, userId?: string) =>
    trackEvent({
      event_type: 'use_case_bookmarked',
      use_case_id: useCaseId,
      user_id: userId
    }),

  startImplementation: (useCaseId: string, userId?: string) =>
    trackEvent({
      event_type: 'implementation_started',
      use_case_id: useCaseId,
      user_id: userId
    }),

  completeStep: (useCaseId: string, stepId: string, userId?: string) =>
    trackEvent({
      event_type: 'step_completed',
      use_case_id: useCaseId,
      user_id: userId,
      event_data: { step_id: stepId }
    }),

  // Search and filtering
  search: (query: string, resultsCount: number, userId?: string) =>
    trackEvent({
      event_type: 'search_performed',
      user_id: userId,
      event_data: { query, results_count: resultsCount }
    }),

  filterUseCases: (filters: Record<string, any>, resultsCount: number, userId?: string) =>
    trackEvent({
      event_type: 'filters_applied',
      user_id: userId,
      event_data: { filters, results_count: resultsCount }
    }),

  // MCP server interactions
  viewMCPServer: (serverId: string, userId?: string) =>
    trackEvent({
      event_type: 'mcp_server_viewed',
      mcp_server_id: serverId,
      user_id: userId
    }),

  generateMCPConfig: (serverIds: string[], userId?: string) =>
    trackEvent({
      event_type: 'mcp_config_generated',
      user_id: userId,
      event_data: { 
        server_ids: serverIds,
        server_count: serverIds.length 
      }
    }),

  downloadMCPConfig: (configType: string, userId?: string) =>
    trackEvent({
      event_type: 'mcp_config_downloaded',
      user_id: userId,
      event_data: { config_type: configType }
    }),

  // User engagement
  signUp: (userId: string, provider?: string) =>
    trackEvent({
      event_type: 'user_signed_up',
      user_id: userId,
      event_data: { provider }
    }),

  signIn: (userId: string, provider?: string) =>
    trackEvent({
      event_type: 'user_signed_in',
      user_id: userId,
      event_data: { provider }
    }),

  // Page views
  pageView: (page: string, userId?: string) =>
    trackEvent({
      event_type: 'page_viewed',
      user_id: userId,
      event_data: { page }
    })
};

// Analytics dashboard functions
export async function getAnalyticsSummary(days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  try {
    // Get event counts by type
    const { data: eventCounts } = await supabase
      .from('analytics_events')
      .select('event_type')
      .gte('created_at', startDate.toISOString());

    // Get popular use cases
    const { data: popularUseCases } = await supabase
      .from('analytics_events')
      .select('use_case_id, use_cases(title)')
      .eq('event_type', 'use_case_viewed')
      .gte('created_at', startDate.toISOString())
      .not('use_case_id', 'is', null);

    // Get search queries
    const { data: searchQueries } = await supabase
      .from('analytics_events')
      .select('event_data')
      .eq('event_type', 'search_performed')
      .gte('created_at', startDate.toISOString());

    // Process data
    const eventSummary = eventCounts?.reduce((acc, event) => {
      acc[event.event_type] = (acc[event.event_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    const useCaseViews = popularUseCases?.reduce((acc, view) => {
      const useCaseId = view.use_case_id;
      if (useCaseId) {
        acc[useCaseId] = (acc[useCaseId] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>) || {};

    const topSearches = searchQueries?.map(q => q.event_data?.query)
      .filter(Boolean)
      .reduce((acc, query) => {
        acc[query] = (acc[query] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

    return {
      eventSummary,
      topUseCases: Object.entries(useCaseViews)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10),
      topSearches: Object.entries(topSearches)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10),
      totalEvents: eventCounts?.length || 0
    };
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    return null;
  }
}

// Real-time analytics updates
export function subscribeToAnalytics(callback: (event: any) => void) {
  return supabase
    .channel('analytics_events')
    .on('postgres_changes', 
      { event: 'INSERT', schema: 'public', table: 'analytics_events' },
      callback
    )
    .subscribe();
}