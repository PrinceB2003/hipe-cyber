import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { supabase } from "../lib/supabase"; 
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import SlideInText from "../components/SlideInText";
import { useClerk } from '@clerk/clerk-react';


function EventsPage(){
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); 
    const { signOut, isSignedIn } = useClerk();



    useEffect(() => {
        console.log('useEffect is running');
        const fetchEvents = async () => {
            console.log('fetchEvents function started');
            const { data, error } = await supabase
                .from('events')
                .select('*');
            
            if (error) {
                console.error('Error fetching events:', error);
            } else {
                setEvents(data);
            }
            setLoading(false);
        };

        fetchEvents();
    }, []);

    const handleSignOut = async () => {
            try {
                await signOut();
                navigate('/'); 
            } catch (error) {
                console.error('Error signing out:', error);
            }
        };






    function createEventRows(event){ 
        return (       
                <tr key={event.event_id}>
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{event.event_id}</div></td>  
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{event.event_name}</div></td>
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{event.host_name}</div></td> 
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{event.event_desc}</div></td>
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{new Date(event.event_date_time).toLocaleString()}</div></td>
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{event.event_location}</div></td>
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{event.rec_tech_exp}</div></td>
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{event.rec_tech_knowledge}</div></td>
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{event.rec_cybersec_familarity}</div></td> 
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{event.cybersec_interest}</div></td>
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{event.event_capacity}</div></td>
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div><button className="font-Text font-small text-center text-[#F9F4F4] rounded-full bg-[#00A6FB] h-6 w-24 cursor-pointer hover:scale-125 transition"> 
                                                        Register 
                                                    </button></div></td>
                </tr>

        );
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
            <div className="w-full flex justify-center"> 
                <div id="event-container" className="flex flex-col justify-center align-center gap-12 pt-8 mt-16 mb-8  "> 
                    <div id="event-button-container" className="self-center h-[10rem] w-[50rem] pt-8 bg-[#F9F4F4] rounded-xl border-4 border-[#00A6FB]"> 
                        <div className="gap-4 mb-4"> 
                            <h1 className="font-Heading text-2xl text-center">Welcome to Events</h1>
                            <h2 className="font-SubHeading text-xl text-center">Host your own events or join community sessions to learn and connect.</h2>
                        </div>
                        <div id="button-container" className="flex justify-center gap-6"> 
                            <div className="h-1xl w-36"> 
                                  <Link 
                                    to={isSignedIn ? "/eventform" :"/sign-in"}
                                    className="flex items-center justify-center font-Text font-medium text-center text-[#F9F4F4] rounded-full bg-[#00A6FB] h-6 w-36 hover:scale-125 transition"
                                    >
                                    {isSignedIn? "Host":"Sign in to Host"}
                                </Link>  
                                
                            </div> 
                            <div> 
                                <button className="flex items-center justify-center font-Text font-medium text-center text-[#F9F4F4] rounded-full bg-[#00A6FB] h-6 w-36 cursor-pointer hover:scale-125 transition">Search</button>
                            </div>
                        </div>
                    </div> 

                    <div className="flex justify-center"> 
                        <h2 className="font-SubHeading text-center text-4xl text-[#F9F4F4]">Available Events</h2>
                    </div>
        
                    <div id="event-display-container" className="h-[40rem] pr-4 pb-4 w-[60rem] overflow-auto bg-[#F9F4F4] rounded-xl border-4 border-[#00A6FB]"> 
                        <div id="event-display" className=""> 
                            <table className="">
                                <thead>
                                    <tr className=" text-left border-t-2 border-b-2"> 
                                        <th className="pl-8 pr-8 font-semibold">Event ID </th>
                                        <th className="pl-8 pr-8 font-semibold">Name </th>
                                        <th className="pl-8 pr-8 font-semibold">Host </th>
                                        <th className="pl-8 pr-8 font-semibold">About</th>
                                        <th className="pl-8 pr-8 font-semibold">Date & Time</th>
                                        <th className="pl-8 pr-8 font-semibold">Location</th>
                                        <th className="pl-8 pr-8 font-semibold">Recommended Technical Exp </th> 
                                        <th className="pl-8 pr-8 font-semibold">Recommended Technical Knowledge </th>
                                        <th className="pl-8 pr-8 font-semibold">Recommended Cybersec Familarity </th>
                                        <th className="pl-8 pr-8 font-semibold">Cybersecurity Area </th>
                                        <th className="pl-8 pr-8 font-semibold">Capacity </th>
                                        <th className="pl-8 pr-8 font-semibold"></th>
                                    </tr> 
                                </thead>  
                                

                                <tbody>
                                    {events.map((event) => (
                                         createEventRows(event)
                                    ))}
                            </tbody>

                            </table>
                            

                        </div>
                        
                    </div>
                </div>
            
            </div>
        </SlideInText> 
            
        <Footer></Footer>
            
            
            </>

    )

}




export default EventsPage;