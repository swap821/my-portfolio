import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

const projectsData = [
  {
    id: 1,
    title: 'DevStore',
    description: 'A full-stack e-commerce platform featuring seamless Stripe integration for secure, real-time payment processing and order management.',
    highlights: ['Secure JWT session management', 'Engineered real-time Stripe webhook sync'],
    tech: [
      { name: 'React', usage: 'Engineered complex component trees and client-side routing.' },
      { name: 'Node.js', usage: 'Built a scalable Express server for secure payment processing.' },
      { name: 'MongoDB', usage: 'Designed relational schemas for users, products, and orders.' },
      { name: 'Stripe', usage: 'Integrated real-time checkout sessions and webhook listeners.' }
    ],
    github: 'https://github.com/swap821/mini-ecommerce',
    live: 'https://mini-ecommerce-six-gold.vercel.app', 
    image: '/projects/ecommerce.png' 
  },
  {
    id: 2,
    title: 'Campus Placement Portal',
    description: 'A role-based management system designed to streamline job drives, student applications, and recruiter workflows efficiently.',
    highlights: ['Role-Based Access Control (RBAC)', 'Complex MongoDB aggregation pipelines'],
    tech: [
      { name: 'MERN Stack', usage: 'Architected the full end-to-end monolithic application.' },
      { name: 'Express', usage: 'Developed RESTful endpoints with role-based middleware.' },
      { name: 'Tailwind CSS', usage: 'Designed responsive, accessible tables and application forms.' }
    ],
    github: 'https://github.com/swap821/campus-placement-portal',
    live: 'http://localhost:5175/student',
    image: '/projects/placement.png' 
  },
  {
    id: 3,
    title: 'Live Chat Application',
    description: 'An interactive messaging application utilizing WebSockets to handle instantaneous data flow and live user communication.',
    highlights: ['Event-driven WebSocket architecture', 'Optimized bi-directional payload routing'],
    tech: [
      { name: 'React', usage: 'Managed live message arrays and auto-scrolling UI feeds.' },
      { name: 'Socket.io', usage: 'Implemented bi-directional event emitters for live typing and messages.' },
      { name: 'Node.js', usage: 'Maintained active WebSocket connections and connection pooling.' }
    ],
    github: 'https://github.com/swap821/live-chat-app',
    live: 'https://live-chat-app-five-amber.vercel.app',
    image: '/projects/chat.png' 
  },
  {
    id: 4,
    title: 'Kanban Board',
    description: 'A productivity dashboard featuring complex state management and an intuitive drag-and-drop user interface for task tracking.',
    highlights: ['Immutable state matrix management', 'Optimized drag-and-drop render cycles'],
    tech: [
      { name: 'React', usage: 'Built an immutable matrix state system for task columns.' },
      { name: 'Tailwind CSS', usage: 'Styled dynamic drag states and responsive board layouts.' },
      { name: 'React DnD', usage: 'Engineered smooth, optimized drag-and-drop collision layers.' }
    ],
    github: 'https://github.com/swap821/kanban-project',
    live: 'http://localhost:5176',
    image: '/projects/kanban.png' 
  },
  {
    id: 5,
    title: 'Cryptocurrency Tracker',
    description: 'An API-driven dashboard providing live market data, price tracking, and analytics for various cryptocurrencies.',
    highlights: ['Debounced REST API polling', 'Dynamic canvas chart rendering'],
    tech: [
      { name: 'React', usage: 'Handled component lifecycles for fetching live market intervals.' },
      { name: 'REST APIs', usage: 'Debounced and cached external data fetching to prevent rate limits.' },
      { name: 'Chart.js', usage: 'Rendered dynamic, interactive HTML5 canvas line charts.' }
    ],
    github: 'https://github.com/swap821/crypto-tracker',
    live: 'https://crypto-tracker-five-eosin.vercel.app',
    image: '/projects/crypto.png' 
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const cardAnimationVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

const ProjectCard = ({ project }) => {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const mouseXSpring = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 120, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.15) 0%, transparent 50%)`;
  const borderBackground = useMotionTemplate`radial-gradient(200px circle at ${glareX} ${glareY}, rgba(255,255,255,0.4) 0%, transparent 100%)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    mouseX.set(mouseXPos / width - 0.5);
    mouseY.set(mouseYPos / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div 
      ref={ref}
      variants={cardAnimationVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      // FIX: Added 'will-change-transform transform-gpu' to force hardware acceleration
      className="group relative h-full w-full rounded-2xl cursor-none [perspective:1000px] will-change-transform transform-gpu"
    >
      <div 
        className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-40 blur-md transition duration-500"
        style={{ transform: "translateZ(-10px)" }} 
      ></div>
      
      <div className="relative flex flex-col h-full bg-[#050b14]/90 backdrop-blur-2xl border border-gray-800 rounded-2xl min-h-[360px] z-10 transition-colors duration-500 shadow-2xl">
        
        <motion.div 
          className="absolute inset-0 z-50 pointer-events-none rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: borderBackground, WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }}
        />

        <motion.div 
          className="absolute inset-0 z-40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl overflow-hidden"
          style={{ background: glareBackground }}
        />

        {/* --- DEFAULT VIEW --- */}
        <div className="p-8 flex flex-col flex-grow h-full relative z-10 transition-opacity duration-500 group-hover:opacity-0">
          <h3 className="text-2xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 tracking-wide">
            {project.title}
          </h3>
          
          <p className="text-gray-400 mb-5 text-sm leading-relaxed flex-grow">
            {project.description}
          </p>
          
          <div className="mb-8 flex flex-col gap-3">
            <span className="text-[10px] uppercase tracking-widest text-blue-400/80 font-bold border-l-2 border-blue-500/50 pl-2">
              Engineering Spotlight
            </span>
            <ul className="space-y-2">
              {project.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-gray-300/90 font-medium leading-tight">
                  <svg className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((tag, index) => (
              <div key={index} className="group/tag relative flex items-center justify-center hover:z-[100] cursor-none">
                <span className="px-3 py-1 text-xs font-semibold text-blue-300 bg-blue-500/10 border border-blue-500/30 rounded-full block">
                  {tag.name}
                </span>
                
                {/* UPWARD TOOLTIP: Enhanced readability */}
                <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[250px] opacity-0 group-hover/tag:opacity-100 group-hover/tag:-translate-y-1 -translate-y-0 transition-all duration-200 pointer-events-none z-[100]">
                  <div className="relative p-4 bg-gray-900/95 backdrop-blur-xl border border-gray-700/80 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 border-b border-r border-gray-700/80 rotate-45 rounded-br-[2px]"></div>
                    <div className="relative z-10 flex flex-col gap-2">
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        Project Usage
                      </span>
                      <p className="text-[13px] text-gray-100 leading-relaxed font-medium text-center">{tag.usage}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- HOVER VIEW --- */}
        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out pointer-events-none group-hover:pointer-events-auto flex flex-col justify-end rounded-2xl">
          
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-0">
            <img 
              src={project.image} 
              alt={`${project.title} screenshot`} 
              className="absolute inset-0 w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-[8000ms] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/80 via-30% to-transparent transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/80 via-transparent to-transparent opacity-80 transition-opacity duration-300"></div>
          </div>
          
          <div 
            className="absolute top-6 left-6 right-6 flex flex-wrap gap-2 z-40"
            style={{ transform: "translateZ(30px)" }}
          >
            {project.tech.map((tag, index) => (
              <div 
                key={index} 
                style={{ transitionDelay: `${index * 75}ms` }}
                className="group/tag relative flex items-center justify-center hover:z-[100] opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out cursor-none"
              >
                <span className="px-3 py-1.5 text-xs font-bold text-gray-200 bg-gray-950/90 border border-gray-700/50 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] backdrop-blur-md block">
                  {tag.name}
                </span>

                {/* DOWNWARD TOOLTIP: Enhanced readability */}
                <div className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[250px] opacity-0 group-hover/tag:opacity-100 group-hover/tag:translate-y-1 -translate-y-0 transition-all duration-200 pointer-events-none z-[100]">
                  <div className="relative p-4 bg-gray-900/95 backdrop-blur-xl border border-gray-700/80 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 border-t border-l border-gray-700/80 rotate-45 rounded-tl-[2px]"></div>
                    <div className="relative z-10 flex flex-col gap-2">
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        Project Usage
                      </span>
                      <p className="text-[13px] text-gray-100 leading-relaxed font-medium text-center">{tag.usage}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div 
            className="relative z-30 flex flex-col items-center justify-end w-full pb-8 pt-20 px-6 opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-out"
            style={{ transform: "translateZ(40px)" }}
          >
            <h3 className="text-white text-xl font-bold tracking-wider mb-5 text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
              {project.title}
            </h3>
            <div className="flex gap-4 w-full justify-center">
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-gray-900/90 hover:bg-white/10 border border-gray-600/50 hover:border-white/50 text-white text-sm font-bold rounded-xl transition-all shadow-lg hover:scale-105 backdrop-blur-md"
                style={{ cursor: 'none' }}
              >
                GitHub Repo
              </a>
              <a 
                href={project.live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 border border-blue-400/50 text-white text-sm font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] hover:scale-105"
                style={{ cursor: 'none' }}
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-transparent text-white transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400"
          >
            Featured Projects
          </motion.h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8"
        >
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          <motion.a
            href="https://github.com/swap821"
            target="_blank"
            rel="noopener noreferrer"
            variants={cardAnimationVariants}
            className="group relative flex flex-col items-center justify-center h-full min-h-[360px] rounded-2xl border-2 border-dashed border-gray-700/50 bg-gray-900/20 hover:bg-gray-800/40 hover:border-blue-500/50 transition-all duration-300 cursor-none"
          >
            <div className="relative w-16 h-16 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-400 transition-all duration-300 shadow-lg z-10">
              <div className="absolute inset-0 rounded-full border border-gray-400/20 animate-ping opacity-30 group-hover:border-blue-400/50 group-hover:opacity-100"></div>
              <svg className="relative z-10 w-8 h-8 text-gray-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-300 group-hover:text-white transition-colors tracking-wide">
              View More Projects
            </h3>
            <p className="text-gray-500 text-sm mt-2 group-hover:text-blue-300/80 transition-colors">
              Explore my full GitHub archive &rarr;
            </p>
          </motion.a>

        </motion.div>
      </div>
    </section>
  );
};

export default Projects;