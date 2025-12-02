import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SmallHeroCard from "../components/SmallHeroCard"; 
import { Link,useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { useUser } from "@clerk/clerk-react";
import {Network} from 'lucide-react'
import SlideInText from "../components/SlideInText";
import { useEffect } from 'react';



function OsResourcePage () { 

        const {signOut,isSignedIn} = useClerk();  

        useEffect(() => {
            document.documentElement.style.scrollBehavior = 'auto';
            window.scrollTo(0, 0);
            setTimeout(() => {
                document.documentElement.style.scrollBehavior = 'smooth';
            }, 0);
        }, [location.pathname]);


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
                                                <h1 className="text-[#F9F4F4] font-Heading text-5xl text-center">Welcome, to Operating System resources!</h1>
                                            </div> 

                                            <div> 
                                                <h2 className="text-[#F9F4F4] font-SubHeading text-3xl text-center ">Resources dedicated to learning about Operating Systems</h2>
                                            </div>
                                        </div>  

                                        <div id="logo-container"> 
                                            <Network className="animate-pulse" size={192} color={"#00A6FB"}/>
                                        </div>
                                    </div>  
                                </section> 
                            </SlideInText>

                             
                                <section id="resources"> 
                                    <SlideInText>
                                        <div className="mb-2 mt-2"> 
                                            <h1 className="text-[#F9F4F4] text-4xl text-center font-Heading">Available Resources</h1> 
                                        </div>
                                        <div className="flex gap-4 justify-center items-center mt-8 mb-8"> 
                                            <SmallHeroCard>
                                                <div id="card-content-container">   
                                                    <div className="mt-2 mb-2"> 
                                                        <h2 className="font-SubHeading text-xl text-center"> Ryan's Tutorials - Linux Tutorial </h2>
                                                    </div> 
                                                    <div  className="mt-2 mb-2"> 
                                                        <p className="font-Text text-xl text-center"> A comprehensive 13-part beginner's guide covering Bash command line fundamentals with clear descriptions, examples, and best practices.</p>
                                                    </div>
                                                    <div  className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://ryanstutorials.net/linuxtutorial/" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center"> freeCodeCamp - Linux for Hackers </h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A tutorial explaining Linux basics for cybersecurity, including the file system, package management, and essential command-line operations.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                        to="https://www.freecodecamp.org/news/linux-basics/" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center">TCM Security - Linux 100: Fundamentals</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A free course teaching Linux installation, basic functionality, key commands, file management, and service control for cybersecurity professionals.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://academy.tcm-sec.com/p/linux-fundamentals" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center">OverTheWire Bandit</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">An interactive wargame that teaches Linux command-line skills through 34 progressive levels where you solve security-related challenges via SSH.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                             to="https://overthewire.org/wargames/bandit/" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center"> IBM - Cybersecurity Roles, Processes & Operating System Security (Coursera) </h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A free course covering file systems, basic commands, and security concepts for Windows, Mac, Linux, and mobile operating systems.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                             to="https://www.coursera.org/learn/cybersecurity-roles-processes-operating-system-security" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center">Microsoft Learn - Windows </h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">Official Microsoft documentation covering Windows security features, configurations, and protection mechanisms from chip to cloud.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                             to="https://learn.microsoft.com/en-us/windows/security/" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center">TryHackMe - Windows Fundamentals 1</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">An interactive hands-on room teaching Windows OS basics including the GUI, file systems, user accounts, permissions, and essential Windows security tools.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                             to="https://tryhackme.com/room/windowsfundamentals1xbx" target="_blank" rel="noopener noreferrer"
                                                             className="font-Text font-medium text-center rounded-md bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                                        >
                                                            Learn More
                                                        </Link>
                                                    </div> 
                                                </div>
                                            </SmallHeroCard> 

                                            <SmallHeroCard> 
                                                <div id="card-content-container">   
                                                    <div className="mt-4 mb-4"> 
                                                        <h2 className="font-SubHeading text-xl text-center">Microsoft Security-101</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">An 8-lesson beginner course on GitHub covering cybersecurity fundamentals including infrastructure security, hardening systems, and security tooling.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                             to="https://github.com/microsoft/Security-101" target="_blank" rel="noopener noreferrer" 
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

export default OsResourcePage;