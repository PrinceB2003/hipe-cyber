import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { supabase } from "../lib/supabase"; 
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import SlideInText from "../components/SlideInText";
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import EventPopUp from "../components/EventPopUp";


function EventsPage(){
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cybersecFilter,setCybersecFilter] = useState(); 
    const [appliedFilter,setAppliedFilter] = useState(); 
    const { signOut, isSignedIn } = useClerk();
    const navigate = useNavigate();  
    const [ShowPopUp, setShowPopUp] = useState(false);
    const [currEventId,setCurrEventID]=useState(null);
    const { user } = useUser()

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

    const filteredEvents = events.filter( 
        event=> { 
            if(!appliedFilter || appliedFilter==""){ 
                return true;
            }
            return event.cybersec_interest?.toLowerCase()==appliedFilter.toLowerCase();
        } 
    ) 

    const handleAppliedFilter = () => { 
        setAppliedFilter(cybersecFilter);
    };
       
    

    const handleSignOut = async () => {
            try {
                await signOut();
                navigate('/'); 
            } catch (error) {
                console.error('Error signing out:', error);
            }
        };


    function handleRegister(event){ 
            if(isSignedIn&&event.reg_link && event.reg_link!=null && event.reg_link!=""){ 
                window.open(event.reg_link,'_blank');
                console.log(event.reg_link);

                setCurrEventID(event.event_id);

                setTimeout ( ()=> { 
                    setShowPopUp(true);
                }, 1500);
            }

            else if(!isSignedIn){ 
                navigate('/sign-in');
            }

            else { 
                alert("Registration Link Unavailable");
                console.log(event.reg_link);
            }
            
        }

        const handleCancelEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to cancel and delete this event? This action cannot be undone.')) {
        return;
    }

    try {
        const { error } = await supabase
            .from('events')
            .delete()
            .eq('event_id', eventId)
            .eq('clerk_user_id', user.id);

        if (error) throw error;

    
        setEvents(prevEvents => 
            prevEvents.filter(event => event.event_id !== eventId)
        );

        alert('Event cancelled and removed successfully');
        } catch (error) {
            console.error('Error cancelling event:', error);
            alert('Failed to cancel event. Please try again.');
        }
    };



    function createEventRows(event){ 
        const isHost = user && event.clerk_user_id === user.id;
        return (       
                <tr key={event.event_id}>
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{event.event_name}</div></td>
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{event.host_name}</div></td> 
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{event.event_desc}</div></td>
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{new Date(event.event_date_time).toLocaleString()}</div></td>
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{event.event_type}</div></td>
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{new Date(event.reg_deadline).toLocaleString()}</div></td>
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div><button  
                                                                                    onClick={()=>handleRegister(event)} 
                                                                                    className="font-Text font-small text-center text-[#F9F4F4] rounded-full bg-[#00A6FB] h-6 w-32  cursor-pointer hover:scale-125 transition"> 
                                                                                        {isSignedIn? "Register": "Sign In to Register"}
                                                                        </button></div></td>
                                                                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"> 
                                                                        {isHost && (
                                                                                    <button  
                                                                                        onClick={()=>handleCancelEvent(event.event_id)} 
                                                                                        className="font-Text font-small text-center text-[#F9F4F4] rounded-full bg-red-500 h-6 w-24 cursor-pointer hover:scale-125 transition"> 
                                                                                        Cancel
                                                                                    </button>
                                                                                 )} 
                                                                    </td>
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{event.reg_platform}</div></td>        
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{event.event_location}</div></td>
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{event.rec_tech_exp}</div></td>
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{event.rec_tech_knowledge}</div></td>
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{event.rec_cybersec_familarity}</div></td> 
                    <td className="font-Text pl-8 pr-8 pt-4 pb-4 border-b-2"><div>{event.cybersec_interest}</div></td>
                    
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

            <EventPopUp 
                show={ShowPopUp} 
                onClose={()=>setShowPopUp(false)}
                eventId={currEventId}
            />

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
                            <div className="flex gap-2"> 
                                <select
                                    value={cybersecFilter}
                                    onChange={(e) => setCybersecFilter(e.target.value)}
                                    className="font-Text text-center rounded-full border-2 border-[#00A6FB] h-6 w-48 px-3 focus:outline-none focus:border-[#0582ca] cursor-pointer"
                                >
                                    <option value="">No Selection</option>
                                    <option value="Network-Security">Network Security</option>
                                    <option value="cloud-security">Cloud Security</option>
                                    <option value="Application-Security">Application Security</option>
                                    <option value="Information-Security">Information Security</option>
                                    <option value="GRC">Governance, Risk, and Compliance (GRC)</option>
                                    <option value="SOC">Security Operations (SOC)</option>
                                    <option value="Incident-Response">Incident Response</option>
                                    <option value="Threat-Hunting">Threat Hunting</option>
                                    <option value="Penetration-Testing">Penetration Testing</option>
                                    <option value="Red-Team Ops">Red Team Ops</option>
                                    <option value="Blue-Team Ops">Blue Team Ops</option>
                                    <option value="Digital-Forensics">Digital Forensics</option>
                                    <option value="IAM">Identity and Access Management (IAM)</option>
                                    <option value="Cryptography">Cryptography</option>
                                    <option value="Malware-Analysis">Malware Analysis</option>
                                    <option value="Endpoint-Security">Endpoint Security</option>
                                    <option value="Vulnerability-Management">Vulnerability Management</option>
                                    <option value="DevSecOps">DevSecOps</option>
                                    <option value="IoT-Security">IoT Security</option>
                                    <option value="Cybersecurity-Policy-Strategy">Cybersecurity Policy and Strategy</option>
                                </select>
                                 <button  
                                    onClick={handleAppliedFilter}
                                    className="flex items-center justify-center font-Text font-medium text-center text-[#F9F4F4] rounded-full bg-[#00A6FB] h-6 w-36 cursor-pointer hover:scale-125 transition"> 
                                    Filter 
                                    </button>
                            </div>
                        </div>
                    </div> 

                    <div className="flex justify-center"> 
                        <h2 className="font-SubHeading text-center text-4xl text-[#F9F4F4]">Available Events</h2>
                    </div>
        
                    <div id="event-display-container" className="h-[40rem] pr-4 pb-4 w-[62rem] overflow-auto bg-[#F9F4F4] rounded-xl border-4 border-[#00A6FB]"> 
                        <div id="event-display" className=""> 
                            <table className="">
                                <thead>
                                    <tr className=" text-left border-t-2 border-b-2"> 
                                        <th className="pl-8 pr-8 font-semibold">Name </th>
                                        <th className="pl-8 pr-8 font-semibold">Host </th>
                                        <th className="pl-8 pr-8 font-semibold">About</th>
                                        <th className="pl-8 pr-8 font-semibold">Date & Time</th>
                                        <th className="pl-8 pr-8 font-semibold">Type</th>
                                        <th className="pl-8 pr-8 font-semibold">Registration Deadline</th>
                                        <th className="pl-8 pr-8 font-semibold"></th>
                                        <th className="pl-8 pr-8 font-semibold"></th>
                                        <th className="pl-8 pr-8 font-semibold">Registration Platform</th>
                                        <th className="pl-8 pr-8 font-semibold">Location</th>
                                        <th className="pl-8 pr-8 font-semibold">Recommended Technical Exp </th> 
                                        <th className="pl-8 pr-8 font-semibold">Recommended Technical Knowledge </th>
                                        <th className="pl-8 pr-8 font-semibold">Recommended Cybersec Familarity </th>
                                        <th className="pl-8 pr-8 font-semibold">Cybersecurity Area </th>
                                    </tr> 
                                </thead>  
                                

                                <tbody>
                                    {filteredEvents.map((event) => (
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