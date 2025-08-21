import { Wrench } from 'lucide-react';


function InProgressPage(){ 
    return( 
        <> 
        <div className= "min-h-screen flex flex-col font-Heading items-center justify-center bg-[#09090B] text-[white]"> 
            <Wrench size={256} color={"#00A6FB"} className='animate-pulse'/>
            <h1 className="text-4xl font-SubHeading font-bold mb-4"> Feature Under Construction </h1>
            <h2> Coming Soon!</h2>
    </div>
        
        </>
    )
} 

export default InProgressPage;