import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

import { techIcons, techColors } from './techData';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const projects = [
  { 
    title: "DevStore", 
    desc: "A full-stack e-commerce platform featuring seamless Stripe integration for secure, real-time payment processing.",
    spotlights: [
      "Engineered real-time Stripe webhook sync",
      "Optimized Redux state for complex cart logic"
    ],
    tech: [
      { name: "TypeScript", percent: 79.1, usage: "Primary application logic & static typing" },
      { name: "CSS", percent: 15.8, usage: "Custom styling and layout" },
      { name: "JavaScript", percent: 3.2, usage: "Configuration and build scripts" },
      { name: "HTML", percent: 1.9, usage: "Document structure" }
    ],
    github: "https://github.com/swap821/mini-ecommerce",
    demo: "https://mini-ecommerce-six-gold.vercel.app",
    image: "/projects/ecommerce.png" 
  },
  { 
    title: "Placement Portal", 
    desc: "A role-based management system designed to streamline job drives, student applications, and recruiter workflows.",
    spotlights: [
      "Role-Based Access Control (RBAC) architecture",
      "Complex MongoDB aggregation for filtering"
    ],
    tech: [
      { name: "JavaScript", percent: 48.5, usage: "Core frontend and backend logic" },
      { name: "HTML", percent: 38.8, usage: "Application structure and templates" },
      { name: "CSS", percent: 12.7, usage: "Component styling and UI layout" }
    ],
    github: "https://github.com/swap821/campus-placement-portal",
    demo: "http://localhost:5175/student",
    image: "/projects/placement.png" 
  },
  { 
    title: "Live Chat App", 
    desc: "An interactive messaging application utilizing WebSockets to handle instantaneous data flow and live communication.",
    spotlights: [
      "Event-driven WebSocket server architecture",
      "Optimized bi-directional payload routing"
    ],
    tech: [
      { name: "JavaScript", percent: 74.3, usage: "Client/Server WebSocket logic" },
      { name: "CSS", percent: 23.0, usage: "Chat interface styling" },
      { name: "HTML", percent: 2.7, usage: "Base document structure" }
    ],
    github: "https://github.com/swap821/live-chat-app",
    demo: "https://live-chat-app-five-amber.vercel.app",
    image: "/projects/chat.png" 
  },
  { 
    title: "Kanban Board", 
    desc: "A productivity dashboard featuring complex state management and an intuitive drag-and-drop user interface.",
    spotlights: [
      "Immutable state matrix management",
      "Optimized drag-and-drop render cycles"
    ],
    tech: [
      { name: "TypeScript", percent: 67.6, usage: "Strictly typed application state" },
      { name: "JavaScript", percent: 17.2, usage: "Utility functions and configs" },
      { name: "CSS", percent: 13.5, usage: "Board and card styling" },
      { name: "HTML", percent: 1.7, usage: "Base markup" }
    ],
    github: "https://github.com/swap821/kanban-project",
    demo: "http://localhost:5176",
    image: "/projects/kanban.png" 
  },
  { 
    title: "Crypto Tracker", 
    desc: "An API-driven dashboard providing live market data, price tracking, and analytics for various cryptocurrencies.",
    spotlights: [
      "Debounced REST API polling for live data",
      "Dynamic canvas chart rendering & memoization"
    ],
    tech: [
      { name: "JavaScript", percent: 80.2, usage: "Data fetching and chart rendering" },
      { name: "CSS", percent: 17.6, usage: "Dashboard styling" },
      { name: "HTML", percent: 2.2, usage: "Core layout structure" }
    ],
    github: "https://github.com/swap821/crypto-tracker",
    demo: "https://crypto-tracker-five-eosin.vercel.app",
    image: "/projects/crypto.png" 
  }
];

