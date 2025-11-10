import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ForumAccordian from "../components/ForumAccordian";
import { Link } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { useUser } from "@clerk/clerk-react";
import SlideInText from "../components/SlideInText"

function ForumPage () { 

    const { signOut, isSignedIn } = useClerk();


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
                    <NavBar className> 
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
                    <div className="text-center mt-32 mb-4"> 
                        <h1 className="font-Heading text-5xl text-[#F9F4F4] hover:text-[#00A6FB] hover:scale-125 transition  ">Welcome to the forum!</h1>
                    </div> 
                    <div className="text-center mb-4"> 
                        <h2 className="font-SubHeading text-2xl text-[#F9F4F4] animate-pulse"> A place to connect and grow together.</h2>
                    </div> 
                    
                    <div id="wrapper" className="flex justify-center items-center gap-8 mt-8 mb-16"> 
                        <div id="forum-accordian" > 
                            <ForumAccordian/>
                        </div>
                        
                        <div id="chat-screen" className=" flex flex-col h-[42rem] w-[40rem] justify-between  border-[#00A6FB] border-solid border-2 rounded-xl">
                            <div id="messages-area"> 

                            </div>
                             
                            <div className="flex gap-2 ml-2 mb-2 mr-2"> 
                                <input  
                                className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-[35rem] rounded-sm"  
                                type="text"  
                                placeholder="Type your message here...">

                                </input>
                                <button className="bg-[#00A6FB] text-[#F9F4F4] h-12 w-24 rounded-lg hover:scale-125 transition">
                                            Send
                                </button>
                            </div>
                        </div>


                    </div>

                </SlideInText>    
                   
                 <Footer/>


                    

                </>



        )
        





}

export default ForumPage;