import { useState } from "react";


function ForumAccordian () { 

    const [selected,setSelected] = useState(null);
    

    const toggle = (i) => { 

        if(selected === i){ 
            return setSelected(null);
        }

        setSelected(i);
    }
    
    const forumCardInfo=[ 

        { 
            title:"Daily Cybersecurity Event", 
            desc:"Daily discussion related to a posted daily cybersecurity event or news"
        }, 

        { 
            title:"Career Advice",
            desc:"Users can explore job opportunities, get certification guidance, share interview experiences, and receive career advice from the community. "
        }, 

        { 
            title:"Learning Advice",
            desc:"Users can discover and share courses, tutorials, labs, practice environments, and study materials to build their cybersecurity skills." 
        }, 
        
        { 
            title:"Connect with Others",
            desc:"Users can connect with others for CTFs, conferences, study groups, hackathons, and team formation​" 
        }, 

        { 
            title:"More Channels", 
            desc:"More Channels, coming soon!"

        }

        
    ]
    
    






    return ( 
        <>  
                <div id="accordian" className="w-72"> 
                    {forumCardInfo.map((item,i) => ( 
                        <div id="item" className="mb-6  p-4 border-[#00A6FB] border-solid border-2 rounded-xl shadow-(--card-Shadow) cursor-pointer">  
                            <div id="forum-title" className="flex justify-between items-center" onClick={()=>toggle(i)}>  
                                <h1 className="font-Heading text-[#F9F4F4]">{item.title}</h1>
                                <span className=" text-[#F9F4F4]"> 
                                    {selected === i ? '−' : '+'}
                                </span>
                            </div> 

                            <div id="forum-desc" className={`transition-all overflow-hidden ${
                                selected === i 
                                    ? 'max-h-96 opacity-100 mt-4' 
                                    : 'max-h-0 opacity-0'
                            }`}> 
                                <p className="font-Text text-[#F9F4F4]">{item.desc}</p>
                            </div>

                            <div id="forum-button">  
                                <button className="font-Text font-small text-center text-[#F9F4F4] rounded-full bg-[#00A6FB] h-6 w-32  cursor-pointer hover:scale-125 transition mb-2 mt-2">Chat</button>
                            </div> 
                        </div>

                    ))}
                </div>
        
        </>
    )

}


export default ForumAccordian;