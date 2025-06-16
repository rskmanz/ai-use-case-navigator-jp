import { supabase } from '@/lib/supabase';
import { MCPServer, MCPCategory } from '@/types';

export async function fetchMCPServers(): Promise<MCPServer[]> {
  const { data, error } = await supabase
    .from('mcp_servers')
    .select('*')
    .eq('is_active', true)
    .order('is_official', { ascending: false })
    .order('name');

  if (error) {
    console.error('Error fetching MCP servers:', error);
    return [];
  }

  return transformMCPServers(data || []);
}

export async function fetchMCPServersByCategory(category: MCPCategory): Promise<MCPServer[]> {
  const { data, error } = await supabase
    .from('mcp_servers')
    .select('*')
    .eq('category', category)
    .eq('is_active', true)
    .order('is_official', { ascending: false })
    .order('name');

  if (error) {
    console.error('Error fetching MCP servers by category:', error);
    return [];
  }

  return transformMCPServers(data || []);
}

export async function fetchOfficialMCPServers(): Promise<MCPServer[]> {
  const { data, error } = await supabase
    .from('mcp_servers')
    .select('*')
    .eq('is_official', true)
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error('Error fetching official MCP servers:', error);
    return [];
  }

  return transformMCPServers(data || []);
}

export async function fetchCommunityMCPServers(): Promise<MCPServer[]> {
  const { data, error } = await supabase
    .from('mcp_servers')
    .select('*')
    .eq('is_official', false)
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error('Error fetching community MCP servers:', error);
    return [];
  }

  return transformMCPServers(data || []);
}

export async function searchMCPServers(query: string): Promise<MCPServer[]> {
  const { data, error } = await supabase
    .from('mcp_servers')
    .select('*')
    .or(`
      name.ilike.%${query}%,
      description.ilike.%${query}%,
      capabilities.cs.{${query}}
    `)
    .eq('is_active', true)
    .order('is_official', { ascending: false })
    .order('name');

  if (error) {
    console.error('Error searching MCP servers:', error);
    return [];
  }

  return transformMCPServers(data || []);
}

export async function fetchMCPServerById(id: string): Promise<MCPServer | null> {
  const { data, error } = await supabase
    .from('mcp_servers')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching MCP server:', error);
    return null;
  }

  return transformMCPServer(data);
}

function transformMCPServer(data: any): MCPServer {
  return {
    id: data.id,
    name: data.name,
    description: data.description || '',
    repository: data.repository || '',
    installCommand: data.install_command || '',
    configExample: JSON.stringify(data.config_example || {}),
    capabilities: data.capabilities || [],
    requirements: data.requirements || [],
    category: data.category as MCPCategory,
    official: data.is_official,
    documentation: data.documentation_url || ''
  };
}

function transformMCPServers(data: any[]): MCPServer[] {
  return data.map(transformMCPServer);
}

// Analytics functions
export async function trackMCPServerUsage(serverId: string, userId?: string) {
  const { error } = await supabase
    .from('analytics_events')
    .insert({
      user_id: userId || null,
      event_type: 'mcp_server_viewed',
      mcp_server_id: serverId,
      event_data: {
        timestamp: new Date().toISOString()
      }
    });

  if (error) {
    console.error('Error tracking MCP server usage:', error);
  }
}

export async function trackMCPConfiguration(configData: any, userId?: string) {
  const { error } = await supabase
    .from('analytics_events')
    .insert({
      user_id: userId || null,
      event_type: 'mcp_config_generated',
      event_data: {
        server_count: configData.serverCount,
        server_types: configData.serverTypes,
        timestamp: new Date().toISOString()
      }
    });

  if (error) {
    console.error('Error tracking MCP configuration:', error);
  }
}