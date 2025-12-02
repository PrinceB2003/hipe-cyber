import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { BookOpenText } from "lucide-react";
import SmallHeroCard from "../components/SmallHeroCard";
import { Link,useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { useUser } from "@clerk/clerk-react";
import { Carousel } from "flowbite-react";
import SlideInText from "../components/SlideInText";
import { useEffect } from 'react';

function LearnPage () { 

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



                    return( 
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
                                <section id="hero" className="mt-32 mb-4 flex justify-center items-center gap-4">
                                    <div id="greeting-container"> 
                                        <div className="mt-2 mb-2"> 
                                            <h1 className="text-[#F9F4F4] text-center text-4xl font-Heading"> Welcome to the Learning Hub!</h1>
                                        </div> 

                                        <div className="mt-2 mb-2"> 
                                            <h2 className="text-[#F9F4F4] text-center text-3xl font-SubHeading"> A variety of resources can be found here.</h2>
                                        </div>
                                    </div> 

                                    <div id="img-container"> 
                                        <BookOpenText className="animate-pulse" size={192} color={"#00A6FB"}/>
                                    </div>
                                </section> 
                            </SlideInText>
                            
                                <section id="foundations" className="mt-16 mb-16"> 
                                    <div> 
                                        <h2 className="text-[#F9F4F4] text-center text-4xl font-SubHeading"> Foundations</h2>
                                    </div>
                                    <div id="foundation-info-container"className="relative"> 

                                        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96"> 
                                            <Carousel id="my-carousel" slideInterval={6000}> 
                                                <div className="relative flex justify-center items-center" key={0}> 
                                                    <SmallHeroCard className="relative flex justify-center items-center" key={0}> 
                                                        <div className=""> 
                                                            <div className="p-4"> 
                                                                <h2 className="text-SubHeading text-4xl">Operating Systems</h2>
                                                            </div>

                                                            <div className="p-4"> 
                                                                <p className="text-2xl font-Text text-center">Resources About Operating Systems</p>
                                                            </div> 

                                                            <div className="p-4 flex justify-center items-center"> 
                                                                <Link 
                                                                    to="/OS-Resources"
                                                                    className="font-Text font-medium text-center rounded-md bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                                                > 
                                                                    Learn More
                                                                </Link>
                                                            </div>
                                                        </div> 
                                                        
                                                    </SmallHeroCard>
                                                </div> 

                                                <div className="relative flex justify-center items-center" key={1}> 
                                                    <SmallHeroCard> 
                                                        <div> 
                                                            <div className="p-4"> 
                                                                <h2 className="text-4xl font-SubHeading text-center">Networking </h2>
                                                            </div>

                                                            <div className="p-4">
                                                                <p className="text-2xl font-Text"> Resources About Networking </p>
                                                            </div>

                                                            <div className="p-4 flex justify-center items-center"> 
                                                                <Link 
                                                                    to="/Network-Resources"
                                                                    className="font-Text font-medium text-center rounded-md bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                                                > 
                                                                    Learn More
                                                                </Link>
                                                            </div>

                                                        </div>
                                                        
                                                    </SmallHeroCard>
                                                </div> 

                                                <div className="relative flex justify-center items-center" key={2}> 
                                                    <SmallHeroCard> 
                                                        <div> 
                                                            <div className="p-4"> 
                                                                <h2 className="text-4xl font-SubHeading text-center">Security Concepts</h2>
                                                            </div>

                                                            <div className="p-4"> 
                                                                <p className="text-2xl font-Text text-center">Resources About Security Concepts</p>
                                                            </div>

                                                            <div className="p-4 flex justify-center items-center"> 
                                                                <Link 
                                                                    to="/Security-Resources"
                                                                    className="font-Text font-medium text-center rounded-md bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                                                > 
                                                                    Learn More
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        
                                                    </SmallHeroCard>
                                                </div> 

                                                <div className="relative flex justify-center items-center" key={3}> 
                                                    <SmallHeroCard> 
                                                        <div> 
                                                            <div className="p-4"> 
                                                                <h2 className="text-4xl font-SubHeading text-center">IT Fundamentals</h2>
                                                            </div>
                                                            
                                                            <div className="p-4"> 
                                                                <p className="text-2xl font-Text">Resources about IT Fundamentals</p>
                                                            </div>

                                                            <div className="p-4 flex justify-center items-center"> 
                                                                <Link 
                                                                    to="/IT-Resources"
                                                                    className="font-Text font-medium text-center rounded-md bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                                                > 
                                                                    Learn More
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        
                                                    </SmallHeroCard>
                                                </div>

                                                <div className="relative flex justify-center items-center" key={4}> 
                                                    <SmallHeroCard> 
                                                        <div> 
                                                            <div className="p-4"> 
                                                                <h2 className="text-4xl font-SubHeading text-center">Cloud</h2>
                                                            </div>

                                                            <div className="p-4"> 
                                                                <p className="text-2xl font-Text">Resources about Cloud</p>
                                                            </div>

                                                            <div className="p-4 flex justify-center items-center"> 
                                                                <Link 
                                                                    to="/Cloud-Resources"
                                                                    className="font-Text font-medium text-center rounded-md bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                                                > 
                                                                    Learn More
                                                                </Link>
                                                            </div>

                                                        </div>
                                                        
                                                    </SmallHeroCard>
                                                </div>
                                            </Carousel> 
                                        </div>
                                    
                                    </div>

                                </section> 

                                <section id="community-resouces" className="mt-16-mb-16"> 
                                    <div className="mt-4 mb-4"> 
                                        <h1 className="text-[#F9F4F4] text-center text-4xl font-Heading">Resources for the community by the community</h1>
                                    </div> 

                                    <div className="mt-4 mb-4"> 
                                        <h2 className="text-[#F9F4F4] text-center text-3xl font-SubHeading">Access resources shared by others</h2>
                                    </div>

                                    <div className="flex justify-center items-center mt-4 mb-4 "> 
                                        
                                        <div className="flex gap-8 ">   

                                        <button
                                            className="font-Text font-medium text-center text-[#F9F4F4] rounded-full bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition" 
                                        > 
                                            Upload Resources 
                                        </button> 
                                        
                                        <button
                                            className="font-Text font-medium text-center text-[#F9F4F4] rounded-full bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition" 
                                        >  
                                            View Resources 
                                        </button> 

                                        </div>

                                    </div>
                                      

                                </section>
                             
                            
                            
                            
                            
                            
                            
                            
                            
                                <Footer className="mt-32"> 

                                </Footer>
                            
                            
                            </>
                    )


} 





export default LearnPage;