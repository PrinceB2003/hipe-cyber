import './App.css'
import LandingPage from './pages/LandingPage'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserProfile, useUser } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import InProgressPage from './pages/InProgressPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import CurrentEventPage from './pages/CurrentEventPage';
import { useUserPreferences } from './hooks/useUserPreferences';
import { useState, useEffect } from 'react';
import Tos from './pages/Tos';
import ProfilePage from './pages/ProfilePage';



// Simple ProtectedRoute component
const ProtectedRoute = ({ children, requiresForm = false }) => {
    const { isSignedIn, isLoaded } = useUser();
    
    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    
    if (!isSignedIn) {
        return <Navigate to="/sign-in" replace />;
    }
    
   
    
    return children;
};






function App() {
    console.log("App component rendering");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/under-construction" element={<InProgressPage />} />
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/current-events" element={<CurrentEventPage/>} />
                <Route path="/tos" element={<Tos/>} />

                {/* Protected routes */}
                <Route 
                    path="/profile" 
                    element={
                        
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    } 
                />
                
                
            </Routes>
        </BrowserRouter>
    );
}

export default App;



















