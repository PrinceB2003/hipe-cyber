import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SmallHeroCard from "../components/SmallHeroCard"; 
import { Link,useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { useUser } from "@clerk/clerk-react";
import {Cloud} from 'lucide-react'
import SlideInText from "../components/SlideInText";




function CloudResourcePage () { 

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
                                                <h1 className="text-[#F9F4F4] font-Heading text-5xl text-center">Welcome, to Cloud resources!</h1>
                                            </div> 

                                            <div> 
                                                <h2 className="text-[#F9F4F4] font-SubHeading text-3xl text-center ">Resources dedicated to learning about Cloud fundamentals.</h2>
                                            </div>
                                        </div>  

                                        <div id="logo-container"> 
                                            <Cloud size={192} color={"#00A6FB"}/>
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
                                                        <h2 className="font-SubHeading text-xl text-center">freeCodeCamp - Google Cloud Cybersecurity</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A comprehensive 10-hour video course covering security principles in cloud computing, risk management frameworks, identity and access management, threat identification, and hands-on Google Cloud labs.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://www.freecodecamp.org/news/beginners-guide-to-cloud-cybersecurity/" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center">AWS Skill Builder - AWS Cloud Practitioner Essentials </h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A free 6-hour course teaching AWS Cloud fundamentals including compute services, networking, storage, security, pricing, and architectural best practices with hands-on demonstrations.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center">Hack The Box Academy - Cloud Security Training </h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A hands-on platform offering free foundational modules on cloud security, networking, Linux, and Windows with interactive labs to practice offensive and defensive cloud security skills.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://academy.hackthebox.com/" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center">Microsoft Learn - Azure Fundamentals: Describe Cloud Concepts</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A free learning path covering cloud computing concepts, Azure services, deployment models, shared responsibility model, and core Azure architectural components.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center">Google Cloud Skills Boost - Getting Started with Google Cloud</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A free hands-on learning path introducing Google Cloud fundamentals through curated courses, labs, and skill badges with real-world cloud experience.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://www.cloudskillsboost.google/paths/8" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center">TryHackMe - Intro to Cloud Security</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">An interactive hands-on room teaching fundamental cloud security concepts including data confidentiality, virtualization security, network security through security groups and NACLs, and storage protection strategies.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://tryhackme.com/room/introductiontocloudsecurityc6" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center">Great Learning - Cloud Security Fundamentals</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A free course covering cloud security threats, protection methods, cloud service models (IaaS, PaaS, SaaS), the Shared Responsibility Model, intrusion detection, and AI-powered threat hunting.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://www.mygreatlearning.com/academy/learn-for-free/courses/introduction-to-cloud-security" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center">Simplilearn - Introduction to Cloud Security</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A free training program providing fundamental knowledge about securing cloud environments, cloud security best practices, and available security solutions for protecting organizational data and resources.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link
                                                            to="https://www.simplilearn.com/learn-cloud-security-basics-skillup" target="_blank" rel="noopener noreferrer" 
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

export default CloudResourcePage;