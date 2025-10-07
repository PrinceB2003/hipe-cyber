import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

function SignUpPage() {
  return (
    <>
      <NavBar>
        <a href="/" className="hover:text-[#00A6FB]">Home</a>
      </NavBar>
      <div className="flex justify-center items-center min-h-screen w-full bg-[#09090B]">
        <div className="flex flex-col items-center">
          <SignUp signUpForceRedirectUrl="/profile"
                  fallbackRedirectUrl="/profile" />
          <p className="text-[#F9F4F4] text-sm mt-4 text-center">
            By agreeing to sign up, you agree to our{' '}
            <Link 
              to="/tos" 
              className="text-[#00A6FB] hover:underline hover:text-blue-400"
            >
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;












