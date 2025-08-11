import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import NavBar from '../components/NavBar';

function SignInPage() {
  return ( 
  <>
      <NavBar> 
        <a href="/" className="hover:text-[#00A6FB]"> Home</a> 
      </NavBar>
      <div className="flex justify-center items-center min-h-screen w-full bg-[#09090B]"> 
        <SignIn/>
      </div> 
    

  </>
      
  );
}

export default SignInPage;