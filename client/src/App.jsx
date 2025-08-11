import './App.css'
import LandingPage from './pages/LandingPage'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserProfile } from "@clerk/clerk-react";
import UserProfilePage from './pages/UserProfilePage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import InProgressPage from './pages/InProgressPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

function App() {

  return ( 
    <> 
    <BrowserRouter> 
      
    

      <Routes> 
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/under-construction" element={<InProgressPage/>} />
        <Route path="/sign-in" element={<SignInPage/>} /> 
        <Route path="/sign-up" element={<SignUpPage/>} />
        <Route 
          path="/profile" 
          element={ 
            <SignedIn>  
              <UserProfilePage/>  
            </SignedIn> || <Navigate to = "/" /> 
          }  
        /> 
      </Routes> 
    </BrowserRouter> 
  </>
  );
}

export default App
