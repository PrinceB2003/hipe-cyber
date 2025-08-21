import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SlideInText from "../components/SlideInText";
import { useUserPreferences } from "../hooks/useUserPreferences";
import { useNavigate } from "react-router-dom"; 
import { useClerk } from '@clerk/clerk-react';

function UserProfilePage(){ 
    const { preferences, isLoading, user, isUserLoaded, hasPreferences } = useUserPreferences();
    const navigate = useNavigate(); 
    const { signOut } = useClerk(); 

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/'); 
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const getCareerGoalDisplay = (value) => {
        const mapping = {
            'Internship': 'Looking for an internship',
            'First-role': 'Looking for your first role',
            'Switch': 'Switching Careers'
        };
        return mapping[value] || value || 'N/A';
    };

    const getTechnicalExperienceDisplay = (value) => {
        const mapping = {
            'None': 'None - No Experience',
            'Beginner': 'Beginner — I\'ve done a few projects or courses',
            'Intermediate': 'Intermediate — I\'ve applied skills on real-world projects',
            'Advanced': 'Advanced — I have professional experience and have led complex projects'
        };
        return mapping[value] || value || 'N/A';
    };

    const getTechnicalKnowledgeDisplay = (value) => {
        const mapping = {
            'None': 'None — I\'m just getting started',
            'Beginner': 'Beginner - I\'m learning the basics',
            'Intermediate': 'Intermediate — I understand most core concepts',
            'Advanced': 'Advanced — I have strong expertise in multiple areas'
        };
        return mapping[value] || value || 'N/A';
    };

    const getCybersecurityFamiliarityDisplay = (value) => {
        const mapping = {
            'None': 'Not familiar',
            'Some': 'Somewhat familiar — I\'ve learned a few basics',
            'Familiar': 'Familiar — I\'ve used tools or studied security concepts',
            'Very-Familiar': 'Very Familiar — I have hands-on security experience'
        };
        return mapping[value] || value || 'N/A';
    };



    const getCybersecurityInterestDisplay = (value) => {
    const mapping = {
        'network-security': 'Network Security',
        'cloud-security': 'Cloud Security',
        'application-security': 'Application Security',
        'information-security': 'Information Security',
        'grc': 'Governance, Risk, and Compliance (GRC)',
        'soc': 'Security Operations (SOC)',
        'incident-response': 'Incident Response',
        'threat-hunting': 'Threat Hunting',
        'penetration-testing': 'Penetration Testing / Ethical Hacking',
        'red-team': 'Red Team Operations',
        'blue-team': 'Blue Team Operations',
        'digital-forensics': 'Digital Forensics',
        'iam': 'Identity and Access Management (IAM)',
        'cryptography': 'Cryptography',
        'malware-analysis': 'Malware Analysis',
        'endpoint-security': 'Endpoint Security',
        'vulnerability-management': 'Vulnerability Management',
        'devsecops': 'DevSecOps',
        'iot-security': 'IoT Security',
        'policy-strategy': 'Cybersecurity Policy and Strategy'
        };
        return mapping[value] || value || 'N/A';
    };

    const handleUpdatePreferences = () => {
        navigate('/user-form', { 
            state: { 
                editMode: true,
                returnTo: '/profile'
            }
        });
    };


    if (!isUserLoaded || isLoading) {
        return (
            <>
                <div className="min-h-screen w-full flex flex-col">
                    <NavBar>
                        <a href="/" className="hover:text-[#00A6FB]"> Home</a>
                    </NavBar>
                    
                    <div className="flex justify-center items-center flex-1">
                        <div className="text-4xl font-SubHeading text-[#09090B]">Loading your profile...</div>
                    </div>
                    
                    <Footer />
                </div>
            </>
        );
    }


    return ( 
            <>  
                <div className="min-h-screen w-full flex flex-col"> 
                <NavBar> 
                    <a href="/" className="hover:text-[#00A6FB]"> Home</a> 
                    
                    <button 
                        onClick={handleSignOut} 
                        className="hover:text-[#00A6FB] cursor-pointer bg-transparent border-none text-inherit"
                    > 
            Sign out
        </button>
                </NavBar>  
                
                <div id="" className=" flex justify-center item-center ">  
                     
                    <SlideInText> 
                        <div id="profile-container"  
                        className="h-[56rem] w-[60rem] bg-[#F9F4F4] text-[#09090B] rounded-2xl flex flex-col justify-center items-center gap-8"> 
                            <div className="mt-8 pl-4 pr-4 "> 
                                <h1 className="font-Heading font-bold text-5xl">Your Profile</h1> 
                            </div> 

                            <div className=" pl-4 pr-4"> 
                               <h2 className="font-SubHeading font-semibold text-4xl"> 
                                    Name: {user?.fullName || user?.firstName || 'N/A'}
                               </h2>  
                            </div> 

                            <div className="pl-4 pr-4"> 
                                <h2 className="font-SubHeading font-semibold text-4xl">  
                                    Member since: {preferences?.created_at ? 
                                    new Date(preferences.created_at).toLocaleDateString() : 'Recently joined'}
                                </h2>
                            </div>

                            <div className="pl-4 pr-4"> 
                              <h2 className="font-SubHeading font-semibold text-4xl">Your Preferences</h2>   
                            </div> 

                            <div className="pl-4 pr-4"> 
                                <p className="font-Text font-medium text-2xl">
                                    CUNY Campus: {preferences?.college || 'N/A'}
                                </p>  
                            </div > 

                            <div className="pl-4 pr-4"> 
                                <p className="font-Text font-medium text-2xl">
                                     Major: {preferences?.major || 'N/A'}
                                </p>  
                            </div>
                                
                            <div className="pl-4 pr-4"> 
                                 <p className="font-Text font-medium text-2xl">  
                                    Interested Industry: {preferences?.interested_industry || 'N/A'}
                                 </p>
                            </div>  


                            <div className="pl-4 pr-4"> 
                                <p className="font-Text font-medium text-2xl"> 
                                    Cybersecurity Interest: {getCybersecurityInterestDisplay(preferences?.cybersecurity_interest)}
                                </p>
                            </div>

                            <div className="pl-4 pr-4"> 
                                 <p className="font-Text font-medium text-2xl ">  
                                    Your Career Goals: {getCareerGoalDisplay(preferences?.career_goals)}
                                 </p>
                            </div>
                            
                            <div className="pl-4 pr-4"> 
                                <p className="font-Text font-medium text-2xl"> 
                                    Technical Experience: {getTechnicalExperienceDisplay(preferences?.technical_experience)}
                                </p> 
                            </div>
                            
                            <div className="pl-4 pr-4"> 
                                <p className="font-Text font-medium text-2xl">  
                                    Technical Knowledge: {getTechnicalKnowledgeDisplay(preferences?.technical_knowledge)}
                                </p>
                            </div> 

                            <div className="pl-4 pr-4"> 
                                <p className="font-Text font-medium text-2xl"> 
                                    Cybersecurity Familiarity: {getCybersecurityFamiliarityDisplay(preferences?.cybersecurity_familiarity)}
                                </p>
                            </div>
        
                            <div className="pl-4 pr-4 mb-8"> 
                                <button 
                                    onClick={handleUpdatePreferences} 
                                    className="font-SubHeading font-semibold text-2xl rounded-full bg-[#00A6FB]  
                                                   text-[#F9F4F4] h-1xl w-fit p-4 cursor-pointer hover:scale-125  
                                                   transition flex items-center justify-center" 
                                                   >  
                                    Update Your Preferences 
                                </button>
                            </div>
                            
                        </div>
                    </SlideInText>
                </div> 

                <Footer />
            </div>        
             
            
            </>



    )


}

export default UserProfilePage;