import { supabase } from "../lib/supabase"; 
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SlideInText from "./SlideInText";
import NavBar from "./NavBar";
import { Link } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';

function EventForm(){ 

    const { user, isLoaded } = useUser();
    const {signOut}=useClerk();
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && user) {
                setUserId(user.id);
        }
    }, [isLoaded, user]);

    const handleSignOut = async () => {
            try {
                await signOut();
                navigate('/'); 
            } catch (error) {
                console.error('Error signing out:', error);
            }
        };


    const events = { 
        event_name:'', 
        host_name:'', 
        event_desc:'', 
        event_date_time:'', 
        // event_capacity:0 , 
        event_location:'', 
        rec_tech_exp:'', 
        rec_tech_knowledge:'', 
        rec_cybersec_familarity:'', 
        cybersec_interest:'',
        event_type:'',
        reg_platform:'', 
        reg_deadline:'',
        reg_link:'',
        event_id:0
    };


    const getSingleVal = (selectId) => { 
        return document.getElementById(selectId).value;

    }



    const submitEvent = async () => { 

        if(!isLoaded || !user){ 
            alert("no user found");
            return;
        }


        const savedEventData ={ 
            clerk_user_id: user.id,
            event_name: getSingleVal("evName"),  
            host_name:getSingleVal("hostName"), 
            event_desc:getSingleVal("evDescrip"), 
            event_date_time:getSingleVal("evDate"),
            // event_capacity:parseInt(getSingleVal("event_capacity")), 
            event_location:getSingleVal("event_location"), 
            rec_tech_exp:getSingleVal("tech-exp"), 
            rec_tech_knowledge:getSingleVal("tech-knowledge"), 
            rec_cybersec_familarity:getSingleVal("security-Familiarity"), 
            cybersec_interest:getSingleVal("cybersec-interest"),
            event_type:getSingleVal("event-type"), 
            reg_platform:getSingleVal("reg-platform"), 
            reg_deadline:getSingleVal("reg-deadline"), 
            reg_link:getSingleVal("reg-link"),
            
        };

        // const capacityVal = getSingleVal("event_capacity");

        const {data,error}= await supabase 
        .from('events')
        .insert(savedEventData)

        if(error){ 
           alert("Failed to Submit Event.") 
           console.error('Supabase error:', error);
        }

        if(!error){ 
            alert("Submitted Event Successfully") 
            navigate("/events");
        }
    } 




    return ( 
            <> 
               <NavBar className="mb-8 pb-8"> 
                    <a href="/" className="hover:text-[#00A6FB]"> Home</a>
                    <Link to="/#features" className="hover:text-[#00A6FB]">Features</Link>
                    <button 
                        onClick={handleSignOut} 
                        className="hover:text-[#00A6FB] cursor-pointer bg-transparent border-none text-inherit"
                    > 
                        Sign out
                    </button>
               </NavBar>
               <div className="flex justify-center align-center pt-16"> 
                <SlideInText> 
                    <div id="form-container" className="h-[45rem] w-[40rem]   bg-[#F9F4F4] rounded-lg pt-48 mt-16 flex flex-col justify-center gap-6 border-4 border-[#00A6FB] overflow-y-scroll"> 
                        <div className="mt-4  "> 
                            <h1 className="font-Heading text-center  text-3xl">Host A Event</h1>
                        </div>

                        <div> 
                            <form className="text-[#09090B] "> 
                                <div className="pl-4 "> 
                                    <label htmlFor="evName" className="font-SubHeading font-medium text-base">Event Name: </label>
                                    <input type="text"  
                                        className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm"
                                        id="evName"
                                        placeholder="Enter event name"  
                                    />  
                                    
                                </div>

                                <div className="pl-4"> 
                                    <label htmlFor="hostName" className="font-SubHeading font-medium text-base">Host's Name: </label>
                                    <input type="text"
                                        className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm"  
                                        id="hostName"
                                        placeholder="Enter the Host's name"  
                                    /> 
                                </div>  

                            
                                <div className="pl-4"> 
                                    <label htmlFor="evDescrip" className="font-SubHeading font-medium text-base">Event Description: </label>
                                    <input type="text"
                                        className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm"  
                                        id="evDescrip"
                                        placeholder="Describe your Event"  
                                    /> 
                                </div>

                                <div className="pl-4"> 
                                    <label htmlFor="evDate" className="font-SubHeading font-medium text-base">Event Date & Time: </label>
                                    <input type="datetime-local"
                                        className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm"  
                                        id="evDate"

                                    /> 
                                </div> 


                                <div id="Technical-Experience" className="mb-2 pl-4 "> 
                                    <label htmlFor="technical-experience" className="font-SubHeading font-medium text-nowrap text-base">Recommended Technical Experience</label> 
                                    <select id="tech-exp"
                                    name="tech-experience"  className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm">
                                        <option value="">No Selection</option>
                                        <option value="None"> No Experience Needed</option> 
                                        <option value="Beginner">Beginner Friendly </option> 
                                        <option value="Intermediate">Intermediate </option> 
                                        <option value="Advanced">Advanced </option> 
                                    </select>
                                </div> 

                                <div id="Technical-Knowledge" className="mb-2 pl-4"> 
                                    <label htmlFor="technical-Knowledge" className="font-SubHeading font-medium text-base">Recommended Technical Knowledge</label> 
                                    <select id="tech-knowledge"
                                    name="tech-knowledge" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm  ">
                                        <option value="">No Selection</option>
                                        <option value="None"> None Required </option> 
                                        <option value="Beginner"> Beginner Friendly </option> 
                                        <option value="Intermediate">Intermediate </option> 
                                        <option value="Advanced">Advanced</option>  
                                    </select>
                                </div> 

                                <div id="Cybersecurity-Familiarity" className="mb-2 pl-4"> 
                                    <label htmlFor="security-Familiarity" className="font-SubHeading font-medium text-nowrap text-base">Recommended Cybersecurity Familarity</label> 
                                    <select id="security-Familiarity" 
                                    name="security-Familiarity" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B]  w-11/12  rounded-sm ">
                                        <option value="">No Selection</option>
                                        <option value="None">No Familiarity Needed</option> 
                                        <option value="Some">Somewhat Familiar </option> 
                                        <option value="Familiar">Familiar </option>   
                                        <option value="Very-Familiar">Very Familiar</option>
                                </select>
                                </div>

                                <div id="Cybersec-Interest" className="mb-2 pl-4"> 
                                    <label htmlFor="cybersec-interest" className="font-SubHeading font-medium text-base text-[#09090B]">Area of Cybersecurity</label>
                                    <select id="cybersec-interest"
                                    name="cybersec-interest" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm"
                                    >   
                                        <option value="">No Selection</option>
                                        <option value="Network-Security">Network-Security</option>
                                        <option value="cloud-security">Cloud-Security</option>
                                        <option value="Application-Security">Application-Security</option>
                                        <option value="Information-Security">Information-Security</option>
                                        <option value="GRC">Governance, Risk, and Compliance (GRC)</option>
                                        <option value="SOC">Security Operations (SOC)</option>
                                        <option value="Incident-Response">Incident-Response</option>
                                        <option value="Threat-Hunting">Threat-Hunting</option>
                                        <option value="Penetration-Testing">Penetration-Testing</option>
                                        <option value="Red-Team Ops">Red-Team-Ops</option>
                                        <option value="Blue-Team Ops">Blue-Team-Ops</option>
                                        <option value="Digital-Forensics">Digital-Forensics</option>
                                        <option value="IAM">Identity and Access Management (IAM)</option>
                                        <option value="Cryptography">Cryptography</option>
                                        <option value="Malware-Analysis">Malware-Analysis</option>
                                        <option value="Endpoint-Security">Endpoint-Security</option>
                                        <option value="Vulnerability-Management">Vulnerability-Management</option>
                                        <option value="DevSecOps">DevSecOps</option>
                                        <option value="IoT-Security">IoT-Security</option>
                                        <option value="Cybersecurity-Policy-Strategy">Cybersecurity-Policy-and-Strategy</option>
                                    </select>
                                </div>

                                <div id="event-Type" className="mb-2 pl-4"> 
                                    <label htmlFor="event-Type" className="font-SubHeading font-medium text-nowrap text-base">What type of event is this?</label> 
                                    <select id="event-type" 
                                    name="event-type" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B]  w-11/12  rounded-sm ">
                                        <option value="">No Selection</option>
                                        <option value="In-Person">In-Person</option> 
                                        <option value="Virtual">Virtual </option> 
                                        <option value="Hybrid">Hybrid </option>   
                                </select>
                                </div>


                                <div id="event-location" className="mb-2 pl-4"> 
                                    <label htmlFor="event-location" className="font-SubHeading font-medium text-nowrap text-base">Event Location</label>
                                    <input type="text" 
                                        className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm"
                                        id="event_location" 
                                        placeholder="Place address or zoom link here."
                                    />
                                </div>

                                <div id="reg-Platform" className="mb-2 pl-4"> 
                                    <label htmlFor="reg-Platform" className="font-SubHeading font-medium text-nowrap text-base">Registration Platform</label> 
                                    <select id="reg-platform" 
                                    name="reg-platform" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B]  w-11/12  rounded-sm ">
                                        <option value="">No Selection</option>
                                        <option value="Zoom">Zoom</option> 
                                        <option value="EventBrite">EventBrite </option> 
                                        <option value="Google Forms">Google Forms</option> 
                                        <option value="Slack">Slack</option>  
                                </select>
                                </div> 

                                <div id="reg-Link" className="mb-2 pl-4"> 
                                    <label htmlFor="reg-link" className="font-SubHeading font-medium text-nowrap text-base">Registration Link</label>
                                    <input type="text" 
                                        className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm"
                                        id="reg-link" 
                                        placeholder="Place registration link here."
                                    />
                                </div>

                                <div className="pl-4"> 
                                    <label htmlFor="regDeadline" className="font-SubHeading font-medium text-base">Registration Deadline</label>
                                    <input type="datetime-local"
                                        className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm"  
                                        id="reg-deadline"

                                    /> 
                                </div>  



                                                

                                
                                <div className="flex justify-center mt-8"> 
                                    <button className="font-Text font-medium  text-center text-[#F9F4F4] rounded-full bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition" 
                                    type="button"
                                    onClick={submitEvent}   
                                    > 
                                        {!isLoaded ? 'Loading...' : 'Host Event'} 
                                    </button>
                                </div>

                                
                                
                            </form>
                        </div>

                    </div>  
                
               </SlideInText>
               
               </div> 
                
                
            </>

        )   
}

export default EventForm;