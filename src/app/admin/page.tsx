'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/lib/hooks/useSupabase';
import { supabase } from '@/lib/supabase';

interface UseCase {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  is_featured: boolean;
  popularity: number;
  created_at: string;
}

export default function AdminPanel() {
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUseCases: 0,
    featuredUseCases: 0,
    totalTools: 0,
    totalMCPServers: 0
  });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch use cases
      const { data: useCasesData, error: useCasesError } = await supabase
        .from('use_cases')
        .select('*')
        .order('created_at', { ascending: false });

      if (useCasesError) throw useCasesError;
      setUseCases(useCasesData || []);

      // Fetch stats
      const { count: totalUseCases } = await supabase
        .from('use_cases')
        .select('*', { count: 'exact', head: true });

      const { count: featuredUseCases } = await supabase
        .from('use_cases')
        .select('*', { count: 'exact', head: true })
        .eq('is_featured', true);

      const { count: totalTools } = await supabase
        .from('tools')
        .select('*', { count: 'exact', head: true });

      const { count: totalMCPServers } = await supabase
        .from('mcp_servers')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalUseCases: totalUseCases || 0,
        featuredUseCases: featuredUseCases || 0,
        totalTools: totalTools || 0,
        totalMCPServers: totalMCPServers || 0
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    const { error } = await supabase
      .from('use_cases')
      .update({ is_featured: !currentFeatured })
      .eq('id', id);

    if (error) {
      console.error('Error updating featured status:', error);
    } else {
      fetchData(); // Refresh data
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Admin Access Required</h2>
            <p className="text-secondary-600">Please sign in to access the admin panel.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">Admin Panel</h1>
          <p className="text-secondary-600 mt-2">Manage use cases, tools, and content</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary-600">{stats.totalUseCases}</div>
              <div className="text-sm text-secondary-600">Total Use Cases</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">{stats.featuredUseCases}</div>
              <div className="text-sm text-secondary-600">Featured Use Cases</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">{stats.totalTools}</div>
              <div className="text-sm text-secondary-600">AI Tools</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600">{stats.totalMCPServers}</div>
              <div className="text-sm text-secondary-600">MCP Servers</div>
            </CardContent>
          </Card>
        </div>

        {/* Use Cases Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Use Cases Management</CardTitle>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Use Case
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-secondary-200">
                    <th className="text-left py-3 px-4">Title</th>
                    <th className="text-left py-3 px-4">Difficulty</th>
                    <th className="text-left py-3 px-4">Featured</th>
                    <th className="text-left py-3 px-4">Popularity</th>
                    <th className="text-left py-3 px-4">Created</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {useCases.map((useCase) => (
                    <tr key={useCase.id} className="border-b border-secondary-100">
                      <td className="py-3 px-4">
                        <div className="font-medium">{useCase.title}</div>
                        <div className="text-sm text-secondary-600 truncate max-w-md">
                          {useCase.description}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          useCase.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                          useCase.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {useCase.difficulty}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleFeatured(useCase.id, useCase.is_featured)}
                          className={`px-2 py-1 text-xs rounded-full ${
                            useCase.is_featured 
                              ? 'bg-primary-100 text-primary-800' 
                              : 'bg-secondary-100 text-secondary-600'
                          }`}
                        >
                          {useCase.is_featured ? 'Featured' : 'Regular'}
                        </button>
                      </td>
                      <td className="py-3 px-4">{useCase.popularity}</td>
                      <td className="py-3 px-4">
                        {new Date(useCase.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}