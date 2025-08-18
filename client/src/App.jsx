import './App.css'
import LandingPage from './pages/LandingPage'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserProfile, useUser } from "@clerk/clerk-react";
import UserProfilePage from './pages/UserProfilePage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import InProgressPage from './pages/InProgressPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import UserFormPage from './pages/UserFormPage';
import { useUserPreferences } from './hooks/useUserPreferences';
import { useState, useEffect } from 'react';

// Simple ProtectedRoute component
const ProtectedRoute = ({ children, requiresForm = false }) => {
    const { isSignedIn, isLoaded } = useUser();
    
    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    
    if (!isSignedIn) {
        return <Navigate to="/sign-in" replace />;
    }
    
    if (requiresForm) {
        return <FormProtectedRoute>{children}</FormProtectedRoute>;
    }
    
    return children;
};

// Component that checks if user has completed the form
const FormProtectedRoute = ({ children }) => {
    const { hasPreferences, hasCheckedPreferences, isLoading } = useUserPreferences();
    
    if (isLoading || !hasCheckedPreferences) {
        return <div>Loading preferences...</div>;
    }
    
    if (!hasPreferences) {
        return <Navigate to="/user-form" replace />;
    }
    
    return children;
};


const FormChecker = () => {
    const { isSignedIn, isLoaded } = useUser();
    const { hasPreferences, hasCheckedPreferences, isLoading } = useUserPreferences();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    if (!isLoaded || isLoading || !hasCheckedPreferences || !mounted) {
        return <div>Loading preferences...</div>;
    }

    if (!isSignedIn) {
        return <Navigate to="/sign-in" replace />;
    }

    if (!hasPreferences) {
        return <Navigate to="/user-form" replace />;
    }

    return <Navigate to="/" replace />;
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
                
                {/* Protected routes */}
                <Route 
                    path="/profile" 
                    element={
                        <ProtectedRoute requiresForm={true}>
                            <UserProfilePage />
                        </ProtectedRoute>
                    } 
                />
                
                {/* User form - only requires authentication, not form completion */}
                <Route
                    path="/user-form"
                    element={
                        <ProtectedRoute>
                            <UserFormPage />
                        </ProtectedRoute>
                    }
                />
                
                {/* Form checker route - requires authentication */}
                <Route
                    path="/check-form"
                    element={
                        <ProtectedRoute>
                            <FormChecker />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;



















