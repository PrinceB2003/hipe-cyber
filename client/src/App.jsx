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
import EventsPage from './pages/EventsPage';
import EventForm from './components/EventForm';
import ForumPage from './pages/ForumPage'
import LearnPage from './pages/LearnPage'; 
import ITResourcePage from './pages/ITResourcesPage';
import NetworkResourcePage from './pages/NetworkResourcePage';
import OsResourcePage from './pages/OsResourcesPage';
import SecurityResourcePage from './pages/SecurityResources';
import CloudResourcePage from './pages/CloudResourcesPage';
import AdminDashboard from './pages/AdminDashboard'; // NEW

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
                <Route path="/events" element={<EventsPage/>}/>
                <Route path="/eventform" element={<EventForm/>}/>
                <Route path="/forum" element={<ForumPage/>}/> 
                <Route path="/learn" element={<LearnPage/>}/>
                <Route path="/IT-Resources" element={<ITResourcePage/>}/>
                <Route path="/Network-Resources" element={<NetworkResourcePage/>}/> 
                <Route path="/OS-Resources" element={<OsResourcePage/>}/>
                <Route path="/Security-Resources" element={<SecurityResourcePage/>}/>
                <Route path="/Cloud-Resources" element={<CloudResourcePage/>}/>
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
                
                {/* NEW: Admin Dashboard Route */}
                <Route 
                    path="/admin" 
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
























// import './App.css'
// import LandingPage from './pages/LandingPage'
// import { SignedIn, SignedOut, SignInButton, SignOutButton, UserProfile, useUser } from "@clerk/clerk-react";
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import InProgressPage from './pages/InProgressPage';
// import SignInPage from './pages/SignInPage';
// import SignUpPage from './pages/SignUpPage';
// import CurrentEventPage from './pages/CurrentEventPage';
// import { useUserPreferences } from './hooks/useUserPreferences';
// import { useState, useEffect } from 'react';
// import Tos from './pages/Tos';
// import ProfilePage from './pages/ProfilePage';
// import EventsPage from './pages/EventsPage';
// import EventForm from './components/EventForm';
// import ForumPage from './pages/ForumPage'
// import LearnPage from './pages/LearnPage'; 
// import ITResourcePage from './pages/ITResourcesPage';
// import NetworkResourcePage from './pages/NetworkResourcePage';
// import OsResourcePage from './pages/OsResourcesPage';
// import SecurityResourcePage from './pages/SecurityResources';
// import CloudResourcePage from './pages/CloudResourcesPage';





// // Simple ProtectedRoute component
// const ProtectedRoute = ({ children, requiresForm = false }) => {
//     const { isSignedIn, isLoaded } = useUser();
    
//     if (!isLoaded) {
//         return <div>Loading...</div>;
//     }
    
//     if (!isSignedIn) {
//         return <Navigate to="/sign-in" replace />;
//     }
    
   
    
//     return children;
// };






// function App() {
//     console.log("App component rendering");

//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<LandingPage />} />
//                 <Route path="/under-construction" element={<InProgressPage />} />
//                 <Route path="/sign-in" element={<SignInPage />} />
//                 <Route path="/sign-up" element={<SignUpPage />} />
//                 <Route path="/current-events" element={<CurrentEventPage/>} />
//                 <Route path="/events" element={<EventsPage/>}/>
//                 <Route path="/eventform" element={<EventForm/>}/>
//                 <Route path="/forum" element={<ForumPage/>}/> 
//                 <Route path="/learn" element={<LearnPage/>}/>
//                 <Route path="/IT-Resources" element={<ITResourcePage/>}/>
//                 <Route path="/Network-Resources" element={<NetworkResourcePage/>}/> 
//                 <Route path="/OS-Resources" element={<OsResourcePage/>}/>
//                 <Route path="/Security-Resources" element={<SecurityResourcePage/>}/>
//                 <Route path="/Cloud-Resources" element={<CloudResourcePage/>}/>
//                 <Route path="/tos" element={<Tos/>} />

//                 {/* Protected routes */}
//                 <Route 
//                     path="/profile" 
//                     element={
                        
//                         <ProtectedRoute>
//                             <ProfilePage />
//                         </ProtectedRoute>
//                     } 
//                 />
                
                
//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default App;



















