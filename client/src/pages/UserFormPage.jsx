import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import NavBar from "../components/NavBar";
import SlideInText from "../components/SlideInText";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

function UserFormPage(){
    const { user, isLoaded } = useUser();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [form, setForm] = useState({
        college: "",
        major: "",
        industry: "",
        careerGoals: "",
        technicalExperience: "",
        technicalKnowledge: "",
        cybersecurityFamiliarity: "",
    });

    // Memoize the load function to prevent unnecessary re-renders
    const loadUserPreferences = useCallback(async () => {
        if (!isLoaded || !user?.id) return;
        
        setIsLoading(true);
        try {
            console.log("Loading preferences for user:", user.id);
            
            const { data, error } = await supabase
                .from('user_preferences')
                .select('*')
                .eq('clerk_user_id', user.id)
                .single();
            
            if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
                console.error("Database error:", error);
                throw error;
            }
            
            if (data) {
                console.log("Loaded preferences:", data);
                setForm({
                    college: data.college || "",
                    major: data.major || "",
                    industry: data.interested_industry || "",
                    careerGoals: data.career_goals || "",
                    technicalExperience: data.technical_experience || "",
                    technicalKnowledge: data.technical_knowledge || "",
                    cybersecurityFamiliarity: data.cybersecurity_familiarity || "",
                });
            }
        } catch (err) {
            console.error("Failed to load preferences:", err);
            alert("Failed to load your preferences. Please refresh the page.");
        } finally {
            setIsLoading(false);
        }
    }, [isLoaded, user?.id]); // Only depend on user.id, not the entire user object

    useEffect(() => {
        loadUserPreferences();
    }, [loadUserPreferences]);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user?.id) {
            alert("User not found. Please refresh and try again.");
            return;
        }

        if (isSubmitting) return; // Prevent double submissions
        
        setIsSubmitting(true);

        try {
            console.log("Submitting form data:", form);
            console.log("User ID:", user.id);

            // Add a small delay to prevent race conditions
            await new Promise(resolve => setTimeout(resolve, 100));

            const { data, error } = await supabase
                .from('user_preferences')
                .upsert({
                    clerk_user_id: user.id,
                    college: form.college,
                    major: form.major,
                    interested_industry: form.industry,
                    career_goals: form.careerGoals,
                    technical_experience: form.technicalExperience,
                    technical_knowledge: form.technicalKnowledge,
                    cybersecurity_familiarity: form.cybersecurityFamiliarity,
                    updated_at: new Date().toISOString(),
                }, {
                    onConflict: 'clerk_user_id' // Specify the conflict column
                })
                .select();

            if (error) {
                console.error("Supabase error:", error);
                throw error;
            }

            console.log("Successfully saved:", data);
            alert("Preferences saved successfully!");
            navigate('/');
            
        } catch (err) {
            console.error("Error saving preferences:", err);
            
            // More specific error messages
            if (err.code === '23505') {
                alert("There was a conflict saving your data. Please try again.");
            } else if (err.message?.includes('429')) {
                alert("Too many requests. Please wait a moment and try again.");
            } else {
                alert(`Failed to save preferences: ${err.message || 'Unknown error'}`);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Don't render anything until user is loaded
    if (!isLoaded) return <div>Loading...</div>;
    
    // Redirect if no user
    if (isLoaded && !user) {
        navigate('/sign-in');
        return null;
    }

    if (isLoading) return <div>Loading preferences...</div>;



    return ( 
        <>  
        <NavBar> 
            <a href="/" className="hover:text-[#00A6FB]"> Home</a>
        </NavBar>
        
    
        <div id="page" className="bg-[] text-center min-h-screen w-full flex justify-center items-center"> 
            <SlideInText>       
                <div id="form-container" className="bg-[#F9F4F4] rounded-2xl text-[#F9F4F4] text-center h-[42rem] w-[30rem] flex flex-col items-center justify-center "> 
                    <form onSubmit={handleSubmit} className="flex flex-col text-[#09090B] gap-4 items-center ">    
                        <div className="mt-2"> 
                            <h2 className="font-SubHeading font-bold text-2xl ">Tell Us About Yourself</h2>  
                         </div> 

                         <div className="flex flex-col gap-2 w-3/4 items-center pl-1 pr-1"> 
                            <label htmlFor="CunyCampus" className="font-SubHeading font-medium text-base">Which CUNY do you attend?</label>  
                            <select id="cuny" value={form.college} onChange={(e)=>handleChange("college",e.target.value)}  
                            className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm">  
                                <option value="">No Selection</option>
                                <option value="Baruch College">Baruch College</option>
                                <option value="Borough of Manhattan Community College">Borough of Manhattan Community College</option>
                                <option value="Bronx Community College">Bronx Community College</option>
                                <option value="Brooklyn College">Brooklyn College</option>
                                <option value="City College of New York">City College of New York</option>
                                <option value="College of Staten Island">College of Staten Island</option>
                                <option value="Guttman Community College">Guttman Community College</option>
                                <option value="Graduate Center, CUNY">Graduate Center, CUNY</option>
                                <option value="Hostos Community College">Hostos Community College</option>
                                <option value="Hunter College">Hunter College</option>
                                <option value="John Jay College of Criminal Justice">John Jay College of Criminal Justice</option>
                                <option value="Kingsborough Community College">Kingsborough Community College</option>
                                <option value="LaGuardia Community College">LaGuardia Community College</option>
                                <option value="Lehman College">Lehman College</option>
                                <option value="Medgar Evers College">Medgar Evers College</option>
                                <option value="New York City College of Technology">New York City College of Technology</option>
                                <option value="Queens College">Queens College</option>
                                <option value="Queensborough Community College">Queensborough Community College</option>
                                <option value="York College">York College</option>

                            </select>
                            
                         </div>

                        <div className="flex flex-col gap-2 w-3/4 items-center pl-1 pr-1 "> 
                            <label htmlFor="major" className="font-SubHeading font-medium text-base">Choose your Major</label> 
                            <select  id="major" value={form.major} onChange={(e)=>handleChange("major",e.target.value)} 
                             name="major" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm "> 
                                <option value="">No Selection</option>
                                <option value="Accounting">Accounting</option>
                                <option value="Anthropology">Anthropology</option>
                                <option value="Architecture">Architecture</option>
                                <option value="Art">Art</option>
                                <option value="Biochemistry">Biochemistry</option>
                                <option value="Biology">Biology</option>
                                <option value="Biomedical Engineering">Biomedical Engineering</option>
                                <option value="Business Administration">Business Administration</option>
                                <option value="Chemical Engineering">Chemical Engineering</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="Civil Engineering">Civil Engineering</option>
                                <option value="Communications">Communications</option>
                                <option value="Computer Engineering">Computer Engineering</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Criminal Justice">Criminal Justice</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Dentistry">Dentistry</option>
                                <option value="Design">Design</option>
                                <option value="Economics">Economics</option>
                                <option value="Education">Education</option>
                                <option value="Electrical Engineering">Electrical Engineering</option>
                                <option value="English">English</option>
                                <option value="Entrepreneurship">Entrepreneurship</option>
                                <option value="Environmental Science">Environmental Science</option>
                                <option value="Finance">Finance</option>
                                <option value="Fine Arts">Fine Arts</option>
                                <option value="Graphic Design">Graphic Design</option>
                                <option value="Health Sciences">Health Sciences</option>
                                <option value="History">History</option>
                                <option value="Hospitality Management">Hospitality Management</option>
                                <option value="Human Resources">Human Resources</option>
                                <option value="Industrial Engineering">Industrial Engineering</option>
                                <option value="Information Systems">Information Systems</option>
                                <option value="Information Technology">Information Technology</option>
                                <option value="International Relations">International Relations</option>
                                <option value="Journalism">Journalism</option>
                                <option value="Law">Law</option>
                                <option value="Linguistics">Linguistics</option>
                                <option value="Management">Management</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Mechanical Engineering">Mechanical Engineering</option>
                                <option value="Medicine">Medicine</option>
                                <option value="Music">Music</option>
                                <option value="Nursing">Nursing</option>
                                <option value="Philosophy">Philosophy</option>
                                <option value="Physics">Physics</option>
                                <option value="Political Science">Political Science</option>
                                <option value="Psychology">Psychology</option>
                                <option value="Sociology">Sociology</option>
                                <option value="Other">Other</option>
                        </select>  
                    </div>

                <div className="flex flex-col gap-2 w-3/4 items-center pl-1 pr-1 "> 
                    <label htmlFor="industry" className="font-SubHeading font-medium text-base"> Pick which industry your interested to work in</label> 
                    <select id="industry" value={form.industry} onChange={(e)=>handleChange("industry",e.target.value)}
                    name="industry" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm  ">  
                        <option value="">No Selection</option>
                        <option value="Banking and Financial Services">Banking and Financial Services</option>
                        <option value="Government and Defense">Government and Defense</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Energy and Utilities">Energy and Utilities</option>
                        <option value="Education">Education</option>
                        <option value="Telecommunications">Telecommunications</option>
                        <option value="Retail and E-commerce">Retail and E-commerce</option>
                        <option value="Transportation and Logistics">Transportation and Logistics</option>
                        <option value="Insurance">Insurance</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Legal Services">Legal Services</option>
                        <option value="Media and Entertainment">Media and Entertainment</option>
                        <option value="Consulting Services">Consulting Services</option>
                        <option value="Aerospace">Aerospace</option>
                        <option value="Nonprofit Organizations">Nonprofit Organizations</option>
                        <option value="Pharmaceuticals">Pharmaceuticals</option>
                        <option value="Cloud Services">Cloud Services</option>
                        <option value="Cybersecurity Firms">Cybersecurity Firms</option>
                        <option value="Agriculture and Food Processing">Agriculture and Food Processing</option>
                        <option value="Hospitality and Tourism">Hospitality and Tourism</option>
                        <option value="Automotive Industry">Automotive Industry</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Research and Development">Research and Development</option>
                        <option value="Other">Other</option>
                    </select>  
                </div>

                    <div className="flex flex-col gap-2 w-3/4 items-center pl-1 pr-1"> 
                        <label htmlFor="career-goals" className="font-SubHeading font-medium text-base">What are your career goals?</label> 
                        <select id="career-goals" value={form.careerGoals} onChange={(e)=>handleChange("careerGoals",e.target.value)}  
                         name="career-goals" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm ">
                            <option value="">No Selection</option>
                            <option value="Internship"> Looking for an internship </option> 
                            <option value="First-role">Looking for your first role </option> 
                            <option value="Switch">Switching Careers </option>    
                        </select> 
                    </div>

                <div className="flex flex-col gap-2 w-3/4 items-center pl-1 pr-1">   
                    <label htmlFor="technical-experience" className="font-SubHeading font-medium text-nowrap text-base">How much hands-on Technical Experience do you have?</label> 
                    <select id="tech-exp" value={form.technicalExperience} onChange={(e)=>handleChange("technicalExperience",e.target.value)}
                     name="tech-experience"  className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm">
                        <option value="">No Selection</option>
                        <option value="None"> None - No Experience </option> 
                        <option value="Beginner">Beginner — I’ve done a few projects or courses </option> 
                        <option value="Intermediate">Intermediate — I've applied skills on real-world projects </option> 
                        <option value="Advanced">Advanced — I have professional experience and have led complex projects </option> 
                    </select> 
                </div>  

                <div className="flex flex-col gap-2 w-3/4 items-center pl-1 pr-1"> 
                    <label htmlFor="technical-Knowledge" className="font-SubHeading font-medium text-base">How much Technical Knowledge do you have?</label> 
                    <select id="tech-knowledge" value={form.technicalKnowledge} onChange={(e)=>handleChange("technicalKnowledge",e.target.value)} 
                     name="tech-knowledge" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B] w-11/12 rounded-sm  ">
                        <option value="">No Selection</option>
                        <option value="None"> None — I’m just getting started</option> 
                        <option value="Beginner"> Beginner - I’m learning the basics</option> 
                        <option value="Intermediate">Intermediate — I understand most core concepts </option> 
                        <option value="Advanced">Advanced — I have strong expertise in multiple areas </option>  
                    </select>  
                </div>

                <div className="flex flex-col gap-2 w-3/4 items-center mb-2 pl-1 pr-1"> 
                    <label htmlFor="security-Familiarity" className="font-SubHeading font-medium text-nowrap text-base">How familiar are you with cybersecurity tools or concepts?</label> 
                    <select id="security-Familiarity" value={form.cybersecurityFamiliarity} onChange={(e)=>handleChange("cybersecurityFamiliarity",e.target.value)}  
                    name="security-Familiarity" className="bg-[#F9F4F4] text-[#09090B] border-2 border-[#09090B]  w-11/12  rounded-sm ">
                        <option value="">No Selection</option>
                        <option value="None">Not familiar</option> 
                        <option value="Some">Somewhat familiar — I’ve learned a few basics </option> 
                        <option value="Familiar">Familiar — I’ve used tools or studied security concepts </option>   
                        <option value="Very-Familiar">Very Familiar — I have hands-on security experience </option>
                    </select>
                </div>

                <div className="mb-2"> 
                    <button type="submit"  
                     disabled={isSubmitting}
                     className="h-1xl w-48 bg-[#00A6FB] text-[#F9F4F4] rounded-sm font-Text text-lg cursor-pointer hover:scale-125  "> 
                      {isSubmitting ? 'Saving...' : 'Submit Form'}
                    </button>
                </div>

                </form>
            </div>
    </SlideInText> 
</div>
    
        </>


    )


 } 

 export default UserFormPage;