const TechPill = ({ t, hoverTheme = false }) => (
  <div className="relative group/pill z-50">
    <span className={`px-2.5 py-1.5 md:px-3 text-[10px] md:text-[11px] font-bold tracking-wide rounded-full border transition-all duration-300 inline-flex items-center gap-1.5 shadow-md ${
      hoverTheme 
        ? "bg-black/90 text-white border-gray-600 lg:hover:border-blue-400 lg:hover:-translate-y-1" 
        : "bg-[#1e293b] text-gray-300 border-gray-700 lg:hover:border-gray-500"
    }`}>
      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: techColors[t.name] || techColors.Default }}></span>
      {techIcons[t.name] || techIcons.Default}
      <span className="whitespace-nowrap">{t.name}</span>
      <span className="text-gray-400 font-medium ml-0.5">{t.percent}%</span>
    </span>
    
    {/* UPGRADE: Tooltips are disabled on mobile (hidden lg:block) so they don't get stuck on screen */}
    <div className={`hidden lg:block absolute left-1/2 -translate-x-1/2 w-48 p-3 bg-[#0f172a] rounded-xl opacity-0 pointer-events-none transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-gray-700 z-[999] ${
      hoverTheme ? "top-full mt-2 lg:group-hover/pill:opacity-100 lg:group-hover/pill:translate-y-1" : "bottom-full mb-2 lg:group-hover/pill:opacity-100 lg:group-hover/pill:-translate-y-1"
    }`}>
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="text-blue-500 text-xs">⚡</span>
        <span className="text-[9px] font-extrabold text-blue-500 tracking-widest uppercase">Usage</span>
      </div>
      <p className="text-xs text-gray-300 leading-snug">{t.usage}</p>
    </div>
  </div>
);

