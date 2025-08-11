import { Copyright } from 'lucide-react';

function Footer({children}){ 
    return ( 
        <> 
        <footer className="bg-[#09090B] text-[#F9F4F4] w-full"> 
            <div className="flex font-SubHeading text-2xl text-center justify-center items-center gap-4 mb-4"> 
                {children}
            </div> 
            <div className="flex justify-center items-center gap-4 pb-4">  
                <Copyright />
                <h2 className="text-2xl text-center">HIPE-CYBER</h2> 
            </div>

        </footer>
        </>

    )
    
}


export default Footer