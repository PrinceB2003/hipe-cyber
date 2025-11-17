import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ForumAccordian from "../components/ForumAccordian";
import { Link,useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { useUser } from "@clerk/clerk-react";
import SlideInText from "../components/SlideInText";
import { supabase } from "../lib/supabase";
import { useState, useEffect, useRef } from "react";
import { Hash, Loader2, Trash2 } from 'lucide-react';

function ForumPage () { 

    const { signOut, isSignedIn } = useClerk(); 
    const navigate = useNavigate(); 
    const { user, isLoaded } = useUser(); 
    const [channels, setChannels] = useState([]);
    const [activeChannelId, setActiveChannelId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [hasMoreMessages, setHasMoreMessages] = useState(true);
    const [offset, setOffset] = useState(0);
     const [deletingMessageId, setDeletingMessageId] = useState(null);
    

    const messagesEndRef = useRef(null);
    const messageListRef = useRef(null);
    const subscriptionRef = useRef(null);




    const handleSignOut = async () => {
            try {
                await signOut();
                navigate('/'); 
            } catch (error) {
                console.error('Error signing out:', error);
            }
        };

        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        };

        useEffect(() => {
        const fetchChannels = async () => {
            const { data, error } = await supabase
                .from('channels')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) {
                console.error('Error fetching channels:', error);
                return;
            }

            setChannels(data);
            
            // Set first channel as active by default
            if (data && data.length > 0) {
                setActiveChannelId(data[0].id);
            }
        };

        fetchChannels();
    }, []);



        const fetchMessages = async (channelId, loadMore = false) => {
        setLoading(true);
        
        const currentOffset = loadMore ? offset : 0;
        const limit = 50;

        const { data, error } = await supabase
            .from('messages')
            .select(`
                *,
                 user_preferences (
                    user_role,
                    first_name,
                    last_name
                )
            `)
            .eq('channel_id', channelId)
            .order('created_at', { ascending: false })
            .range(currentOffset, currentOffset + limit - 1);

        if (error) {
            console.error('Error fetching messages:', error);
            setLoading(false);
            return;
        }

       
        const reversedData = data.reverse();

        if (loadMore) {
            setMessages(prev => [...reversedData, ...prev]);
        } else {
            setMessages(reversedData);
        }

        setHasMoreMessages(data.length === limit);
        
        if (loadMore) {
            setOffset(prev => prev + limit);
        } else {
            setOffset(limit);
        }

        setLoading(false);
    };

        const setupSubscription = (channelId) => {
    // Clean up existing subscription
    if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
    }

    // Create new subscription
        const subscription = supabase
            .channel(`channel:${channelId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `channel_id=eq.${channelId}`,
                },
                async (payload) => {
                   
                    const { data, error } = await supabase
                        .from('messages')
                        .select(`
                            *,
                            user_preferences!user_id (
                                user_role,
                                first_name,
                                last_name
                            )
                        `)
                        .eq('id', payload.new.id)
                        .single();

                    if (!error && data) {
                        setMessages(prev => [...prev, data]);
                        
                    
                        setTimeout(() => {
                            if (messageListRef.current) {
                                const { scrollTop, scrollHeight, clientHeight } = messageListRef.current;
                                const isNearBottom = scrollHeight - scrollTop - clientHeight < 200;
                                
                                if (isNearBottom) {
                                    scrollToBottom();
                                }
                            }
                        }, 100);
                    }
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'DELETE',
                    schema: 'public',
                    table: 'messages',
                    filter: `channel_id=eq.${channelId}`,
                },
                (payload) => {
                 
                    setMessages(prev => prev.filter(msg => msg.id !== payload.old.id));
                }
            )
            .subscribe();

        subscriptionRef.current = subscription;
    };
        useEffect(() => {
            if (!activeChannelId) return;

            // Fetch messages for new channel
            fetchMessages(activeChannelId);

            // Setup real-time subscription
            setupSubscription(activeChannelId);

           
            setTimeout(scrollToBottom, 300);

            // Cleanup function
            return () => {
                if (subscriptionRef.current) {
                    subscriptionRef.current.unsubscribe();
                }
            };
        }, [activeChannelId]);

            const handleSendMessage = async () => {
            if (!newMessage.trim() || !user || !activeChannelId || sending) return;

            setSending(true);

            const { error } = await supabase
                .from('messages')
                .insert({
                    channel_id: activeChannelId,
                    user_id: user.id,
                    content: newMessage.trim(),
                });

            if (error) {
                console.error('Error sending message:', error);
                alert('Failed to send message. Please try again.');
                setSending(false);
                return;
            }

          
            setNewMessage('');
            setSending(false);
        };


        const handleDeleteMessage = async (messageId) => {
            if (!user || deletingMessageId) return;

            const confirmDelete = window.confirm('Are you sure you want to delete this message?');
            if (!confirmDelete) return;

            setDeletingMessageId(messageId);

            try {
                const { error } = await supabase
                    .from('messages')
                    .delete()
                    .eq('id', messageId);

                if (error) {
                    console.error('Error deleting message:', error);
                    alert('Failed to delete message. Please try again.');
                    setDeletingMessageId(null);
                    return;
                }

                setMessages(prev => prev.filter(msg => msg.id !== messageId));
                setDeletingMessageId(null);
            } catch (error) {
                console.error('Error deleting message:', error);
                alert('Failed to delete message. Please try again.');
                setDeletingMessageId(null);
            }
        };

        const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        } 
        }

        const handleLoadMore = () => {
            if (!loading && hasMoreMessages) {
                fetchMessages(activeChannelId, true);
            }
        }; 

         

            const formatTimestamp = (timestamp) => {
           
            const date = new Date(timestamp);
            const now = new Date();
            
            
            const isToday = date.toDateString() === now.toDateString();

            if (isToday) {
                return date.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                });
            } else {
                return date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
                });
            }
        };

        const getActiveChannel = () => {
            return channels.find(c => c.id === activeChannelId);
        };


        return (  
                <>
                    <NavBar className> 
                        <a href="/" className="hover:text-[#00A6FB]"> Home</a>
        
                        <Link to="/#features" className="hover:text-[#00A6FB]">Features</Link>
                        <Link to="/profile" className="hover:text-[#00A6FB]">{isSignedIn?"Profile":""}</Link> 

                        <button 
                            onClick={handleSignOut} 
                            className="hover:text-[#00A6FB] cursor-pointer bg-transparent border-none text-inherit"
                        > 
                            {isSignedIn? "Sign out" : ""}
                        </button>
                    </NavBar> 

                <SlideInText> 
                    <div className="text-center mt-32 mb-4"> 
                        <h1 className="font-Heading text-5xl text-[#F9F4F4] hover:text-[#00A6FB] hover:scale-125 transition  ">Welcome to the forum!</h1>
                    </div> 
                    <div className="text-center mb-4"> 
                        <h2 className="font-SubHeading text-2xl text-[#F9F4F4] animate-pulse"> A place to connect and grow together.</h2>
                    </div> 
                    
                    <div id="wrapper" className="flex justify-center items-center gap-8 mt-8 mb-16"> 
                        <div id="forum-accordian" > 
                            <ForumAccordian  
                            channels={channels}
                            activeChannelId={activeChannelId}
                            onChannelSelect={setActiveChannelId} 
                            />
                        </div>
                        
                        <div id="chat-screen" className=" flex flex-col h-[42rem] w-[40rem] justify-between  border-[#00A6FB] border-solid border-2 rounded-xl">
                            
                            {activeChannelId && getActiveChannel() && (
                            <div className="bg-[#09090B] border-b-2 border-[#00A6FB] p-4">
                                <div className="flex items-center gap-2">
                                    <Hash className="text-[#00A6FB]" size={20} />
                                    <h3 className="text-lg font-bold text-[#F9F4F4]">
                                        {getActiveChannel()?.name}
                                    </h3>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    {getActiveChannel()?.description}
                                </p>
                            </div>
                        )}



                           
                        <div 
                            ref={messageListRef}
                            id="messages-area" 
                            className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#09090B]  "
                        >
                            {/* Load More Button */}
                            {hasMoreMessages && messages.length > 0 && (
                                <div className="text-center pb-2">
                                    <button
                                        onClick={handleLoadMore}
                                        disabled={loading}
                                        className="px-4 py-2 bg-[#00A6FB]/20 text-[#00A6FB] border border-[#00A6FB] rounded-lg hover:bg-[#00A6FB]/30 transition-colors text-sm disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <Loader2 className="animate-spin" size={16} />
                                                Loading...
                                            </span>
                                        ) : 'Load More'}
                                    </button>
                                </div>
                            )}

                      
                            {loading && messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <Loader2 className="animate-spin mb-2" size={32} />
                                    <p>Loading messages...</p>
                                </div>
                            )}

                         
                            {!loading && messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <Hash className="mb-2 opacity-50" size={48} />
                                    <p>No messages yet.</p>
                                    <p className="text-sm">Start the conversation!</p>
                                </div>
                            )}

                            {messages.map((message) => {
                                const isOwnMessage = user && message.user_id === user.id;
                                
                                return (
                                    <div key={message.id} className="mb-3 group">
                                       
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className="font-semibold text-[#F9F4F4] text-sm">
                                                {isOwnMessage 
                                                ? (user.fullName || user.username || 'You')
                                                : `${message.user_preferences?.first_name || ''} ${message.user_preferences?.last_name || ''}`.trim() || 'User'
                                                }
                                            </span>
                                            <span className="text-[#F9F4F4] text-sm">-</span>
                                            <span className="text-[#00A6FB] text-sm">
                                                {message.user_preferences?.user_role || ''}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {formatTimestamp(message.created_at)}
                                            </span>

                                            {isOwnMessage && (
                                                <button
                                                    onClick={() => handleDeleteMessage(message.id)}
                                                    disabled={deletingMessageId === message.id}
                                                    className="text-red-500 text-xs hover:text-red-400 transition ml-2 opacity-0 group-hover:opacity-100 flex items-center gap-1"
                                                >
                                                    {deletingMessageId === message.id ? (
                                                        <Loader2 className="animate-spin" size={12} />
                                                    ) : (
                                                        <Trash2 size={12} />
                                                    )}
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                        
                                   
                                        <p className="text-[#F9F4F4] text-sm break-words pl-0">
                                            {message.content}
                                        </p>
                                    </div>
                                );
                            })}
                            
                            <div ref={messagesEndRef} />
                        </div>
                            
                             
                            <div className="flex gap-2 ml-2 mb-2 mr-2"> 
                                {isLoaded && user ? (
                                <>
                                    <input  
                                        className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] flex-1 rounded-sm px-3 py-2 focus:outline-none focus:border-[#00A6FB]"  
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder={`Message #${getActiveChannel()?.name || 'channel'}...`}
                                        disabled={!activeChannelId || sending}
                                    />
                                    <button 
                                        onClick={handleSendMessage}
                                        disabled={!activeChannelId || sending || !newMessage.trim()}
                                        className="bg-[#00A6FB] text-[#F9F4F4] h-12 w-24 rounded-lg hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center"
                                    >
                                        {sending ? (
                                            <Loader2 className="animate-spin" size={20} />
                                        ) : 'Send'}
                                    </button>
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                                    <Link to="/sign-in" className="text-[#00A6FB] hover:underline">
                                        Sign in to chat
                                    </Link>
                                </div>
                            )}
                            </div>
                        </div>


                    </div>

                </SlideInText>    
                   
                 <Footer/>


                    

                </>



        )
        



    }



export default ForumPage;