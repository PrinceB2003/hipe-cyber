import { motion } from "motion/react"
import NavBar from "../components/navbar";
import Footer from "../components/Footer";  
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/clerk-react";

function LandingPage(){ 
    return ( 
        <> 
    
        <NavBar className=""> 
        <a href="#about">About Us</a> 
        <a href="#mission" >Our Mission</a>    
        <a href="#values">Our Values</a> 
        <SignedIn> 
            <UserButton/>
        </SignedIn>
        </NavBar> 
    
        <section id="hero" className="bg-[#09090B] text-[#F9F4F4] min-h-screen w-full flex flex-col justify-center gap-6"> 
            <div className="text-center "> 
            <h1 className="font-[League+Spartan] text-7xl">Welcome to HIPE-CYBER!</h1>  
            </div> 
            <div className="text-center"> 
            <h2 className="text-5xl">Cybersecurity made simple for every CUNY student.</h2> 
            </div> 
            <div className="flex justify-center gap-3">  
                <SignedOut> 
                    <SignInButton className="rounded-full bg-[#00A6FB] h-1xl w-48 p-2 cursor-pointer"></SignInButton>    
                </SignedOut>
            </div>
        </section> 

                {/* /* <a className="bg-[#00A6FB] text-[#F9F4F4] text-center rounded-full h-1xl w-24 p-2">Sign Up</a> 
                <a className="bg-[#00A6FB] text-[#F9F4F4] text-center rounded-full h-1xl w-24 p-2">Login</a> */}

        <section id="about" className="bg-[#09090B] text-[#F9F4F4] text-center min-h-screen w-full flex flex-col items-center justify-center" >  
            <h1 className="text-5xl mb-4">About Us</h1> 
            <div className="h-xl w-3xl text-wrap place-self-center"> 
            <p className="text-[#F9F4F4] text-center "> 
                Our platform is built for CUNY students of all majors and experience levels, making it easy to learn about cybersecurity in a way that fits your interests.  
                By creating a profile with your background, goals, and skills, you’ll get content that’s relevant to you.  
                Stay updated with organized news on topics like malware, vulnerabilities, compliance, and more. Additional features like learning resources, career tools,  
                and a student forum are on the horizon to support you even further on your journey.
            </p> 
            </div>
        </section> 

        <section id="mission" className="bg-[#09090B] text-[#F9F4F4] text-center min-h-screen w-full flex flex-col items-center justify-center"> 
            <h1 className="text-5xl mb-4">Our Mission</h1>  
            <div className="h-xl w-3xl text-wrap place-self-center"> 
            <p> 
                Our mission is to help CUNY students learn about cybersecurity in a way that is simple and convenient.  
                We aim to create a space where all students can grow, no matter their major, background, or skill level.  
                Everything we do is focused on making cybersecurity easier to explore and understand. 
            </p> 

            </div>
        </section> 

        <section id="values" className="bg-[#09090B] text-[#F9F4F4] text-center min-h-screen w-full flex flex-col items-center justify-center"> 
            <h1 className="text-5xl mb-4"> Our Values</h1> 
            <div className="h-xl w-3xl text-wrap place-self-center"> 
             <p>Convenience: We make it simple for students to find what they need without wasting time. </p> 
             <p>Ease of Use: Everything on our platform is designed to be clear and user-friendly. </p> 
             <p>Accessibility: We welcome all students, whether you’re just starting out or already have some experience. </p> 
            </div>
        </section>

        <Footer />
        
        </>


    )

}

export default LandingPage