import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SmallHeroCard from "../components/SmallHeroCard"; 
import { Link,useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { useUser } from "@clerk/clerk-react";
import {EarthLock} from 'lucide-react'
import SlideInText from "../components/SlideInText";




function SecurityResourcePage () { 

        const {signOut,isSignedIn} = useClerk();


                    const handleSignOut = async () => {
                                try {
                                    await signOut();
                                    navigate('/'); 
                                } catch (error) {
                                    console.error('Error signing out:', error);
                                }
                            };

                    return ( 
                            <>  
                                <NavBar> 
                                    <a href="/" className="hover:text-[#00A6FB]"> Home</a>
        
                                    <Link to="/#features" className="hover:text-[#00A6FB]">Features</Link>
                                    <Link to="/profile" className="hover:text-[#00A6FB]">{isSignedIn?"Profile":""}</Link> 

                                    <button 
                                        onClick={handleSignOut} 
                                        className="hover:text-[#00A6FB] cursor-pointer bg-transparent border-none text-inherit"
                                    > 
                                        {isSignedIn? "Sign out" : ""}
                                    </button>
                                </NavBar>   
                            <SlideInText> 
                                <section id="hero" className="mt-32 mb-4"> 
                                    <div id="Network-greeting-container" className="flex justify-center items-center gap-8"> 
                                        <div> 
                                            <div> 
                                                <h1 className="text-[#F9F4F4] font-Heading text-5xl text-center">Welcome, to Security resources!</h1>
                                            </div> 

                                            <div> 
                                                <h2 className="text-[#F9F4F4] font-SubHeading text-3xl text-center ">Resources dedicated to learning about Security concepts & fundamentals.</h2>
                                            </div>
                                        </div>  

                                        <div id="logo-container"> 
                                            <EarthLock size={192} color={"#00A6FB"}/>
                                        </div>
                                    </div>  
                                </section> 
                            </SlideInText>

                             
                                <section id="resources"> 
                                    <SlideInText>
                                        <div className="flex gap-4 justify-center items-center mt-8 mb-8"> 
                                            <SmallHeroCard>
                                                <div id="card-content-container">   
                                                    <div className="mt-2 mb-2"> 
                                                        <h2 className="font-SubHeading text-xl text-center">Cybrary - Introduction to IT and Cybersecurity</h2>
                                                    </div> 
                                                    <div> 
                                                        <p className="font-Text text-lg text-center">A beginner course providing an overview of key cybersecurity careers, common responsibilities, essential skills, tools demonstrations, and helping learners decide which cybersecurity career path is right for them.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://www.cybrary.it/course/introduction-to-it-and-cybersecurity" target="_blank" rel="noopener noreferrer"
                                                            className="font-Text font-medium text-center rounded-md bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                                        >
                                                             Learn More
                                                        </Link>
                                                    </div> 
                                                </div> 
                                            </SmallHeroCard> 

                                            <SmallHeroCard> 
                                                <div id="card-content-container">   
                                                    <div className="mt-2 mb-2"> 
                                                        <h2 className="font-SubHeading text-xl text-center">NIST Cybersecurity Framework (CSF) Foundation</h2>
                                                    </div> 
                                                    <div> 
                                                        <p className="font-Text text-lg text-center">A free course introducing the NIST CSF including its scope, core functions, categories, implementation tiers, profiles, and how organizations implement the framework step by step.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link
                                                            to="https://alison.com/course/nist-cyber-security-framework-csf-foundation" target="_blank" rel="noopener noreferrer" 
                                                            className="font-Text font-medium text-center rounded-md bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                                        >
                                                             Learn More
                                                        </Link>
                                                    </div> 
                                                </div>
                                            </SmallHeroCard> 

                                            <SmallHeroCard> 
                                                <div id="card-content-container">   
                                                    <div className="mt-2 mb-2"> 
                                                        <h2 className="font-SubHeading text-xl text-center">Microsoft Learn - Describe the Concepts of Cybersecurity</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">An interactive beginner-friendly path teaching prerequisite technical knowledge including cybersecurity introduction, network fundamentals, web basics, and operating systems through hands-on exercises.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://learn.microsoft.com/en-us/training/paths/describe-basic-concepts-of-cybersecurity/" target="_blank" rel="noopener noreferrer"
                                                            className="font-Text font-medium text-center rounded-md bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                                        >
                                                             Learn More
                                                        </Link>
                                                    </div> 
                                                </div>
                                            </SmallHeroCard>  

                                            <SmallHeroCard> 
                                                <div id="card-content-container">   
                                                    <div className="mt-2 mb-2"> 
                                                        <h2 className="font-SubHeading text-xl text-center">TryHackMe - Pre-Security Learning Path</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">An interactive beginner-friendly path teaching prerequisite technical knowledge including cybersecurity introduction, network fundamentals, web basics, and operating systems through hands-on exercises.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://tryhackme.com/path/outline/presecurity" target="_blank" rel="noopener noreferrer"
                                                            className="font-Text font-medium text-center rounded-md bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                                        >
                                                             Learn More
                                                        </Link>
                                                    </div> 
                                                </div>
                                            </SmallHeroCard>
                                        </div> 
                                    
                                        <div className="flex gap-4 justify-center items-center mt-8 mb-8">
                                            
                                            <SmallHeroCard> 
                                                <div id="card-content-container">   
                                                    <div className="mt-2 mb-2"> 
                                                        <h2 className="font-SubHeading text-xl text-center"> RIT - Cybersecurity Fundamentals (edX)</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A comprehensive course teaching how to detect threats, protect systems and networks, anticipate cyber attacks, and covering cryptography, networking, systems administration, detection, prevention, malware, and forensics.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://www.edx.org/learn/cybersecurity/rochester-institute-of-technology-cybersecurity-fundamentals" target="_blank" rel="noopener noreferrer"
                                                            className="font-Text font-medium text-center rounded-md bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                                        >
                                                             Learn More
                                                        </Link>
                                                    </div> 
                                                </div>
                                            </SmallHeroCard> 

                                            <SmallHeroCard> 
                                                <div id="card-content-container">   
                                                    <div className="mt-2 mb-2"> 
                                                        <h2 className="font-SubHeading text-xl text-center">Hack The Box Academy - Cyber Security Fundamentals</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A hands-on skill path covering core technical fundamentals including Linux, web requests, and networking basics required to get a solid grounding in cybersecurity and start practicing on HTB.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://academy.hackthebox.com/path/preview/cyber-security-fundamentals" target="_blank" rel="noopener noreferrer"
                                                            className="font-Text font-medium text-center rounded-md bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                                        >
                                                             Learn More
                                                        </Link>
                                                    </div> 
                                                </div>
                                            </SmallHeroCard> 

                                            <SmallHeroCard> 
                                                <div id="card-content-container">   
                                                    <div className="mt-2 mb-2"> 
                                                        <h2 className="font-SubHeading text-xl text-center">W3Schools - Cybersecurity Tutorial</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A beginner-friendly tutorial covering cybersecurity fundamentals including the CIA triad, common threats, network security, encryption, access control, and security best practices with interactive examples.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://www.w3schools.com/cybersecurity/" target="_blank" rel="noopener noreferrer"
                                                            className="font-Text font-medium text-center rounded-md bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                                        >
                                                             Learn More
                                                        </Link>
                                                    </div> 
                                                </div>
                                            </SmallHeroCard> 

                                            <SmallHeroCard> 
                                                <div id="card-content-container">   
                                                    <div className="mt-2 mb-2"> 
                                                        <h2 className="font-SubHeading text-xl text-center">NIST - Cybersecurity Framework</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center"> Official NIST framework documentation providing voluntary guidance, standards, and practices for managing cybersecurity risk through the Govern, Identify, Protect, Detect, Respond, and Recover functions.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://www.nist.gov/cyberframework" target="_blank" rel="noopener noreferrer"
                                                            className="font-Text font-medium text-center rounded-md bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                                        >
                                                            Learn More
                                                        </Link>
                                                    </div> 
                                                </div>
                                            </SmallHeroCard>

                                        </div>
                                </SlideInText>

                                </section>

                                <Footer> 

                                </Footer>

                            
                            
                            
                            </> 
                    
                )

}; 

export default SecurityResourcePage;