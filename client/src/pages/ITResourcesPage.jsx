import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SmallHeroCard from "../components/SmallHeroCard"; 
import { Link,useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { useUser } from "@clerk/clerk-react";
import {Laptop} from 'lucide-react'
import SlideInText from "../components/SlideInText";
import { useEffect } from 'react';



function ITResourcePage () { 

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
                                                <h1 className="text-[#F9F4F4] font-Heading text-5xl text-center">Welcome, to IT resources!</h1>
                                            </div> 

                                            <div> 
                                                <h2 className="text-[#F9F4F4] font-SubHeading text-3xl text-center ">Resources dedicated to learning about IT fundamentals.</h2>
                                            </div>
                                        </div>  

                                        <div id="logo-container"> 
                                            <Laptop className="animate-pulse" size={192} color={"#00A6FB"}/>
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
                                                        <h2 className="font-SubHeading text-xl text-center"> freeCodeCamp - Computer Basics for Absolute Beginners </h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A comprehensive video course covering fundamental computer concepts including hardware components, operating systems, internet connectivity, cloud computing, computer maintenance, and digital safety for complete beginners.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://www.freecodecamp.org/news/computer-basics-beginners/" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center" >Cisco Networking Academy - IT Essentials </h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">An interactive course teaching practical IT career skills in computer hardware, software, networking, security, mobile devices, troubleshooting, and operating system installation with hands-on virtual labs.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://www.netacad.com/courses/it-essentials" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center">Harvard CS50 - Introduction to Computer Science (edX) - </h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">Harvard's famous introductory course teaching algorithmic thinking, problem-solving, data structures, programming in C, Python, SQL, and JavaScript with real-world problem sets and projects.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link
                                                            to="https://www.edx.org/learn/computer-science/harvard-university-cs50-s-introduction-to-computer-science" target="_blank" rel="noopener noreferrer" 
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
                                                        <h2 className="font-SubHeading text-xl text-center">MIT OpenCourseWare - Introduction to Computer Science</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center"> A free MIT course providing foundational computer science knowledge including computation, algorithms, problem-solving, and programming using Python with complete lecture videos and materials.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link
                                                            to="https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/" target="_blank" rel="noopener noreferrer" 
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
                                                        <h2 className="font-SubHeading text-xl text-center">IT Fundamentals for Beginners</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A beginner-friendly course teaching essential digital skills including device usage, internet browsing, email communication, online security, financial safety, and protecting personal information online.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link
                                                            to="https://alison.com/course/it-fundamentals-for-beginners" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center">Cybrary - IT and Cybersecurity Foundations Career Path</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A comprehensive 30-course career path with hands-on virtual labs covering operating system fundamentals, network fundamentals, cybersecurity fundamentals, and programming/scripting basics for complete beginners.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link
                                                            to="https://www.cybrary.it/career-path/foundations" target="_blank" rel="noopener noreferrer" 
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
                                                        <h2 className="font-SubHeading text-xl text-center">Khan Academy - Computer Science </h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A free platform offering programming fundamentals, algorithms, cryptography, and information theory courses with interactive exercises and projects suitable for building foundational computing knowledge.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://www.khanacademy.org/computing/computer-science" target="_blank" rel="noopener noreferrer"
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
                                                        <h2 className="font-SubHeading text-xl text-center">Udemy - IT & Tech Introduction Crash Course for Beginners</h2>
                                                    </div> 
                                                    <div className="mt-2 mb-2"> 
                                                        <p className="font-Text text-lg text-center">A compact beginner-friendly course covering fundamentals of hardware, software, data, and cloud computing including concepts of servers, storage, databases, operating systems, and software architecture.</p>
                                                    </div>
                                                    <div className="flex justify-center items-center mt-2 mb-2"> 
                                                        <Link 
                                                            to="https://www.udemy.com/course/it-tech-introduction-crash-course-for-beginner/" target="_blank" rel="noopener noreferrer"
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

export default ITResourcePage;