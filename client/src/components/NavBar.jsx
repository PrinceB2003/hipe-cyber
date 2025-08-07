
function NavBar({children}){ 
    return( 
        <> 
        <header className="bg-[#09090B] text-[#F9F4F4]"> 
        <div className="flex justify-end gap-4 pt-2 pr-2 text-2xl"> 
           {children} 
        </div>
        </header>
        
        
        </>
    )


} 

export default NavBar