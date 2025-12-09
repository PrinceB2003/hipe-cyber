import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '../lib/supabase';

export function useCurrentUserData() {
    const { user, isLoaded } = useUser();
    const [userRole, setUserRole] = useState('user');
    const [currentUserData, setCurrentUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            if (!isLoaded) {
                return;
            }
            
            if (!user) {
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('user_preferences')
                .select('user_role, is_banned, is_muted, muted_until')
                .eq('clerk_user_id', user.id)
                .single();

            if (data) {
                setUserRole(data.user_role || 'user');
                setCurrentUserData(data);
            }
            
            setLoading(false);
        };

        fetchUserRole();
    }, [user, isLoaded]);

    const isModerator = userRole === 'moderator' || userRole === 'admin';
    const isAdmin = userRole === 'admin';
    const isMuted = currentUserData?.is_muted && 
        currentUserData?.muted_until && 
        new Date(currentUserData.muted_until) > new Date();

    return {
        userRole,
        currentUserData,
        loading,
        isModerator,
        isAdmin,
        isMuted
    };
}