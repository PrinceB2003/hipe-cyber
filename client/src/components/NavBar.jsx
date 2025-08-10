
function NavBar({children}){ 
    return( 
        <> 
        <header className="bg-[#09090B] text-[#F9F4F4]"> 
        <div className="flex justify-between items-center pl-2 pt-4 pr-2 font-SubHeading text-2xl">   
           <div> 
                <img  
                    src="https://thehipe.org/wp-content/uploads/2025/04/HIPELOGO-filled-white.png" 
                    width={100}
                    height={100} 
                />
           </div>  

           <div className="flex  item-center gap-4"> 
            {children} 
           </div>
        </div>
        </header>
        
        
        </>
    )


} 

export default NavBar