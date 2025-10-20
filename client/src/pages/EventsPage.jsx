import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { supabase } from "../lib/supabase"; 
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import SlideInText from "../components/SlideInText";


function EventsPage(){
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); 

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
                    <td className="font-Text pl-8 pr-8"><div>{event.event_id}</div></td>  
                    <td className="font-Text pl-8 pr-8"><div>{event.event_name}</div></td>
                    <td className="font-Text pl-8 pr-8"><div>{event.host_name}</div></td> 
                    <td className="font-Text pl-8 pr-8"><div>{event.event_desc}</div></td>
                    <td className="font-Text pl-8 pr-8"><div>{new Date(event.event_date_time).toLocaleString()}</div></td>
                    <td className="font-Text pl-8 pr-8"><div>{event.event_location}</div></td>
                    <td className="font-Text pl-8 pr-8"><div>{event.rec_tech_exp}</div></td>
                    <td className="font-Text pl-8 pr-8"><div>{event.rec_tech_knowledge}</div></td>
                    <td className="font-Text pl-8 pr-8"><div>{event.rec_cybersec_familarity}</div></td> 
                    <td className="font-Text pl-8 pr-8"><div>{event.cybersec_interest}</div></td>
                    <td className="font-Text pl-8 pr-8"><div>{event.event_capacity}</div></td>
                    <td className="font-Text pl-8 pr-8"><div><button className="font-Text font-small text-center text-[#F9F4F4] rounded-full bg-[#00A6FB] h-6 w-24 cursor-pointer hover:scale-125 transition"> 
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
                    <button 
                        onClick={handleSignOut} 
                        className="hover:text-[#00A6FB] cursor-pointer bg-transparent border-none text-inherit"
                    > 
                        Sign out
                    </button>
            </NavBar> 
        <SlideInText> 
            <div className="w-full flex justify-center"> 
                <div id="event-container" className="flex flex-col justify-center align-center gap-12 pt-8 mt-16 mb-8"> 
                    <div id="event-button-container" className=" h-[10rem] w-[50rem] pt-8 bg-[#F9F4F4] rounded-xl"> 
                        <div className="gap-4 mb-4"> 
                            <h1 className="font-Heading text-2xl text-center">Welcome to Events</h1>
                            <h2 className="font-SubHeading text-xl text-center">Host your own events or join community sessions to learn and connect.</h2>
                        </div>
                        <div id="button-container" className="flex justify-center gap-6"> 
                            <div className="h-1xl w-36"> 
                                <Link
                                    to="/eventform"
                                    className="flex items-center justify-center font-Text font-medium text-center text-[#F9F4F4] rounded-full bg-[#00A6FB] h-6 w-36 hover:scale-125 transition"
                                    >
                                    Host
                                </Link>
                            </div> 
                            <div> 
                                <button className="flex items-center justify-center font-Text font-medium text-center text-[#F9F4F4] rounded-full bg-[#00A6FB] h-6 w-36 cursor-pointer hover:scale-125 transition">Search</button>
                            </div>
                        </div>
                    </div> 
        
                    <div id="event-display-container" className="h-[30rem] w-[50rem] max-w-[58rem] overflow-auto bg-[#F9F4F4] rounded-xl"> 
                    <div className="flex justify-center mt-0 mb-0"> 
                        <h2 className="font-SubHeading  text-3xl">Available Events</h2>
                    </div>
                        <div id="event-display"  > 
                            <table className="">
                                <thead>
                                    <tr> 
                                        <th className="pl-8 pr-8">Event ID </th>
                                        <th className="pl-8 pr-8">Name </th>
                                        <th className="pl-8 pr-8">Host </th>
                                        <th className="pl-8 pr-8">About</th>
                                        <th className="pl-8 pr-8">Date & Time</th>
                                        <th className="pl-8 pr-8">Location</th>
                                        <th className="pl-8 pr-8">Recommended Technical Exp </th> 
                                        <th className="pl-8 pr-8">Recommended Technical Knowledge </th>
                                        <th className="pl-8 pr-8">Recommended Cybersec Familarity </th>
                                        <th className="pl-8 pr-8">Cybersecurity Area </th>
                                        <th className="pl-8 pr-8">Capacity </th>
                                        <th className="pl-8 pr-8"></th>
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