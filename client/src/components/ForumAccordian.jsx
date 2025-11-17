import { useState } from "react";

function ForumAccordian ({ channels, activeChannelId, onChannelSelect }) { 

    const [selected, setSelected] = useState(null);
    
    const toggle = (i) => { 
        if(selected === i){ 
            return setSelected(null);
        }
        setSelected(i);
    }

    const handleChatClick = (channelId, index) => {
        console.log('Chat button clicked for channel:', channelId);
        onChannelSelect(channelId);
      
        if (selected !== index) {
            setSelected(index);
        }
    };

    return ( 
        <>  
            <div id="accordian" className="w-72"> 
                {channels.map((channel, i) => ( 
                    <div 
                        key={channel.id} 
                        id="item" 
                        className={`mb-6 p-4 border-2 border-solid rounded-xl shadow-(--card-Shadow) cursor-pointer transition-all ${
                            activeChannelId === channel.id 
                                ? 'border-[#00A6FB] bg-[#00A6FB]/10' 
                                : 'border-[#00A6FB]'
                        }`}
                    >  
                        <div 
                            id="forum-title" 
                            className="flex justify-between items-center" 
                            onClick={() => toggle(i)}
                        >  
                            <h1 className="font-Heading text-[#F9F4F4]">{channel.name}</h1>
                            <span className="text-[#F9F4F4]"> 
                                {selected === i ? '−' : '+'}
                            </span>
                        </div> 

                        <div 
                            id="forum-desc" 
                            className={`transition-all overflow-hidden ${
                                selected === i 
                                    ? 'max-h-96 opacity-100 mt-4' 
                                    : 'max-h-0 opacity-0'
                            }`}
                        > 
                            <p className="font-Text text-[#F9F4F4]">{channel.description}</p>
                        </div>

                        <div id="forum-button" className={`transition-all overflow-hidden ${
                            selected === i 
                                ? 'max-h-20 opacity-100 mt-2' 
                                : 'max-h-0 opacity-0'
                        }`}>  
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    handleChatClick(channel.id, i);
                                }}
                                className={`font-Text font-small text-center rounded-full h-6 w-32 cursor-pointer hover:scale-125 transition ${
                                    activeChannelId === channel.id
                                        ? 'bg-[#F9F4F4] text-[#00A6FB]'
                                        : 'bg-[#00A6FB] text-[#F9F4F4]'
                                }`}
                            >
                                {activeChannelId === channel.id ? 'Active' : 'Chat'}
                            </button>
                        </div> 
                    </div>
                ))}
            </div>
        </>
    )
}





export default ForumAccordian;