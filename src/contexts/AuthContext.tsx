import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  disability: string;
  settings: {
    notifications: boolean;
    systemUpdates: boolean;
    highContrast: boolean;
    textToSpeech: boolean;
    largerFont: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string, disability: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const profileRef = useRef<UserProfile | null>(null);
  const loadingRef = useRef(true);

  // Update ref when profile changes
  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  // Fetch user profile from Supabase
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  // Initialize auth state - only runs once on mount
  useEffect(() => {
    let mounted = true;
    const initialCheckKey = 'comrade_auth_initialized';
    
    // Check if we've already done the initial auth check in this session
    // This prevents showing loading spinner on every navigation
    const hasInitialized = sessionStorage.getItem(initialCheckKey) === 'true';
    
    if (hasInitialized) {
      // If already initialized, set loading to false immediately
      setLoading(false);
      loadingRef.current = false;
      
      // Still get the session to ensure we have the latest state
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!mounted) return;
        setSession(session);
        setUser(session?.user ?? null);
        
        // Only fetch profile if we don't have one yet
        if (session?.user && !profileRef.current) {
          fetchProfile(session.user.id).then((userProfile) => {
            if (mounted) {
              setProfile(userProfile);
              profileRef.current = userProfile;
            }
          });
        }
      });
    } else {
      // First time initialization - get session quickly
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!mounted) return;
        
        // Set session and user immediately (fast operation)
        setSession(session);
        setUser(session?.user ?? null);
        
        // Mark as initialized immediately so navigation doesn't show loading
        setLoading(false);
        loadingRef.current = false;
        sessionStorage.setItem(initialCheckKey, 'true');
        
        // Fetch profile in background (doesn't block navigation)
        if (session?.user) {
          fetchProfile(session.user.id).then((userProfile) => {
            if (mounted) {
              setProfile(userProfile);
              profileRef.current = userProfile;
            }
          });
        }
      });
    }

    // Listen for auth changes (sign in, sign out, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      const currentProfile = profileRef.current;
      
      // Update session and user immediately (fast)
      setSession(session);
      setUser(session?.user ?? null);
      
      // Clear initialization flag on sign out to allow fresh check on next login
      if (event === 'SIGNED_OUT') {
        sessionStorage.removeItem(initialCheckKey);
        setProfile(null);
        profileRef.current = null;
        return;
      }
      
      if (session?.user) {
        // Only fetch profile if:
        // 1. We don't have a profile, OR
        // 2. The user ID changed (different user logged in)
        // This prevents unnecessary refetches during navigation
        if (!currentProfile || currentProfile.id !== session.user.id) {
          // Don't block - fetch in background
          fetchProfile(session.user.id).then((userProfile) => {
            if (mounted) {
              setProfile(userProfile);
              profileRef.current = userProfile;
            }
          });
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      if (data.user) {
        const userProfile = await fetchProfile(data.user.id);
        setProfile(userProfile);
      }

      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signUp = async (email: string, password: string, name: string, disability: string) => {
    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            disability,
          },
        },
      });

      if (error) {
        return { error };
      }

      // If user is immediately created (email confirmation disabled), fetch profile
      if (data.user && data.session) {
        // Wait a bit for the trigger to create the profile
        await new Promise(resolve => setTimeout(resolve, 1500));
        const userProfile = await fetchProfile(data.user.id);
        if (userProfile) {
          setProfile(userProfile);
        } else {
          // If profile doesn't exist yet, try to create it manually as fallback
          const { error: profileError } = await supabase
            .from('user_profiles')
            .insert({
              id: data.user.id,
              email: data.user.email || email,
              name,
              disability,
              settings: {
                notifications: true,
                systemUpdates: false,
                highContrast: false,
                textToSpeech: false,
                largerFont: false,
              },
            })
            .select()
            .single();
          
          if (!profileError) {
            const newProfile = await fetchProfile(data.user.id);
            if (newProfile) {
              setProfile(newProfile);
            }
          }
        }
      }

      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      // Clear state immediately for better UX
      setUser(null);
      setSession(null);
      setProfile(null);
      profileRef.current = null;
      
      // Clear session storage flag to allow fresh auth check on next login
      sessionStorage.removeItem('comrade_auth_initialized');
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out from Supabase:', error);
        // State is already cleared, so we can continue
        // Don't throw - allow the logout to complete
      }
      // The onAuthStateChange listener will also handle the state update
    } catch (error) {
      console.error('Error signing out:', error);
      // State is already cleared, so logout is effectively complete
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      return { error: new Error('No user logged in') };
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        return { error };
      }

      setProfile(data as UserProfile);
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