const ProjectSlider = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const handleSlideToProject = (event) => {
      if (swiperRef.current) {
        const targetIndex = event.detail.index;
        swiperRef.current.slideToLoop(targetIndex, 800);
      }
    };

    window.addEventListener('slide-to-project', handleSlideToProject);
    return () => window.removeEventListener('slide-to-project', handleSlideToProject);
  }, []);

  return (
    <div id="projects-slider" className="w-full relative mx-auto overflow-visible flex flex-col items-center select-none py-10 scroll-mt-20">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="w-full max-w-[1400px] relative z-10">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'} 
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          speed={800} 
          slideToClickedSlide={true} 
          coverflowEffect={{ rotate: 15, stretch: 0, depth: 300, modifier: 1, slideShadows: false }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          onBeforeInit={(swiper) => { swiperRef.current = swiper; }}
          className="mySwiper !pb-24" 
        >
          {projects.map((proj, idx) => (
            <SwiperSlide key={idx} className="!w-[320px] sm:!w-[400px] lg:!w-[440px]">
              {({ isActive }) => (
                <div className="relative group">
                  
                  <div className={`absolute -bottom-10 left-10 right-10 h-10 bg-blue-500/40 blur-2xl transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>

                  {/* UPGRADE: Card is taller on mobile (h-[540px]) to fit buttons natively */}
                  <div className={`relative bg-[#0b1120] rounded-3xl h-[540px] lg:h-[490px] flex flex-col transition-all duration-700 ease-out will-change-transform ${
                    isActive ? 'scale-100 cursor-auto' : 'opacity-50 scale-90 cursor-pointer hover:opacity-80' 
                  }`}>
                    
                    {isActive && (
                      <div className="absolute inset-[-2px] rounded-[26px] overflow-hidden pointer-events-none z-0">
                        <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(59,130,246,0.8)_50%,transparent_100%)] opacity-100 transition-opacity duration-500" />
                      </div>
                    )}
                    
                    <div className="absolute inset-[1px] bg-[#0b1120] rounded-3xl pointer-events-none z-0 border border-gray-800" />

                    <div className="absolute inset-[1px] z-10 overflow-hidden rounded-3xl pointer-events-none">
                      <div className="absolute -top-6 -right-2 text-[12rem] font-black text-white/[0.02] select-none transition-transform duration-700 lg:group-hover:scale-105">
                        0{idx + 1}
                      </div>
                      {isActive && (
                        <>
                          {/* UPGRADE: On mobile, background image stays at 15% opacity so it looks premium without needing hover */}
                          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-100 lg:group-hover:scale-110 opacity-15 lg:opacity-0 lg:group-hover:opacity-100" style={{ backgroundImage: `url(${proj.image})` }}></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/90 to-[#050b14]/60 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500"></div>
                        </>
                      )}
                    </div>

                    <div className="absolute inset-[1px] z-20 flex flex-col pointer-events-none">
                      
                      {/* --- FRONT VIEW --- */}
                      <div className={`absolute inset-0 flex flex-col h-full p-6 transition-opacity duration-500 pointer-events-auto ${isActive ? 'lg:group-hover:opacity-0 lg:group-hover:pointer-events-none' : ''}`}>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-wide pr-10">{proj.title}</h3>
                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-4 md:mb-6">{proj.desc}</p>

                        <div className="relative z-10 mb-4 md:mb-6 bg-[#0f172a]/80 border border-gray-700/50 rounded-2xl p-4 flex-grow shadow-inner flex flex-col justify-center">
                          <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                            Engineering Spotlight
                          </h4>
                          <ul className="space-y-3">
                            {proj.spotlights.map((spot, i) => (
                              <li key={i} className="flex items-start gap-2 text-[11px] md:text-[12px] text-gray-300">
                                <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                <span className="leading-snug">{spot}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* UPGRADE: MOBILE ONLY ACTION BUTTONS - Instantly clickable on phones! */}
                        {isActive && (
                          <div className="flex gap-3 mb-5 lg:hidden z-30 relative">
                            <a href={proj.github} target="_blank" rel="noreferrer" className="flex-1 py-3 bg-black/60 border border-gray-600 text-white text-xs font-semibold rounded-xl text-center shadow-lg active:scale-95 transition-all">
                              GitHub
                            </a>
                            <a href={proj.demo} target="_blank" rel="noreferrer" className="flex-1 py-3 bg-blue-600 text-white text-xs font-bold rounded-xl text-center shadow-[0_0_15px_rgba(37,99,235,0.5)] active:scale-95 transition-all">
                              Live Demo
                            </a>
                          </div>
                        )}

                        <div className="mt-auto pt-4 border-t border-gray-800/80">
                          <div className="flex h-1.5 w-full rounded-full overflow-hidden mb-3 bg-gray-800">
                            {proj.tech.map((t, i) => (
                              <div key={i} style={{ width: `${t.percent}%`, backgroundColor: techColors[t.name] || techColors.Default }} />
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {proj.tech.map((t, i) => <TechPill key={i} t={t} />)}
                          </div>
                        </div>
                      </div>

                      {/* --- DESKTOP HOVER VIEW (Hidden entirely on mobile screens) --- */}
                      {isActive && (
                        <div className="hidden lg:flex absolute inset-0 flex-col h-full justify-between p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:pointer-events-auto z-30">
                          
                          <div>
                            <div className="flex h-1.5 w-full rounded-full overflow-hidden mb-3 bg-gray-800 shadow-xl -translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                              {proj.tech.map((t, i) => (
                                <div key={i} style={{ width: `${t.percent}%`, backgroundColor: techColors[t.name] || techColors.Default }} />
                              ))}
                            </div>
                            <div className="flex flex-wrap justify-center gap-2 -translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                              {proj.tech.map((t, i) => <TechPill key={`hover-${i}`} t={t} hoverTheme={true} />)}
                            </div>
                          </div>

                          <div className="flex flex-col items-center justify-center translate-y-2 group-hover:translate-y-0 transition-transform duration-500 mb-6">
                            <h3 className="text-3xl font-extrabold text-white mb-6 text-center drop-shadow-[0_4px_10px_rgba(0,0,0,1)]">{proj.title}</h3>
                            <div className="flex gap-4">
                              <a href={proj.github} target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-black/60 border border-gray-400 hover:border-white text-white text-sm font-semibold rounded-full transition-all hover:bg-white/20 shadow-xl cursor-none">
                                GitHub Repo
                              </a>
                              <a href={proj.demo} target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full shadow-[0_0_20px_rgba(37,99,235,0.8)] transition-all hover:scale-105 cursor-none">
                                Live Demo
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      <style>{`.swiper { overflow: visible !important; }`}</style>
    </div>
  );
};

export default ProjectSlider;