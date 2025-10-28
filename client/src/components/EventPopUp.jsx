import { supabase } from "../lib/supabase"; 
import { useUser } from "@clerk/clerk-react";



function EventPopUp({show, onClose, eventId}) { 

    const { user } = useUser();

        const checkRegistrationLimit = async (uid) => {
        const { data, error, count } = await supabase
            .from('registered_events')
            .select('*', { count: 'exact', head: true })
            .eq('clerk_user_id', uid);

        if (error) {
            console.error('Error checking registration count:', error);
            return false;
        }

        return count < 5;
    };

        const checkDuplicateRegistration = async (uid, evtId) => {
        const { data, error } = await supabase
            .from('registered_events')
            .select('*')
            .eq('clerk_user_id', uid)
            .eq('event_id', evtId)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error('Error checking duplicate:', error);
            return false;
        }

        return data !== null;
    };


    const handleYes = async () => {
        if (!user || !eventId) {
            alert('Error: Missing user or event information');
            return;
        }

        try {

            const isDuplicate = await checkDuplicateRegistration(user.id, eventId);
                if (isDuplicate) {
                    alert('You are already registered for this event!');
                    onClose();
                return;
            }

            const canRegister = await checkRegistrationLimit(user.id);
                if (!canRegister) {
                    alert('You have reached the maximum limit of 5 registered events. Please cancel an event from your profile before registering for a new one.');
                    onClose();
                return;
            }

            // SUPABASE CALL - Insert registration
            const { data, error } = await supabase
                .from('registered_events')
                .insert({
                    clerk_user_id: user.id,
                    event_id: eventId
                });

            if (error) {
                if (error.code === '23505') {
                    alert('You already registered for this event!');
                } else {
                    console.error('Error saving registration:', error);
                    alert('Failed to save registration');
                }
            } else {
                alert('Registration saved successfully! 🎉');
                onClose();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving registration');
        }
    };

    const handleNo = () => {
        onClose();
    };

    if (!show) return null;




    return ( 
            <> 
            <div  
                onClick={onClose}
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn"
                > 
                <div id="popup-container" className="h-[12rem] w-[20rem] flex flex-col justify-center items-center gap-4 bg-[#F9F4F4] rounded-xl border-4 border-[#00A6FB]"> 
                    <div id="text-container"> 
                        <h1 className="font-SubHeading text-xl">Did you register for the event?</h1>
                    </div> 
                    <div id="button-container" className="flex gap-4">
                        <div> 
                            <button  
                                onClick={handleYes}
                                className="font-text font-small text-center text-[#F9F4F4] rounded-full bg-[#00A6FB] h-6 w-32  cursor-pointer hover:scale-125 transition"> 
                                Yes
                            </button>
                        </div> 

                        <div> 
                            <button  
                                onClick={handleNo}
                                className="font-text font-small text-center text-[#F9F4F4] rounded-full bg-[#00A6FB] h-6 w-32  cursor-pointer hover:scale-125 transition">  
                                No
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            </>

    )
        
    


}

export default EventPopUp;