function EventCard({children}) { 
    return ( 
            <> 
                <div className="h-48 w-36 bg-[#09090B] text-[#F9F4F4] font-SubHeading border-[#00A6FB] 
                        border-solid border-2 rounded-xl flex flex-col  items-center gap-2 text-wrap 
                        p-2 shadow-(--card-Shadow)" 
                        > 
                     {children}
                      
                         
                            
                </div>
            </>

    )





} 

export default EventCard