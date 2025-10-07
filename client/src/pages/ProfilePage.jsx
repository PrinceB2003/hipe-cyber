import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SlideInText from "../components/SlideInText"
import { useState, useEffect } from 'react';
import { supabase } from "../lib/supabase";
import { useClerk } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';
import EventCard from "../components/EventCard";

function ProfilePage() { 
        const { signOut } = useClerk(); 
        const [userId, setUserId] = useState(null);
        const [loading, setLoading] = useState(false);
        const [isEditing, setIsEditing] = useState(false);
        const { user, isLoaded } = useUser();
        const [preferences, setPreferences] = useState({
            cuny_campus: '',
            major: [],
            minor: '',
            interested_industry: [],
            career_goals: '',
            technical_experience: '',
            technical_knowledge: '',
            cybersecurity_interest: [],
            cybersecurity_familiarity: '',
            certifications: [] ,
            created_at: null
        });


        const handleSignOut = async () => {
            try {
                await signOut();
                navigate('/'); 
            } catch (error) {
                console.error('Error signing out:', error);
            }
        };

    // Get current user on mount
        useEffect(() => {
            if (isLoaded && user) {
                setUserId(user.id);
                console.log('Clerk User ID:', user.id);
                loadPreferences(user.id);
            }
        }, [isLoaded, user]);


    // Load preferences from Supabase
        const loadPreferences = async (uid) => {
            const { data, error } = await supabase
                .from('user_preferences')
                .select('*')
                .eq('clerk_user_id', uid)
                .single();

            if (data) {
                setPreferences({
                    cuny_campus: data.cuny_campus || '',
                    major: data.major || [],
                    minor: data.minor || '',
                    interested_industry: data.interested_industry || [],
                    career_goals: data.career_goals || '',
                    technical_experience: data.technical_experience || '',
                    technical_knowledge: data.technical_knowledge || '',
                    cybersecurity_interest: data.cybersecurity_interest || [],
                    cybersecurity_familiarity: data.cybersecurity_familiarity || '',
                    certifications: data.certifications || [] , 
                    created_at: data.created_at || null
                });
            }
        };

    // Helper function to get selected values from multi-select
        const getSelectedValues = (selectId) => {
            const select = document.getElementById(selectId);
            return Array.from(select.selectedOptions).map(option => option.value);
        };

    // Helper function to get single select value
        const getSingleValue = (selectId) => {
            return document.getElementById(selectId).value;
        };

    // Save preferences to Supabase
        const handleUpdatePreferences = async () => {
            if (!userId) {
                alert('User not logged in');
                return;
            }

            setLoading(true);

            const updatedPreferences = {
                clerk_user_id: userId,
                cuny_campus: getSingleValue('cuny'),
                major: getSelectedValues('major'),
                minor: getSingleValue('minor'),
                interested_industry: getSelectedValues('industry'),
                career_goals: getSingleValue('career-goals'),
                technical_experience: getSingleValue('tech-exp'),
                technical_knowledge: getSingleValue('tech-knowledge'),
                cybersecurity_interest: getSelectedValues('cybersec-interest'),
                cybersecurity_familiarity: getSingleValue('security-Familiarity'),
                certifications: getSelectedValues('certs')
            };

            const { data, error } = await supabase
                .from('user_preferences')
                .upsert(updatedPreferences, { onConflict: 'clerk_user_id' });

            setLoading(false);

            if (error) {
                console.error('Error updating preferences:', error);
                alert('Failed to update preferences');
            } else {
                // Update local state and switch to view mode
                setPreferences({
                    cuny_campus: updatedPreferences.cuny_campus,
                    major: updatedPreferences.major,
                    minor: updatedPreferences.minor,
                    interested_industry: updatedPreferences.interested_industry,
                    career_goals: updatedPreferences.career_goals,
                    technical_experience: updatedPreferences.technical_experience,
                    technical_knowledge: updatedPreferences.technical_knowledge,
                    cybersecurity_interest: updatedPreferences.cybersecurity_interest,
                    cybersecurity_familiarity: updatedPreferences.cybersecurity_familiarity,
                    certifications: updatedPreferences.certifications, 
                    created_at: preferences.created_at
                });
                setIsEditing(false);
                alert('Preferences updated successfully!');
            }
        };

    // Helper to display array as comma-separated text
        const displayArray = (arr) => {
            if (!arr || arr.length === 0) return 'Not specified';
            return arr.join(', ');
        };

    // Helper to display single value
        const displayValue = (val) => {
            return val || 'Not specified';
        };






    return( 
        <>  
            <NavBar className=""> 
                    <a href="/" className="hover:text-[#00A6FB]"> Home</a> 
                    
                    <button 
                        onClick={handleSignOut} 
                        className="hover:text-[#00A6FB] cursor-pointer bg-transparent border-none text-inherit"
                    > 
                        Sign out
                    </button>
            </NavBar> 

            

      
        <SlideInText> 
                <div id="profile-container" className="h-[55rem]  w-[75rem]   mt-24 rounded-xl place-self-center bg-white mt-16 mb-16"> 

                <div className=" mb-4"> 
                    <h1 className="font-Heading text-end text-2xl pt-2 pr-8 mb-8">{user?.firstName}'s Profile</h1>
                </div>
                <div className="mb-4"> 
                    <h1 className="font-SubHeading text-center text-2xl">Welcome, to your Profile {user?.firstName}!</h1>     
                </div> 

                <div className="mb-4"> 
                    <h2 className="font-SubHeading text-center text-xl ">You've been a member since {preferences?.created_at ? new Date(preferences.created_at).toLocaleDateString() : 'N/A'}!</h2>    
                </div>

                <div className="mb-8"> 
                    <h1 className="font-SubHeading text-center text-2xl">Your Preferences</h1>
                    <hr className></hr>
                </div>





            

                {!isEditing ? (
                // VIEW MODE 
                    
                    <div> 
                        <div id="text-container" className="flex gap-8 justify-center pl-1">
                            <div id="left-col"> 
                                <p className="font-Text text-2xl">CUNY Campus: {displayValue(preferences.cuny_campus)}</p>
                                <p className="font-Text text-2xl">Major: {displayArray(preferences.major)}</p>
                                <p className="font-Text text-2xl">Minor: {displayValue(preferences.minor)}</p>
                                <p className="font-Text text-2xl">Interested Industry: {displayArray(preferences.interested_industry)} </p>
                                <p className="font-Text text-2xl">Career Goals: {displayValue(preferences.career_goals)} </p>          
                            </div> 

                            <div id="right-col"> 
                                <p className="font-Text text-2xl">Technical Experience: {displayValue(preferences.technical_experience)} </p>
                                <p className="font-Text text-2xl">Technical Knowledge: {displayValue(preferences.technical_knowledge)} </p>
                                <p className="font-Text text-2xl">Cybersecurity Interest: {displayArray(preferences.cybersecurity_interest)}</p>
                                <p className="font-Text text-2xl">Cybersecurity Familiarity: {displayValue(preferences.cybersecurity_familiarity)} </p>
                                <p className="font-Text text-2xl">Certifications: {displayArray(preferences.certifications)} </p>
                            </div>
                        </div>
                        
                        <div id="editbutton-container" className="place-self-center mt-8 mb-8"> 
                            <button
                                onClick={() => setIsEditing(true)} 
                                className="font-text font-semibold text-lg rounded-full bg-[#00A6FB]  
                                            text-[#F9F4F4] h-xl w-fit p-2 cursor-pointer"
                                >
                                    Edit Preferences
                            </button>  
                        </div>
                    </div>
                ) : (

                    <div id="pref-container" className="flex justify-center pl-8 pr-8 ">
                        <div id="left-col"> 
                            <div id="campus" className="mb-2"> 
                                <label htmlFor="CunyCampus" className="font-SubHeading font-medium text-base">Which CUNY do you attend?</label> 
                                <select id="cuny" defaultValue={preferences.cuny_campus} 
                                    className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm">  
                                        <option value="">No Selection</option>
                                        <option value="Baruch College">Baruch College</option>
                                        <option value="Borough of Manhattan Community College">Borough of Manhattan Community College</option>
                                        <option value="Bronx Community College">Bronx Community College</option>
                                        <option value="Brooklyn College">Brooklyn College</option>
                                        <option value="City College of New York">City College of New York</option>
                                        <option value="College of Staten Island">College of Staten Island</option>
                                        <option value="Guttman Community College">Guttman Community College</option>
                                        <option value="Graduate Center, CUNY">Graduate Center, CUNY</option>
                                        <option value="Hostos Community College">Hostos Community College</option>
                                        <option value="Hunter College">Hunter College</option>
                                        <option value="John Jay College of Criminal Justice">John Jay College of Criminal Justice</option>
                                        <option value="Kingsborough Community College">Kingsborough Community College</option>
                                        <option value="LaGuardia Community College">LaGuardia Community College</option>
                                        <option value="Lehman College">Lehman College</option>
                                        <option value="Medgar Evers College">Medgar Evers College</option>
                                        <option value="New York City College of Technology">New York City College of Technology</option>
                                        <option value="Queens College">Queens College</option>
                                        <option value="Queensborough Community College">Queensborough Community College</option>
                                        <option value="York College">York College</option>
                                    </select>
                            </div>

                            <div id="Major" className="mb-2"> 
                                <label htmlFor="major" className="font-SubHeading font-medium text-base">Choose your Major</label>
                                <select  id="major" multiple defaultValue={preferences.major} 
                                    name="major" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm "> 
                                        <option value="">No Selection</option>
                                        <option value="Accounting">Accounting</option>
                                        <option value="Anthropology">Anthropology</option>
                                        <option value="Architecture">Architecture</option>
                                        <option value="Art">Art</option>
                                        <option value="Biochemistry">Biochemistry</option>
                                        <option value="Biology">Biology</option>
                                        <option value="Biomedical Engineering">Biomedical Engineering</option>
                                        <option value="Business Administration">Business Administration</option>
                                        <option value="Chemical Engineering">Chemical Engineering</option>
                                        <option value="Chemistry">Chemistry</option>
                                        <option value="Civil Engineering">Civil Engineering</option>
                                        <option value="Communications">Communications</option>
                                        <option value="Computer Engineering">Computer Engineering</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Criminal Justice">Criminal Justice</option>
                                        <option value="Cybersecurity">Cybersecurity</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Dentistry">Dentistry</option>
                                        <option value="Design">Design</option>
                                        <option value="Economics">Economics</option>
                                        <option value="Education">Education</option>
                                        <option value="Electrical Engineering">Electrical Engineering</option>
                                        <option value="English">English</option>
                                        <option value="Entrepreneurship">Entrepreneurship</option>
                                        <option value="Environmental Science">Environmental Science</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Fine Arts">Fine Arts</option>
                                        <option value="Graphic Design">Graphic Design</option>
                                        <option value="Health Sciences">Health Sciences</option>
                                        <option value="History">History</option>
                                        <option value="Hospitality Management">Hospitality Management</option>
                                        <option value="Human Resources">Human Resources</option>
                                        <option value="Industrial Engineering">Industrial Engineering</option>
                                        <option value="Information Systems">Information Systems</option>
                                        <option value="Information Technology">Information Technology</option>
                                        <option value="International Relations">International Relations</option>
                                        <option value="Journalism">Journalism</option>
                                        <option value="Law">Law</option>
                                        <option value="Linguistics">Linguistics</option>
                                        <option value="Management">Management</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Mathematics">Mathematics</option>
                                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                                        <option value="Medicine">Medicine</option>
                                        <option value="Music">Music</option>
                                        <option value="Nursing">Nursing</option>
                                        <option value="Philosophy">Philosophy</option>
                                        <option value="Physics">Physics</option>
                                        <option value="Political Science">Political Science</option>
                                        <option value="Psychology">Psychology</option>
                                        <option value="Sociology">Sociology</option>
                                        <option value="Other">Other</option>
                                </select>
                            </div>

                            <div id="Minor" className="mb-2"> 
                                <label htmlFor="minor" className="font-SubHeading font-medium text-base">Choose your Minor</label>
                                <select  id="minor" defaultValue={preferences.minor}  
                                    name="minor" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm "> 
                                        <option value="">No Selection</option>
                                        <option value="Accounting">Accounting</option>
                                        <option value="Anthropology">Anthropology</option>
                                        <option value="Architecture">Architecture</option>
                                        <option value="Art">Art</option>
                                        <option value="Biochemistry">Biochemistry</option>
                                        <option value="Biology">Biology</option>
                                        <option value="Biomedical Engineering">Biomedical Engineering</option>
                                        <option value="Business Administration">Business Administration</option>
                                        <option value="Chemical Engineering">Chemical Engineering</option>
                                        <option value="Chemistry">Chemistry</option>
                                        <option value="Civil Engineering">Civil Engineering</option>
                                        <option value="Communications">Communications</option>
                                        <option value="Computer Engineering">Computer Engineering</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Criminal Justice">Criminal Justice</option>
                                        <option value="Cybersecurity">Cybersecurity</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Dentistry">Dentistry</option>
                                        <option value="Design">Design</option>
                                        <option value="Economics">Economics</option>
                                        <option value="Education">Education</option>
                                        <option value="Electrical Engineering">Electrical Engineering</option>
                                        <option value="English">English</option>
                                        <option value="Entrepreneurship">Entrepreneurship</option>
                                        <option value="Environmental Science">Environmental Science</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Fine Arts">Fine Arts</option>
                                        <option value="Graphic Design">Graphic Design</option>
                                        <option value="Health Sciences">Health Sciences</option>
                                        <option value="History">History</option>
                                        <option value="Hospitality Management">Hospitality Management</option>
                                        <option value="Human Resources">Human Resources</option>
                                        <option value="Industrial Engineering">Industrial Engineering</option>
                                        <option value="Information Systems">Information Systems</option>
                                        <option value="Information Technology">Information Technology</option>
                                        <option value="International Relations">International Relations</option>
                                        <option value="Journalism">Journalism</option>
                                        <option value="Law">Law</option>
                                        <option value="Linguistics">Linguistics</option>
                                        <option value="Management">Management</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Mathematics">Mathematics</option>
                                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                                        <option value="Medicine">Medicine</option>
                                        <option value="Music">Music</option>
                                        <option value="Nursing">Nursing</option>
                                        <option value="Philosophy">Philosophy</option>
                                        <option value="Physics">Physics</option>
                                        <option value="Political Science">Political Science</option>
                                        <option value="Psychology">Psychology</option>
                                        <option value="Sociology">Sociology</option>
                                        <option value="Other">Other</option>
                                </select>
                            </div> 

                            <div id="Interested-Industry" className="mb-2"> 
                                <label htmlFor="industry" className="font-SubHeading font-medium text-base"> Which industry your interested to work in</label>
                                <select id="industry" multiple defaultValue={preferences.interested_industry}
                                    name="industry" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm  ">  
                                        <option value="">No Selection</option>
                                        <option value="Banking and Financial Services">Banking and Financial Services</option>
                                        <option value="Government and Defense">Government and Defense</option>
                                        <option value="Healthcare">Healthcare</option>
                                        <option value="Information Technology">Information Technology</option>
                                        <option value="Energy and Utilities">Energy and Utilities</option>
                                        <option value="Education">Education</option>
                                        <option value="Telecommunications">Telecommunications</option>
                                        <option value="Retail and E-commerce">Retail and E-commerce</option>
                                        <option value="Transportation and Logistics">Transportation and Logistics</option>
                                        <option value="Insurance">Insurance</option>
                                        <option value="Manufacturing">Manufacturing</option>
                                        <option value="Legal Services">Legal Services</option>
                                        <option value="Media and Entertainment">Media and Entertainment</option>
                                        <option value="Consulting Services">Consulting Services</option>
                                        <option value="Aerospace">Aerospace</option>
                                        <option value="Nonprofit Organizations">Nonprofit Organizations</option>
                                        <option value="Pharmaceuticals">Pharmaceuticals</option>
                                        <option value="Cloud Services">Cloud Services</option>
                                        <option value="Cybersecurity Firms">Cybersecurity Firms</option>
                                        <option value="Agriculture and Food Processing">Agriculture and Food Processing</option>
                                        <option value="Hospitality and Tourism">Hospitality and Tourism</option>
                                        <option value="Automotive Industry">Automotive Industry</option>
                                        <option value="Real Estate">Real Estate</option>
                                        <option value="Research and Development">Research and Development</option>
                                        <option value="Other">Other</option>
                                </select>
                            </div> 

                            <div id="Career-Goals" className="mb-2"> 
                                <label htmlFor="career-goals" className="font-SubHeading font-medium text-base">What are your career goals?</label>
                                <select id="career-goals"  defaultValue={preferences.career_goals}
                                name="career-goals" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm ">
                                    <option value="">No Selection</option>
                                    <option value="Internship"> Looking for an internship </option> 
                                    <option value="First-role">Looking for your first role </option> 
                                    <option value="Switch">Switching Careers </option>    
                                </select>
                            </div> 

                        </div>
                        

                        <div id="right-col"> 
                            <div id="Technical-Experience" className="mb-2"> 
                                <label htmlFor="technical-experience" className="font-SubHeading font-medium text-nowrap text-base">How much hands-on Technical Experience do you have?</label> 
                                <select id="tech-exp" defaultValue={preferences.technical_experience}
                                name="tech-experience"  className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm">
                                    <option value="">No Selection</option>
                                    <option value="None"> None - No Experience </option> 
                                    <option value="Beginner">Beginner — I’ve done a few projects or courses </option> 
                                    <option value="Intermediate">Intermediate — I've applied skills on real-world projects </option> 
                                    <option value="Advanced">Advanced — I have professional experience and have led complex projects </option> 
                                </select>
                            </div> 

                            <div id="Technical-Knowledge" className="mb-2"> 
                                <label htmlFor="technical-Knowledge" className="font-SubHeading font-medium text-base">How much Technical Knowledge do you have?</label> 
                                <select id="tech-knowledge" defaultValue={preferences.technical_knowledge}
                                name="tech-knowledge" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm  ">
                                    <option value="">No Selection</option>
                                    <option value="None"> None — I’m just getting started</option> 
                                    <option value="Beginner"> Beginner - I’m learning the basics</option> 
                                    <option value="Intermediate">Intermediate — I understand most core concepts </option> 
                                    <option value="Advanced">Advanced — I have strong expertise in multiple areas </option>  
                                </select>
                            </div> 

                            <div id="Cybersec-Interest" className="mb-2"> 
                                <label htmlFor="cybersec-interest" className="font-SubHeading font-medium text-base text-[#09090B]">Area of cybersecurity interest</label>
                                <select id="cybersec-interest" multiple  defaultValue={preferences.cybersecurity_interest}
                                name="cybersec-interest" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm"
                                >   
                                    <option value="">No Selection</option>
                                    <option value="network-security">Network Security</option>
                                    <option value="cloud-security">Cloud Security</option>
                                    <option value="application-security">Application Security</option>
                                    <option value="information-security">Information Security</option>
                                    <option value="grc">Governance, Risk, and Compliance (GRC)</option>
                                    <option value="soc">Security Operations (SOC)</option>
                                    <option value="incident-response">Incident Response</option>
                                    <option value="threat-hunting">Threat Hunting</option>
                                    <option value="penetration-testing">Penetration Testing / Ethical Hacking</option>
                                    <option value="red-team">Red Team Operations</option>
                                    <option value="blue-team">Blue Team Operations</option>
                                    <option value="digital-forensics">Digital Forensics</option>
                                    <option value="iam">Identity and Access Management (IAM)</option>
                                    <option value="cryptography">Cryptography</option>
                                    <option value="malware-analysis">Malware Analysis</option>
                                    <option value="endpoint-security">Endpoint Security</option>
                                    <option value="vulnerability-management">Vulnerability Management</option>
                                    <option value="devsecops">DevSecOps</option>
                                    <option value="iot-security">IoT Security</option>
                                    <option value="policy-strategy">Cybersecurity Policy and Strategy</option>
                                </select>
                            </div>

                            <div id="Cybersecurity-Familiarity" className="mb-2"> 
                                <label htmlFor="security-Familiarity" className="font-SubHeading font-medium text-nowrap text-base">How familiar are you with cybersecurity tools or concepts?</label> 
                                <select id="security-Familiarity" defaultValue={preferences.cybersecurity_familiarity}
                                name="security-Familiarity" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B]  w-11/12  rounded-sm ">
                                    <option value="">No Selection</option>
                                    <option value="None">Not familiar</option> 
                                    <option value="Some">Somewhat familiar — I’ve learned a few basics </option> 
                                    <option value="Familiar">Familiar — I’ve used tools or studied security concepts </option>   
                                    <option value="Very-Familiar">Very Familiar — I have hands-on security experience </option>
                            </select>
                            </div> 

                            <div id="Certifications" className="mb-2"> 
                                <label htmlFor="certs" className="font-SubHeading font-medium text-base">Certifications</label>
                                <select id="certs" multiple defaultValue={preferences.certifications}  
                                name="certs" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm ">
                                    <option value="">No Selection</option>  
                                    <option value="comptia-security-plus">CompTIA Security+</option>
                                    <option value="comptia-network-plus">CompTIA Network+</option>
                                    <option value="comptia-a-plus">CompTIA A+</option>
                                    <option value="certified-ethical-hacker">Certified Ethical Hacker (CEH)</option>
                                    <option value="cisco-ccna">Cisco CCNA Security</option>
                                    <option value="comptia-cysa-plus">CompTIA CySA+ (Cybersecurity Analyst)</option>
                                    <option value="comptia-pentest-plus">CompTIA PenTest+</option>
                                    <option value="giac-security-essentials">GIAC Security Essentials (GSEC)</option>
                                    <option value="systems-security-professional">Certified Information Systems Security Professional (CISSP)</option>
                                    <option value="certified-information-security-manager">Certified Information Security Manager (CISM)</option>
                                    <option value="certified-cloud-security-professional">Certified Cloud Security Professional (CCSP)</option>
                                    <option value="offensive-security-certified-professional">Offensive Security Certified Professional (OSCP)</option>
                                    <option value="giac-penetration-tester">GIAC Penetration Tester (GPEN)</option>
                                    <option value="giac-certified-incident-handler">GIAC Certified Incident Handler (GCIH)</option>
                                    <option value="certified-information-systems-auditor">Certified Information Systems Auditor (CISA)</option>
                                    <option value="aws-certified-security-specialty">AWS Certified Security - Specialty</option>
                                    <option value="azure-security-engineer">Microsoft Certified: Azure Security Engineer Associate</option>
                                    <option value="giac-security-leadership">GIAC Security Leadership (GSLC)</option>
                                    <option value="certified-authorization-professional">Certified Authorization Professional (CAP)</option>
                                    <option value="offensive-security-web-expert">Offensive Security Web Expert (OSWE)</option>
                                    <option value="certified-in-risk-information-systems-control">Certified in Risk and Information Systems Control (CRISC)</option>
                                    <option value="giac-certified-forensic-analyst">GIAC Certified Forensic Analyst (GCFA)</option>
                                    <option value="cisco-ccnp-security">Cisco CCNP Security</option>
                                    <option value="giac-certified-forensic-examiner">GIAC Certified Forensic Examiner (GCFE)</option>
                                    <option value="comptia-casp-plus">CompTIA CASP+ (Advanced Security Practitioner)</option>
                                    <option value="certified-data-privacy-solutions-engineer">Certified Data Privacy Solutions Engineer (CDPSE)</option>
                                    <option value="giac-exploit-researcher-advanced-penetration-tester">GIAC Exploit Researcher and Advanced Penetration Tester (GXPN)</option>
                                    <option value="offensive-security-exploitation-expert">Offensive Security Exploitation Expert (OSEE)</option>
                                    <option value="giac-reverse-engineering-malware">GIAC Reverse Engineering Malware (GREM)</option>
                                    <option value="ec-council-computer-hacking-forensic-investigator">EC-Council Computer Hacking Forensic Investigator (CHFI)</option>

                                </select>
                            </div>

                        </div> 


                        <div id="button-container" className="place-self-center mt-8 mb-8"> 
                            <button 
                                    onClick={handleUpdatePreferences}
                                    disabled={loading}
                                    className="font-text font-semibold text-lg rounded-full bg-[#00A6FB]  
                                                            text-[#F9F4F4] h-xl w-fit p-2 cursor-pointer"> 
                                                
                                    {loading ? 'Updating...' : 'Update Preferences'}
                            </button>
                        </div>


                    </div> 
                    
                    
                )}
                
                

                <div id="event-container"> 
                    <div> 
                        <h1 className="font-SubHeading text-center text-2xl">Your Events</h1>
                    </div> 
                    <hr></hr> 

                    <div id="event-card-container" className=" flex justify-center gap-4 mt-4 pl-4"> 
                        <EventCard> 
                            <div> 
                                <h1 className="text-[#F9F4F4] text-center">Event#1</h1> 
                                <p> This is some event description.</p>
                                <p>Location: Zoom</p>
                            </div> 
                            <div> 
                                <button className="font-text font-semibold text-sm rounded-full bg-[#00A6FB]  
                                                            text-[#F9F4F4] h-12 w-fit p-2 cursor-pointer"> 
                                                Cancel Event 
                                        </button>    
                            </div>
                        </EventCard> 

                        <EventCard> 
                            <div> 
                                <h1 className="text-[#F9F4F4] text-center">Event#2</h1> 
                                <p> This is some event description.</p>
                                <p>Location: Zoom</p>
                            </div> 
                            <div> 
                                <button className="font-text font-semibold text-sm rounded-full bg-[#00A6FB]  
                                                            text-[#F9F4F4] h-12 w-fit p-2 cursor-pointer"> 
                                                Cancel Event 
                                        </button>      
                            </div>
                        </EventCard> 

                        <EventCard> 
                            <div> 
                                <h1 className="text-[#F9F4F4] text-center">Event#3</h1> 
                                <p> This is some event description.</p>
                                <p>Location: Zoom</p>
                            </div> 
                            <div> 
                                <button className="font-text font-semibold text-sm rounded-full bg-[#00A6FB]  
                                                            text-[#F9F4F4] h-12 w-fit p-2 cursor-pointer"> 
                                                Cancel Event 
                                        </button>      
                            </div>
                        </EventCard>
                    </div>
                </div>









                </div> 
    </SlideInText>
                
                
                <Footer> 
                    
                </Footer>

        
        
        
        
        </>

    )



}

export default ProfilePage