import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SmallHeroCard from "../components/SmallHeroCard"; 
import { Link,useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { useUser } from "@clerk/clerk-react";
import {Network} from 'lucide-react'
import SlideInText from "../components/SlideInText";
import { useEffect } from 'react';



function NetworkResourcePage () { 

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
                                                <h1 className="text-[#F9F4F4] font-Heading text-5xl text-center">Welcome, to Network resources!</h1>
                                            </div> 

                                            <div> 
                                                <h2 className="text-[#F9F4F4] font-SubHeading text-3xl text-center ">Resources dedicated to learning about Networking.</h2>
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
                                                        <h2 className="font-SubHeading text-xl text-center">Professor Messer - CompTIA Network+ N10-009 Course -</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center"> A comprehensive 87-video series (nearly 13 hours) covering networking fundamentals including the OSI model, TCP/IP, routing, switching, and network security for complete beginners.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link
                                                            to="https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/" target="_blank" rel="noopener noreferrer" 
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
                                                        <h2 className="font-SubHeading text-xl text-center">Cisco Networking Academy - Networking Basics</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A free self-paced course teaching network architecture, protocols, services, IP addressing, subnetting, and basic network security with hands-on Packet Tracer simulations.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://www.netacad.com/courses/networking-basics" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center">freeCodeCamp - Computer Networking Course</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center"> 9-hour video course covering network configuration, management, troubleshooting, protocols, WAN technologies, IPv4/IPv6, virtualization, and cloud computing that also prepares you for CompTIA Network+ certification.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://www.freecodecamp.org/news/free-computer-networking-course/" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center"> TryHackMe - Intro to Networking</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">An interactive hands-on room teaching networking fundamentals including the OSI model, TCP/IP protocols, network addressing, and packet analysis through practical exercises.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://tryhackme.com/room/introtonetworking" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center">SANS Cyber Aces - Networking Module</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A free tutorial module providing comprehensive networking fundamentals coverage including protocols at each OSI layer, with emphasis on understanding computer attacks and network defenses.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://www.sans.org/cyberaces" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center">W3Schools - Cybersecurity Networking Basics</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center"> A beginner-friendly tutorial explaining the OSI model, network layers, protocols (TCP, UDP, IP, ICMP), and how devices communicate across networks for cybersecurity professionals.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link
                                                            to="https://www.w3schools.com/cybersecurity/cybersecurity_networking.php" target="_blank" rel="noopener noreferrer" 
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
                                                        <h2 className="font-SubHeading text-xl text-center">Cisco Networking Essentials </h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A comprehensive free course teaching how to plan and install home/small business networks, configure wireless technology, implement basic security, and troubleshoot network connectivity issues using Packet Tracer labs.</p>
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
                                                        <h2 className="font-SubHeading text-xl text-center">IBM - Cybersecurity Roles, Processes & Operating System Security (Coursera)</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center"> A free course covering networking hardware, TCP/IP, network protocols, routing, firewalls, intrusion detection, and network security fundamentals with a focus on cybersecurity applications.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://www.netacad.com/courses/networking-essentials" target="_blank" rel="noopener noreferrer"
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

export default NetworkResourcePage;