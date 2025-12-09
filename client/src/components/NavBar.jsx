import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useCurrentUserData } from '../hooks/useCurrentUserData';

function NavBar({children}){ 
    const { currentUserData } = useCurrentUserData(); 

    return( 
        <> 
        <header className="bg-[#09090B] text-[#F9F4F4] fixed top-0 z-50 w-full "> 
        <div className="flex justify-between items-center pl-4 pt-4 pr-2 font-SubHeading text-2xl">   
           <div>  
               <a href="/"> 
                    <img  
                        src="https://thehipe.org/wp-content/uploads/2025/04/HIPELOGO-filled-white.png" 
                        width={100}
                        height={100} 
                    /> 
                </a>
           </div>  

           <div className="flex item-center pr-4 gap-8"> 
            {currentUserData?.user_role === 'admin' && (
                <Link to="/admin" className="text-[#F9F4F4] hover:text-[#00A6FB] flex items-center gap-1">
                    <Shield size={16} />
                    Admin
                </Link>
            )}
            {children} 
           </div>
        </div>
        </header>
        </>
    )
}

export default NavBar