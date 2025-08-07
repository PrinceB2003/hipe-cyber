import './App.css'
import LandingPage from './pages/LandingPage'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserProfile } from "@clerk/clerk-react";
import UserProfilePage from './pages/UserProfilePage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 

function App() {

  return ( 
    <> 
    <BrowserRouter> 
      {/* <header>  
        <SignedOut> 
          <SignInButton/>
        </SignedOut>

        <SignedIn> 
          <UserButton/>
        </SignedIn>
      </header> */}
    

      <Routes> 
        <Route path="/" element={<LandingPage />} /> 
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
