
import { supabase } from "../lib/supabase"; 
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

console.log('Supabase client:', supabase); 

function EventForm(){ 

    const { user, isLoaded } = useUser();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (isLoaded && user) {
                setUserId(user.id);
        }
    }, [isLoaded, user]);


    const events = { 
        event_name:'', 
        host_name:'', 
        event_desc:'', 
        event_date_time:'', 
        event_capacity:0 , 
        event_location:'', 
        rec_tech_exp:'', 
        rec_tech_knowledge:'', 
        rec_cybersec_familarity:'', 
        cybersec_interest:'',
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

        console.log('userId at submit time:', user.id);

        const savedEventData ={ 
            clerk_user_id: user.id,
            event_name: getSingleVal("evName"),  
            host_name:getSingleVal("hostName"), 
            event_desc:getSingleVal("evDescrip"), 
            event_date_time:getSingleVal("evDate"),
            event_capacity:parseInt(getSingleVal("event_capacity")), 
            event_location:getSingleVal("event_location"), 
            rec_tech_exp:getSingleVal("tech-exp"), 
            rec_tech_knowledge:getSingleVal("tech-knowledge"), 
            rec_cybersec_familarity:getSingleVal("security-Familiarity"), 
            cybersec_interest:getSingleVal("cybersec-interest"),
            
        };

        const capacityVal = getSingleVal("event_capacity");
        console.log('Capacity value from select:', capacityVal, 'Type:', typeof capacityVal); 
        console.log('Submitting data:', savedEventData);
        const {data,error}= await supabase 
        .from('events')
        .insert(savedEventData)

        if(error){ 
           alert("Failed to Submit Event.") 
           console.error('Supabase error:', error);
        }

        if(!error){ 
            alert("Submitted Event Successfully")
        }
    } 




    return ( 
            <> 
               <div className="flex justify-center align-center"> 
                <div id="form-container" className="h-[45rem] w-[40rem] bg-[#F9F4F4] rounded-lg mt-8 flex flex-col justify-center gap-6"> 
                    <div className="mt-4"> 
                        <h1 className="font-Heading text-center text-3xl">Host A Event</h1>
                    </div>

                    <div> 
                        <form className="text-[#09090B]"> 
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
                                    <option value="None"> None - No Experience </option> 
                                    <option value="Beginner">Beginner </option> 
                                    <option value="Intermediate">Intermediate </option> 
                                    <option value="Advanced">Advanced </option> 
                                </select>
                            </div> 

                            <div id="Technical-Knowledge" className="mb-2 pl-4"> 
                                <label htmlFor="technical-Knowledge" className="font-SubHeading font-medium text-base">Recommended Technical Knowledge</label> 
                                <select id="tech-knowledge"
                                name="tech-knowledge" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm  ">
                                    <option value="">No Selection</option>
                                    <option value="None"> None </option> 
                                    <option value="Beginner"> Beginner </option> 
                                    <option value="Intermediate">Intermediate </option> 
                                    <option value="Advanced">Advanced</option>  
                                </select>
                            </div> 

                            <div id="Cybersecurity-Familiarity" className="mb-2 pl-4"> 
                                <label htmlFor="security-Familiarity" className="font-SubHeading font-medium text-nowrap text-base">Recommended Cybersecurity Familarity</label> 
                                <select id="security-Familiarity" 
                                name="security-Familiarity" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B]  w-11/12  rounded-sm ">
                                    <option value="">No Selection</option>
                                    <option value="None">Not familiar</option> 
                                    <option value="Some">Somewhat familiar </option> 
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
                                    <option value="network-security">Network Security</option>
                                    <option value="cloud-security">Cloud Security</option>
                                    <option value="application-security">Application Security</option>
                                    <option value="information-security">Information Security</option>
                                    <option value="grc">Governance, Risk, and Compliance (GRC)</option>
                                    <option value="soc">Security Operations (SOC)</option>
                                    <option value="incident-response">Incident Response</option>
                                    <option value="threat-hunting">Threat Hunting</option>
                                    <option value="penetration-testing">Penetration Testing / Ethical Hacking</option>
                                    <option value="red-team">Red Team Operations</option>
                                    <option value="blue-team">Blue Team Operations</option>
                                    <option value="digital-forensics">Digital Forensics</option>
                                    <option value="iam">Identity and Access Management (IAM)</option>
                                    <option value="cryptography">Cryptography</option>
                                    <option value="malware-analysis">Malware Analysis</option>
                                    <option value="endpoint-security">Endpoint Security</option>
                                    <option value="vulnerability-management">Vulnerability Management</option>
                                    <option value="devsecops">DevSecOps</option>
                                    <option value="iot-security">IoT Security</option>
                                    <option value="policy-strategy">Cybersecurity Policy and Strategy</option>
                                </select>
                            </div>

                            <div id="event-capacity" className="mb-2 pl-4"> 
                                <label htmlFor="event-capacity" className="font-SubHeading font-medium text-nowrap text-base">Event Capacity</label> 
                                <select id="event_capacity" 
                                name="event-capacity" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B]  w-11/12  rounded-sm ">
                                    <option value="">No Selection</option>
                                    <option value="5">5</option> 
                                    <option value="10">10 </option> 
                                    <option value="15">15 </option>   
                                    <option value="20">20</option>
                                    <option value="25">25 </option>   
                                    <option value="30">30</option>
                                    <option value="40">40</option> 
                                    <option value="50">50</option>

                            </select>
                            </div> 

                            <div id="event-location" className="mb-2 pl-4"> 
                                <label htmlFor="event-location" className="font-SubHeading font-medium text-nowrap text-base">Event Location</label> 
                                <select id="event_location" 
                                name="event-location" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B]  w-11/12  rounded-sm ">
                                    <option value="">No Selection</option>
                                    <option value="remote">Remote</option> 
                                    <option value="in-person">In-Person</option>
                            </select>
                            </div> 



                            

                             

                            
                            <div className="flex justify-center mt-8"> 
                                <button className="font-Text font-medium  text-center text-[#F9F4F4] rounded-full bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition" 
                                type="button"
                                onClick={submitEvent}
                                // disabled={!isLoaded || !user}     
                                > 
                                    {!isLoaded ? 'Loading...' : 'Host Event'} 
                                </button>
                            </div>

                            
                            
                        </form>
                    </div>

                </div>  
                
               </div> 
                
                
            </>

        )   
}

export default EventForm;