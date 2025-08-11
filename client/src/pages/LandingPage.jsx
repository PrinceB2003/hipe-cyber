import { motion } from "motion/react"
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";  
import HeroCard from "../components/HeroCard";
import AnimatedBackGround from "../components/AnimatedBackGround";
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/clerk-react";
import SlideInText from "../components/SlideInText"; 
import {ShieldUser,LaptopMinimalCheck,Compass,Globe,GlobeLock} from 'lucide-react';
import { Link } from 'react-router-dom';

function LandingPage(){ 
    return ( 
        <> 
        <NavBar className="">  
        <a href="#about" className="hover:text-[#00A6FB]"> About Us</a> 
        <a href="#mission" className="hover:text-[#00A6FB]" > Mission</a>    
        <a href="#values" className="hover:text-[#00A6FB]"> Values</a>  
        <a href="#features" className="hover:text-[#00A6FB]"> Features</a>
        <SignedIn> 
            <UserButton/>
        </SignedIn>
        </NavBar> 
    
    <AnimatedBackGround> 
        <section id="hero" className="text-[#F9F4F4] min-h-screen w-full flex flex-col justify-center gap-6">  
            <div className=" text-center "> 
                <h1 className="font-Heading font-bold text-7xl">Welcome to HIPE-CYBER!</h1>  
            </div> 
            <div className="text-center"> 
                <h2 className="font-SubHeading font-semibold text-5xl animate-pulse">Cybersecurity made simple for every CUNY student.</h2> 
            </div> 
            <div className="flex justify-center gap-3">  
                 <SignedOut>
                    <Link
                        to="/sign-in"
                        className="font-SubHeading font-bold text-2xl rounded-full bg-[#00A6FB]  
                        h-1xl w-48 p-2 cursor-pointer hover:scale-125 transition flex items-center justify-center"
                    >
                         Sign In
                    </Link>

                    <Link
                        to="/sign-up"
                        className="font-SubHeading font-bold text-2xl rounded-full bg-[#0077CC]  
                        h-1xl w-48 p-2 cursor-pointer hover:scale-125 transition flex items-center justify-center"
                    >
                        Sign Up
                    </Link>
                </SignedOut>
            </div> 
        </section> 
    </AnimatedBackGround>

        <section id="about" className="bg-[#09090B] text-[#F9F4F4] text-center min-h-screen w-full flex flex-col items-center justify-center" > 
        <SlideInText> 
            <h1 className="font-SubHeading font-bold text-[#00A6FB] text-6xl mb-4">About Us</h1> 
            <div id="about-container" className="flex ">  
                <div> 
                    <ShieldUser size={256} color={"#00A6FB"}/>
                </div>
                <div className="h-xl w-3xl text-wrap place-self-center"> 
                    <p className="font-Text font-medium text-[#F9F4F4] text-center text-2xl "> 
                        Our platform is built for CUNY students of all majors and experience levels, making it easy to learn about cybersecurity in a way that fits your interests.  
                        By creating a profile with your background, goals, and skills, you’ll get content that’s relevant to you.  
                        Stay updated with organized news on topics like malware, vulnerabilities, compliance, and more. Additional features like learning resources, career tools,  
                        and a student forum are on the horizon to support you even further on your journey.
                    </p> 
                </div>  
            </div>
        </SlideInText>
        </section> 

        <section id="mission" className="bg-[#09090B] text-[#F9F4F4] text-center min-h-screen w-full flex flex-col items-center justify-center"> 
          <SlideInText>  
            <h1 className="font-SubHeading font-bold text-[#00A6FB] text-5xl mb-4">Our Mission</h1>    
            <div id="mission-container" className="flex"> 
                <div class>  
                    <GlobeLock size={192} color={"#00A6FB"}/>
                </div>
            
                <div className="font-Text font-medium text-2xl h-xl w-3xl text-wrap place-self-center"> 
                    <p>  
                        Our mission is to help CUNY students learn about cybersecurity in a way that is simple and convenient.  
                        We aim to create a space where all students can grow, no matter their major, background, or skill level.  
                        Everything we do is focused on making cybersecurity easier to explore and understand. 
                    </p> 
                </div>  
             </div>
           </SlideInText>  
        </section> 

        <section id="values" className="bg-[#09090B] text-[#F9F4F4] text-center min-h-screen w-full flex flex-col items-center justify-center"> 
          <SlideInText> 
            <h1 className="font-SubHeading font-bold text-[#00A6FB] text-5xl mb-4"> Our Values</h1> 
            <div className="font-Text font-medium text-2xl h-xl w-3xl text-wrap place-self-center"> 
                <div className="flex gap-4 items-center"> 
                    <LaptopMinimalCheck size={192} color={"#00A6FB"} />
                    <p>Convenience: We make it simple for students to find what they need without wasting time. </p>
                </div>
                <div className="flex gap-4  items-center">  
                  <Compass size={192} color={"#00A6FB"}/>  
                  <p>Ease of Use: Everything on our platform is designed to be clear and user-friendly. </p>  
                </div>
                  
                <div className="flex gap-4  items-center"> 
                    <Globe size={192} color={"#00A6FB"}/>
                    <p>Accessibility: We welcome all students, whether you’re just starting out or already have some experience. </p>   
                </div>
                 
            </div> 
          </SlideInText>
        </section> 

        <section id="features" className="bg-[#09090B] text-[#F9F4F4] min-h-screen w-full  pl-2 pr-2"> 
           <SlideInText> 
            <h1 className="font-SubHeading font-bold text-[#00A6FB] text-5xl text-center mb-4">Our Features</h1> 
            <div id="feature-container" className="flex justify-center gap-12 pt-2"> 
                <HeroCard> 
                    <div className="h-12 pt-3"> 
                        <h2 className="font-SubHeading font-bold text-2xl">Current Events</h2> 
                    </div> 
                    <div className="h-48"> 
                        <p className="font-Text font-medium text-xl text-center mb-1">
                            Stay updated on cybersecurity news, key threats, and tools relevant to CUNY students and future professionals.  
                        </p>
                    </div>
                    <div className="h-12 flex flex-col item-center"> 
                        <Link
                            to="/under-construction"
                            className="font-Text font-medium text-center rounded-full bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                        >
                            Learn more
                        </Link>
                    </div>  
                </HeroCard> 
                <HeroCard> 
                    <div className="h-12 pt-3"> 
                       <h2 className="font-SubHeading font-bold text-2xl">Forum</h2>  
                    </div> 
                    <div className="h-48"> 
                         <p className="font-Text font-medium text-xl text-center mb-1">
                            Join our forum to connect with other students.
                            Ask questions, share ideas, and learn together about cybersecurity topics and careers.
                        </p>  
                    </div>
                       
                    <div className="h-12 flex flex-col item-center"> 
                        <Link
                            to="/under-construction"
                            className="font-Text font-medium text-center rounded-full bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                        >
                            Learn more
                        </Link>    
                    </div>
                
                </HeroCard> 
                <HeroCard> 
                    <div className="h-12 pt-3"> 
                      <h2 className="font-SubHeading font-bold text-2xl">Learn</h2>    
                    </div> 
                    <div className="h-48"> 
                        <p className="font-Text font-medium text-xl text-center mb-1">
                            Get personalized learning resources based on what the community needs.
                            Explore topics, improve skills, and grow your cybersecurity knowledge.   
                        </p>
                    </div>
                         
                    <div className="h-12 flex flex-col item-center"> 
                        <Link
                            to="/under-construction"
                            className="font-Text font-medium text-center rounded-full bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                        >
                            Learn more
                        </Link>
                    </div>
                     
                </HeroCard>
            </div> 
          </SlideInText>
        </section>

        <Footer />
        
        </>


    )

}

export default LandingPage