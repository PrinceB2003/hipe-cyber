import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import NavBar from '../components/NavBar';

function SignUpPage() {
  return (
      <> 
      <NavBar> 
        <a href="/" className="hover:text-[#00A6FB]"> Home</a> 
      </NavBar> 
      <div className="flex justify-center items-center min-h-screen w-full bg-[#09090B]"> 
        <SignUp forceRedirectUrl="/check-form" />
      </div>
      </>

      
  );
}

export default SignUpPage;