import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '../lib/supabase';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { 
    Shield, Users, Ban, UserCheck, Search, Clock, 
    Trash2, Loader2, AlertTriangle, Crown, CheckCircle 
} from 'lucide-react';

function AdminDashboard() {
    const { user, isLoaded } = useUser();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    
   
    const [showBanModal, setShowBanModal] = useState(false);
    const [showMuteModal, setShowMuteModal] = useState(false);
    const [showRoleModal, setShowRoleModal] = useState(false);
    
    
    const [banReason, setBanReason] = useState('');
    const [muteReason, setMuteReason] = useState('');
    const [muteDuration, setMuteDuration] = useState(30);
    
    
    const [currentUserRole, setCurrentUserRole] = useState(null);

   
    useEffect(() => {
        const checkAdminStatus = async () => {
            if (!user) return;

            const { data } = await supabase
                .from('user_preferences')
                .select('user_role')
                .eq('clerk_user_id', user.id)
                .single();

            if (data?.user_role !== 'admin') {
                navigate('/forum');
                return;
            }

            setCurrentUserRole(data.user_role);
        };

        if (isLoaded) {
            checkAdminStatus();
        }
    }, [user, isLoaded, navigate]);

  
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('user_preferences')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching users:', error);
            } else {
                setUsers(data || []);
            }
            setLoading(false);
        };

        if (currentUserRole === 'admin') {
            fetchUsers();
        }
    }, [currentUserRole]);

    const filteredUsers = users.filter(u =>
        u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBanUser = async () => {
        if (!selectedUser || !banReason.trim()) {
            alert('Please provide a ban reason');
            return;
        }

        setActionLoading(true);

        const { error } = await supabase
            .from('user_preferences')
            .update({
                is_banned: true,
                banned_at: new Date().toISOString(),
                ban_reason: banReason
            })
            .eq('clerk_user_id', selectedUser.clerk_user_id);

        if (error) {
            console.error('Error banning user:', error);
            alert('Failed to ban user');
        } else {
            
            await supabase.from('moderation_actions').insert({
                moderator_clerk_id: user.id,
                target_clerk_id: selectedUser.clerk_user_id,
                action_type: 'ban',
                reason: banReason
            });

           
            setUsers(users.map(u =>
                u.clerk_user_id === selectedUser.clerk_user_id
                    ? { ...u, is_banned: true, ban_reason: banReason }
                    : u
            ));

            setShowBanModal(false);
            setBanReason('');
            setSelectedUser(null);
        }

        setActionLoading(false);
    };

    const handleUnbanUser = async (clerkUserId) => {
        if (!confirm('Are you sure you want to unban this user?')) return;

        setActionLoading(true);

        const { error } = await supabase
            .from('user_preferences')
            .update({
                is_banned: false,
                banned_at: null,
                ban_reason: null
            })
            .eq('clerk_user_id', clerkUserId);

        if (error) {
            console.error('Error unbanning user:', error);
            alert('Failed to unban user');
        } else {
            await supabase.from('moderation_actions').insert({
                moderator_clerk_id: user.id,
                target_clerk_id: clerkUserId,
                action_type: 'unban'
            });

            setUsers(users.map(u =>
                u.clerk_user_id === clerkUserId
                    ? { ...u, is_banned: false, banned_at: null, ban_reason: null }
                    : u
            ));
        }

        setActionLoading(false);
    };

    const handleMuteUser = async () => {
        if (!selectedUser || !muteReason.trim()) {
            alert('Please provide a mute reason');
            return;
        }

        setActionLoading(true);

        const mutedUntil = new Date();
        mutedUntil.setMinutes(mutedUntil.getMinutes() + muteDuration);

        const { error } = await supabase
            .from('user_preferences')
            .update({
                is_muted: true,
                muted_until: mutedUntil.toISOString()
            })
            .eq('clerk_user_id', selectedUser.clerk_user_id);

        if (error) {
            console.error('Error muting user:', error);
            alert('Failed to mute user');
        } else {
            await supabase.from('moderation_actions').insert({
                moderator_clerk_id: user.id,
                target_clerk_id: selectedUser.clerk_user_id,
                action_type: 'mute',
                reason: muteReason,
                metadata: { duration_minutes: muteDuration }
            });

            setUsers(users.map(u =>
                u.clerk_user_id === selectedUser.clerk_user_id
                    ? { ...u, is_muted: true, muted_until: mutedUntil.toISOString() }
                    : u
            ));

            setShowMuteModal(false);
            setMuteReason('');
            setSelectedUser(null);
        }

        setActionLoading(false);
    };

    const handleUnmuteUser = async (clerkUserId) => {
        setActionLoading(true);

        const { error } = await supabase
            .from('user_preferences')
            .update({
                is_muted: false,
                muted_until: null
            })
            .eq('clerk_user_id', clerkUserId);

        if (error) {
            console.error('Error unmuting user:', error);
            alert('Failed to unmute user');
        } else {
            await supabase.from('moderation_actions').insert({
                moderator_clerk_id: user.id,
                target_clerk_id: clerkUserId,
                action_type: 'unmute'
            });

            setUsers(users.map(u =>
                u.clerk_user_id === clerkUserId
                    ? { ...u, is_muted: false, muted_until: null }
                    : u
            ));
        }

        setActionLoading(false);
    };

    const handleRoleChange = async (newRole) => {
        if (!selectedUser) return;

        setActionLoading(true);

        const { error } = await supabase
            .from('user_preferences')
            .update({ user_role: newRole })
            .eq('clerk_user_id', selectedUser.clerk_user_id);

        if (error) {
            console.error('Error changing role:', error);
            alert('Failed to change role');
        } else {
            const actionType = newRole === 'moderator' ? 'assign_moderator' : 'revoke_moderator';
            
            await supabase.from('moderation_actions').insert({
                moderator_clerk_id: user.id,
                target_clerk_id: selectedUser.clerk_user_id,
                action_type: actionType
            });

            setUsers(users.map(u =>
                u.clerk_user_id === selectedUser.clerk_user_id
                    ? { ...u, user_role: newRole }
                    : u
            ));

            setShowRoleModal(false);
            setSelectedUser(null);
        }

        setActionLoading(false);
    };

    const getRoleBadge = (role) => {
        const colors = {
            admin: 'bg-red-500/20 text-red-400 border-red-500',
            moderator: 'bg-purple-500/20 text-purple-400 border-purple-500',
            user: 'bg-blue-500/20 text-blue-400 border-blue-500'
        };

        return (
            <span className={`px-2 py-1 rounded text-xs border ${colors[role] || colors.user}`}>
                {role || 'user'}
            </span>
        );
    };

    if (!isLoaded || loading) {
        return (
            <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
                <Loader2 className="animate-spin text-[#00A6FB]" size={48} />
            </div>
        );
    }

    if (currentUserRole !== 'admin') {
        return null;
    }

    return (
        <>
            <NavBar>
                <Link to="/" className="hover:text-[#00A6FB]">Home</Link>
                <Link to="/forum" className="hover:text-[#00A6FB]">Forum</Link>
                <Link to="/profile" className="hover:text-[#00A6FB]">Profile</Link>
            </NavBar>

            <div className="min-h-screen bg-[#09090B] pt-24 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <Shield className="w-8 h-8 text-[#00A6FB]" />
                            <h1 className="text-4xl font-bold text-[#F9F4F4]">Admin Dashboard</h1>
                        </div>
                        <p className="text-gray-400">Manage users, roles, and platform security</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#00A6FB]/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">Total Users</p>
                                    <p className="text-2xl font-bold text-[#F9F4F4]">{users.length}</p>
                                </div>
                                <Users className="text-[#00A6FB]" size={32} />
                            </div>
                        </div>
                        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-red-500/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">Banned</p>
                                    <p className="text-2xl font-bold text-[#F9F4F4]">
                                        {users.filter(u => u.is_banned).length}
                                    </p>
                                </div>
                                <Ban className="text-red-500" size={32} />
                            </div>
                        </div>
                        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-purple-500/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">Moderators</p>
                                    <p className="text-2xl font-bold text-[#F9F4F4]">
                                        {users.filter(u => u.user_role === 'moderator').length}
                                    </p>
                                </div>
                                <Shield className="text-purple-500" size={32} />
                            </div>
                        </div>
                        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-yellow-500/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">Muted</p>
                                    <p className="text-2xl font-bold text-[#F9F4F4]">
                                        {users.filter(u => u.is_muted).length}
                                    </p>
                                </div>
                                <Clock className="text-yellow-500" size={32} />
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search users by username or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-[#00A6FB]/20 rounded-lg text-[#F9F4F4] focus:outline-none focus:border-[#00A6FB]"
                            />
                        </div>
                    </div>

                    {/* Users Table */}
                    <div className="bg-[#1a1a1a] rounded-lg border border-[#00A6FB]/20 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#0f0f0f] border-b border-[#00A6FB]/20">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">User</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Role</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Joined</th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#00A6FB]/10">
                                    {filteredUsers.map((u) => (
                                        <tr key={u.clerk_user_id} className="hover:bg-[#0f0f0f]/50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-[#F9F4F4]">{u.username || 'Unknown'}</p>
                                                    <p className="text-sm text-gray-400">{u.email || 'No email'}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getRoleBadge(u.user_role)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    {u.is_banned && (
                                                        <span className="flex items-center gap-1 text-red-400 text-xs">
                                                            <Ban size={12} /> Banned
                                                        </span>
                                                    )}
                                                    {u.is_muted && (
                                                        <span className="flex items-center gap-1 text-yellow-400 text-xs">
                                                            <Clock size={12} /> Muted
                                                        </span>
                                                    )}
                                                    {!u.is_banned && !u.is_muted && (
                                                        <span className="flex items-center gap-1 text-green-400 text-xs">
                                                            <CheckCircle size={12} /> Active
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-400">
                                                {new Date(u.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    {!u.is_banned ? (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedUser(u);
                                                                setShowBanModal(true);
                                                            }}
                                                            className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 text-xs"
                                                        >
                                                            Ban
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleUnbanUser(u.clerk_user_id)}
                                                            disabled={actionLoading}
                                                            className="px-3 py-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 text-xs"
                                                        >
                                                            Unban
                                                        </button>
                                                    )}

                                                    {!u.is_muted ? (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedUser(u);
                                                                setShowMuteModal(true);
                                                            }}
                                                            className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded hover:bg-yellow-500/30 text-xs"
                                                        >
                                                            Mute
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleUnmuteUser(u.clerk_user_id)}
                                                            disabled={actionLoading}
                                                            className="px-3 py-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 text-xs"
                                                        >
                                                            Unmute
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={() => {
                                                            setSelectedUser(u);
                                                            setShowRoleModal(true);
                                                        }}
                                                        className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded hover:bg-purple-500/30 text-xs"
                                                    >
                                                        Role
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ban Modal */}
            {showBanModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1a1a1a] rounded-lg p-6 max-w-md w-full border border-red-500/50">
                        <h3 className="text-xl font-bold text-[#F9F4F4] mb-4 flex items-center gap-2">
                            <Ban className="text-red-500" />
                            Ban User
                        </h3>
                        <p className="text-gray-400 mb-4">
                            You are about to ban <span className="text-[#F9F4F4] font-semibold">{selectedUser?.username}</span>
                        </p>
                        <textarea
                            placeholder="Reason for ban (required)"
                            value={banReason}
                            onChange={(e) => setBanReason(e.target.value)}
                            className="w-full px-3 py-2 bg-[#09090B] border border-[#00A6FB]/20 rounded text-[#F9F4F4] mb-4 h-24"
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={handleBanUser}
                                disabled={actionLoading || !banReason.trim()}
                                className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:opacity-50"
                            >
                                {actionLoading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Confirm Ban'}
                            </button>
                            <button
                                onClick={() => {
                                    setShowBanModal(false);
                                    setBanReason('');
                                    setSelectedUser(null);
                                }}
                                className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mute Modal */}
            {showMuteModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1a1a1a] rounded-lg p-6 max-w-md w-full border border-yellow-500/50">
                        <h3 className="text-xl font-bold text-[#F9F4F4] mb-4 flex items-center gap-2">
                            <Clock className="text-yellow-500" />
                            Mute User
                        </h3>
                        <p className="text-gray-400 mb-4">
                            Mute <span className="text-[#F9F4F4] font-semibold">{selectedUser?.username}</span>
                        </p>
                        <div className="mb-4">
                            <label className="text-gray-400 text-sm mb-2 block">Duration (minutes)</label>
                            <input
                                type="number"
                                min="1"
                                value={muteDuration}
                                onChange={(e) => setMuteDuration(parseInt(e.target.value))}
                                className="w-full px-3 py-2 bg-[#09090B] border border-[#00A6FB]/20 rounded text-[#F9F4F4]"
                            />
                        </div>
                        <textarea
                            placeholder="Reason for mute (required)"
                            value={muteReason}
                            onChange={(e) => setMuteReason(e.target.value)}
                            className="w-full px-3 py-2 bg-[#09090B] border border-[#00A6FB]/20 rounded text-[#F9F4F4] mb-4 h-24"
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={handleMuteUser}
                                disabled={actionLoading || !muteReason.trim()}
                                className="flex-1 bg-yellow-500 text-black py-2 rounded hover:bg-yellow-600 disabled:opacity-50"
                            >
                                {actionLoading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Confirm Mute'}
                            </button>
                            <button
                                onClick={() => {
                                    setShowMuteModal(false);
                                    setMuteReason('');
                                    setSelectedUser(null);
                                }}
                                className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Role Modal */}
            {showRoleModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1a1a1a] rounded-lg p-6 max-w-md w-full border border-purple-500/50">
                        <h3 className="text-xl font-bold text-[#F9F4F4] mb-4 flex items-center gap-2">
                            <Crown className="text-purple-500" />
                            Change Role
                        </h3>
                        <p className="text-gray-400 mb-4">
                            Change role for <span className="text-[#F9F4F4] font-semibold">{selectedUser?.username}</span>
                        </p>
                        <p className="text-sm text-gray-500 mb-4">Current role: {getRoleBadge(selectedUser?.user_role)}</p>
                        <div className="flex flex-col gap-2 mb-4">
                            <button
                                onClick={() => handleRoleChange('user')}
                                disabled={actionLoading || selectedUser?.user_role === 'user'}
                                className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500 rounded hover:bg-blue-500/30 disabled:opacity-50"
                            >
                                Set as User
                            </button>
                            <button
                                onClick={() => handleRoleChange('moderator')}
                                disabled={actionLoading || selectedUser?.user_role === 'moderator'}
                                className="px-4 py-2 bg-purple-500/20 text-purple-400 border border-purple-500 rounded hover:bg-purple-500/30 disabled:opacity-50"
                            >
                                Set as Moderator
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                setShowRoleModal(false);
                                setSelectedUser(null);
                            }}
                            className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

export default AdminDashboard;