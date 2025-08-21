
function SmallHeroCard({children}){ 
    return ( 
        <> 
        <div className="h-72 w-96 bg-color[#09090B] text-[#F9F4F4] font-SubHeading border-[#00A6FB] 
                        border-solid border-2 rounded-xl flex flex-col  items-center gap-2 text-wrap 
                        p-2 shadow-(--card-Shadow)" 
                        > 
            {children}
        </div>
        
        
        </>

    )

}

export default SmallHeroCard