import SmallHeroCard from "../components/SmallHeroCard";
import NavBar from "../components/NavBar";


function CurrentEventPage(){ 

    return ( 
            <> 
                <NavBar className="mb-16"> 
                    <a href="/" className="hover:text-[#00A6FB]"> Home</a> 
                </NavBar>
               <div id="container">  
                <h1 className="text-5xl text-[#F9F4F4] text-center font-Heading font-bold mt-4 mb-8 animate-pulse ">Stay informed with the latest cybersecurity news </h1>
                    <div id="malware" className="mt-4 mb-4"> 
                        <div> 
                            <h1 className="text-center text-5xl text-[#F9F4F4] text-center font-SubHeading font-bold mt-8 mb-8"> Malware </h1>
                        </div> 

                        <div className="flex gap-16 justify-center item-center mt-8 mb-8 pl-4 pr-4"> 
                            <SmallHeroCard> 
                                <h2 className="text-xl font-Text mb-4 text-center"> CISA </h2>
                                <p className="text-xl font-Text mb-4 text-center"> 
                                    CISA provides official alerts and guidance on the latest malware threats and defenses.
                                </p>
                                <a href="https://www.cisa.gov/topics/cyber-threats-and-advisories" target="_blank" rel="noopener noreferrer"  
                                className="mt-4 font-Text font-medium text-center rounded-full bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                >  
                                Visit Site
                                </a>
                            </SmallHeroCard> 
                               
                            <SmallHeroCard>  
                                <h2 className="text-xl font-Text mb-4 text-center"> The Hacker News</h2>
                                <p className="text-xl font-Text mb-4 text-center"> 
                                    Covers the latest malware campaigns, vulnerabilities exploited to deliver malicious payloads, and evolving cyber‑attack techniques.
                                </p> 
                                <a href="https://thehackernews.com/search/label/Malware" target="_blank" rel="noopener noreferrer"  
                                className="font-Text font-medium text-center rounded-full bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                >  
                                Visit Site
                                </a>  
                            </SmallHeroCard> 
                            
                            <SmallHeroCard>  
                                <h2 className="text-xl font-Text mb-4 text-center"> NIST</h2>
                                <p className="text-xl font-Text mb-4 text-center"> 
                                    A guide from NIST focused on preventing malware.
                                </p> 
                                <a href="https://csrc.nist.gov/pubs/sp/800/83/r1/final" target="_blank" rel="noopener noreferrer"  
                                className="font-Text font-medium text-center rounded-full bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                >  
                                Visit Site
                                </a>
                            </SmallHeroCard>
                        </div>
                        
                    </div> 


                    <div id="vunerabilities"> 
                        <div className="text-center"> 
                            <h1 className="text-center text-5xl text-[#F9F4F4] text-center font-SubHeading font-bold mb-4">Vunerabilities </h1>   
                        </div>

                        <div className="flex gap-16 justify-center item-center mt-8 mb-8 pl-4 pr-4"> 
                            <SmallHeroCard>  
                                <h2 className="text-xl font-Text mb-4 text-center"> CISA – Known Exploited Vulnerabilities Catalog</h2>
                                <p className="text-xl font-Text mb-4 text-center"> 
                                    The official U.S. government database of actively exploited vulnerabilities.
                                </p>
                                <a href="https://www.cisa.gov/known-exploited-vulnerabilities-catalog" target="_blank" rel="noopener noreferrer"  
                                className="mt-4 font-Text font-medium text-center rounded-full bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                >  
                                Visit Site
                                </a>
                            </SmallHeroCard> 
                            
                            <SmallHeroCard>  
                                <h2 className="text-xl font-Text mb-4 text-center"> NIST – National Vulnerability Database (NVD)</h2>
                                <p className="text-xl font-Text mb-4 text-center"> 
                                    A U.S. government database for tracking and analyzing known software and hardware vulnerabilities.
                                </p>
                                <a href="https://nvd.nist.gov/vuln" target="_blank" rel="noopener noreferrer"  
                                className="mt-4 font-Text font-medium text-center rounded-full bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                >  
                                Visit Site
                                </a>
                            </SmallHeroCard> 
                            
                            <SmallHeroCard>  
                                <h2 className="text-xl font-Text mb-4 text-center"> Cisco Talos</h2>
                                <p className="text-xl font-Text mb-4 text-center"> 
                                    Stay up to date with Cisco Talos' latest vulnerability research, advisories, and in-depth security analyses.
                                </p>
                                <a href="https://talosintelligence.com/vulnerability_reports" target="_blank" rel="noopener noreferrer"  
                                className="mt-4 font-Text font-medium text-center rounded-full bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                >  
                                Visit Site
                                </a>
                            </SmallHeroCard>
                        </div>
                        


                         

                    </div>


                    <div id="grc"> 
                        <div className="text-center"> 
                            <h1 className="text-center text-5xl text-[#F9F4F4] text-center font-SubHeading font-bold mb-4" >Regulation/Compliance </h1>   
                        </div>
                         
                         <div className="flex gap-16 justify-center item-center mt-8 mb-8 pl-4 pr-4"> 
                            <SmallHeroCard>  
                                <h2 className="text-xl font-Text mb-4 text-center"> Dark Reading – Security & Compliance News</h2>
                                <p className="text-xl font-Text mb-4 text-center"> 
                                    Provides best practices for tracking regulations and compliance updates. 
                                </p>
                                <a href="https://www.darkreading.com/?utm" target="_blank" rel="noopener noreferrer"  
                                className="mt-4 font-Text font-medium text-center rounded-full bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                >  
                                Visit Site
                                </a>
                            </SmallHeroCard> 
                            
                            <SmallHeroCard>  
                                <h2 className="text-xl font-Text mb-4 text-center"> Security Scorecard </h2>
                                <p className="text-xl font-Text mb-4 text-center"> 
                                    Focuses on industry trends, compliance requirements, and enterprise security updates.
                                </p>
                                <a href="https://securityscorecard.com/blog/how-to-stay-updated-on-cybersecurity-threats-and-trends/?utm" target="_blank" rel="noopener noreferrer"  
                                className="mt-4 font-Text font-medium text-center rounded-full bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                >  
                                Visit Site
                                </a>
                            </SmallHeroCard> 
                            
                            <SmallHeroCard>  
                                <h2 className="text-xl font-Text mb-4 text-center">The Hacker News</h2>
                                <p className="text-xl font-Text mb-4 text-center"> 
                                   In-depth reporting on exploited software flaws, helping organizations understand attacker tactics and urgency of patching.
                                </p>
                                <a href="https://thehackernews.com/?utm" target="_blank" rel="noopener noreferrer"  
                                className="mt-4 font-Text font-medium text-center rounded-full bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                >  
                                Visit Site
                                </a>
                            </SmallHeroCard>
                        </div>

                    </div> 

                    <div id="tools"> 
                        <div className="text-center"> 
                            <h1 className="text-center text-5xl text-[#F9F4F4] text-center font-SubHeading font-bold mb-4">Updates on Cybersecurity Tools </h1>   
                        </div> 

                        <div className="flex gap-16 justify-center item-center mt-8 mb-8 pl-4 pr-4"> 
                            <SmallHeroCard>  
                                <h2 className="text-xl font-Text mb-4 text-center"> The Hacker News</h2>
                                <p className="text-xl font-Text mb-4 text-center"> 
                                    Curated updates on the latest cybersecurity tools, innovations, and practical defenses from The Hacker News.
                                </p>
                                <a href="https://thehackernews.com/search/label/Security%20tools" target="_blank" rel="noopener noreferrer"  
                                className="mt-4 font-Text font-medium text-center rounded-full bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                >  
                                Visit Site
                                </a>
                            </SmallHeroCard> 
                            
                            <SmallHeroCard>  
                                <h2 className="text-xl font-Text mb-4 text-center"> Security Week</h2>
                                <p className="text-xl font-Text mb-4 text-center"> 
                                    Expert‑driven news and updates spotlighting the latest security tools, innovations, and practical insights.
                                </p>
                                <a href="https://www.securityweek.com/topics/tool/" target="_blank" rel="noopener noreferrer"  
                                className="mt-4 font-Text font-medium text-center rounded-full bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                >  
                                Visit Site
                                </a>
                            </SmallHeroCard> 
                            
                            <SmallHeroCard>  
                                <h2 className="text-xl font-Text mb-4 text-center"> Microsoft – Defender Antivirus Updates</h2>
                                <p className="text-xl font-Text mb-4 text-center"> 
                                    Microsoft’s official resource for the latest malware definitions and security intelligence updates.
                                </p>
                                <a href="https://www.microsoft.com/en-us/wdsi/defenderupdates" target="_blank" rel="noopener noreferrer"  
                                className="mt-4 font-Text font-medium text-center rounded-full bg-[#00A6FB] h-1xl w-36 cursor-pointer hover:scale-125 transition"
                                >  
                                Visit Site
                                </a>
                            </SmallHeroCard>
                        </div>
                         


                    </div>

               </div> 
                
                
                
            </>


    ); 


} 


export default CurrentEventPage;