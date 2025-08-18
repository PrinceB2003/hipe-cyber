import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '../lib/supabase';

export const useUserPreferences = () => {
  const { user, isLoaded } = useUser();
  const [preferences, setPreferences] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasCheckedPreferences, setHasCheckedPreferences] = useState(false);

  const loadPreferences = useCallback(async () => {
    if (!isLoaded || !user) {
      console.log('🔄 Not loaded or no user:', { isLoaded, user: !!user });
      return;
    }
    
    console.log('🔍 Loading preferences for user ID:', user.id);
    console.log('👤 User object:', user);
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('clerk_user_id', user.id)
        .single();
      
      console.log('📊 Supabase query result:');
      console.log('  - Data:', data);
      console.log('  - Error:', error);
      console.log('  - User ID used in query:', user.id);
      console.log('  - Error code (if any):', error?.code);
      
      if (error && error.code !== 'PGRST116') {
        console.log('❌ Throwing error because code is not PGRST116');
        throw error;
      }
      
      setPreferences(data);
      setHasCheckedPreferences(true);
      
      console.log('✅ Final state updates:');
      console.log('  - Set preferences to:', data);
      console.log('  - hasPreferences will be:', data !== null);
      console.log('  - hasCheckedPreferences set to: true');
      
    } catch (err) {
      console.error('💥 Failed to load preferences:', err);
      console.log('Error details:', {
        message: err.message,
        code: err.code,
        details: err.details
      });
      setError(err.message);
      setHasCheckedPreferences(true);
    } finally {
      setIsLoading(false);
      console.log('🏁 Loading finished, isLoading set to false');
    }
  }, [isLoaded, user]);

  useEffect(() => {
    console.log('🚀 useEffect triggered, calling loadPreferences');
    loadPreferences();
  }, [loadPreferences]);

  // Debug log whenever the returned values change
  useEffect(() => {
    console.log('📈 Hook state updated:', {
      hasPreferences: hasCheckedPreferences && preferences !== null,
      hasCheckedPreferences,
      isLoading,
      preferences: !!preferences,
      error
    });
  }, [preferences, hasCheckedPreferences, isLoading, error]);

  return {
    preferences,
    isLoading,
    error,
    user,
    isUserLoaded: isLoaded,
    hasPreferences: hasCheckedPreferences && preferences !== null,
    hasCheckedPreferences,
    refetchPreferences: loadPreferences,
  };
};