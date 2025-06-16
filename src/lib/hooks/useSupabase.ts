'use client';

import { useState, useEffect } from 'react';
import { createClientSupabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientSupabase();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const signInWithProvider = async (provider: 'google' | 'github') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    return { data, error };
  };

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithProvider
  };
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientSupabase();

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (data) {
      setProfile(data);
    }
    setLoading(false);
  };

  const updateProfile = async (updates: any) => {
    if (!user) return { error: new Error('No user') };

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (data) {
      setProfile(data);
    }

    return { data, error };
  };

  return {
    profile,
    loading,
    updateProfile,
    refetch: fetchProfile
  };
}

export function useBookmarks() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientSupabase();

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    } else {
      setBookmarks([]);
      setLoading(false);
    }
  }, [user]);

  const fetchBookmarks = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('user_bookmarks')
      .select('use_case_id')
      .eq('user_id', user.id);

    if (data) {
      setBookmarks(data.map(b => b.use_case_id));
    }
    setLoading(false);
  };

  const toggleBookmark = async (useCaseId: string) => {
    if (!user) return;

    const isBookmarked = bookmarks.includes(useCaseId);

    if (isBookmarked) {
      const { error } = await supabase
        .from('user_bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('use_case_id', useCaseId);

      if (!error) {
        setBookmarks(prev => prev.filter(id => id !== useCaseId));
      }
    } else {
      const { error } = await supabase
        .from('user_bookmarks')
        .insert({
          user_id: user.id,
          use_case_id: useCaseId
        });

      if (!error) {
        setBookmarks(prev => [...prev, useCaseId]);
      }
    }
  };

  return {
    bookmarks,
    loading,
    toggleBookmark,
    isBookmarked: (useCaseId: string) => bookmarks.includes(useCaseId)
  };
}

export function useProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const supabase = createClientSupabase();

  useEffect(() => {
    if (user) {
      fetchProgress();
    } else {
      setProgress({});
      setLoading(false);
    }
  }, [user]);

  const fetchProgress = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('user_progress')
      .select('use_case_id, step_id')
      .eq('user_id', user.id);

    if (data) {
      const progressByUseCase: Record<string, string[]> = {};
      data.forEach(item => {
        if (!progressByUseCase[item.use_case_id]) {
          progressByUseCase[item.use_case_id] = [];
        }
        progressByUseCase[item.use_case_id].push(item.step_id);
      });
      setProgress(progressByUseCase);
    }
    setLoading(false);
  };

  const toggleStepComplete = async (useCaseId: string, stepId: string) => {
    if (!user) return;

    const isCompleted = progress[useCaseId]?.includes(stepId) || false;

    if (isCompleted) {
      const { error } = await supabase
        .from('user_progress')
        .delete()
        .eq('user_id', user.id)
        .eq('step_id', stepId);

      if (!error) {
        setProgress(prev => ({
          ...prev,
          [useCaseId]: prev[useCaseId]?.filter(id => id !== stepId) || []
        }));
      }
    } else {
      const { error } = await supabase
        .from('user_progress')
        .insert({
          user_id: user.id,
          use_case_id: useCaseId,
          step_id: stepId
        });

      if (!error) {
        setProgress(prev => ({
          ...prev,
          [useCaseId]: [...(prev[useCaseId] || []), stepId]
        }));
      }
    }
  };

  return {
    progress,
    loading,
    toggleStepComplete,
    getCompletedSteps: (useCaseId: string) => progress[useCaseId] || [],
    isStepCompleted: (useCaseId: string, stepId: string) => 
      progress[useCaseId]?.includes(stepId) || false
  };
}