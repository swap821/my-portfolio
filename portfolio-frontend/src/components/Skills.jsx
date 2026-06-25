import { useState } from 'react';
import { motion } from 'framer-motion';
import { techIcons, techColors } from './techData';

const skillsData = [
  {
    category: 'Frontend Development',
    items: [
      { name: 'React.js', iconKey: 'React', usage: 'Engineered complex UIs and scalable component architectures.', projects: [{ name: 'DevStore', targetIndex: 0 }, { name: 'Live Chat', targetIndex: 2 }, { name: 'Crypto Tracker', targetIndex: 4 }] },
      { name: 'JavaScript (ES6+)', iconKey: 'JavaScript', usage: 'Wrote robust ES6+ logic for real-time data processing and state mutations.', projects: [{ name: 'Crypto Tracker', targetIndex: 4 }, { name: 'Live Chat', targetIndex: 2 }] },
      { name: 'Tailwind CSS', iconKey: 'Tailwind', usage: 'Designed responsive, glassmorphic interfaces with utility-first styling.', projects: [{ name: 'Placement Portal', targetIndex: 1 }, { name: 'Kanban Board', targetIndex: 3 }] },
      { name: 'HTML5 & CSS3', iconKey: 'HTML', usage: 'Structured semantic DOM trees with advanced keyframe animations.', projects: [{ name: 'All Projects', targetIndex: 0 }] },
      { name: 'Zustand / Redux', iconKey: 'React', usage: 'Implemented lightweight, scalable global state management.', projects: [{ name: 'DevStore', targetIndex: 0 }, { name: 'Kanban Board', targetIndex: 3 }] },
      { name: 'Vite', iconKey: 'Vite', usage: 'Optimized build times and Hot Module Replacement (HMR).', projects: [{ name: 'Kanban Board', targetIndex: 3 }, { name: 'Crypto Tracker', targetIndex: 4 }] },
    ],
  },
  {
    category: 'Backend Architecture',
    items: [
      { name: 'Node.js', iconKey: 'Node.js', usage: 'Built scalable backend event loops and API services.', projects: [{ name: 'DevStore', targetIndex: 0 }, { name: 'Live Chat', targetIndex: 2 }] },
      { name: 'Express.js', iconKey: 'Express', usage: 'Developed RESTful routing, error handling, and middleware.', projects: [{ name: 'Placement Portal', targetIndex: 1 }] },
      { name: 'RESTful APIs', iconKey: 'Axios', usage: 'Integrated and debounced external financial data endpoints.', projects: [{ name: 'Crypto Tracker', targetIndex: 4 }] },
      { name: 'JWT Authentication', iconKey: 'Default', usage: 'Secured user sessions and engineered Role-Based Access Control.', projects: [{ name: 'DevStore', targetIndex: 0 }, { name: 'Placement Portal', targetIndex: 1 }] },
      { name: 'WebSockets', iconKey: 'Socket.io', usage: 'Enabled sub-second bi-directional messaging and event broadcasting.', projects: [{ name: 'Live Chat', targetIndex: 2 }] },
    ],
  },
  {
    category: 'Database & Tools',
    items: [
      { name: 'MongoDB', iconKey: 'MongoDB', usage: 'Designed NoSQL schemas and complex aggregation pipelines.', projects: [{ name: 'DevStore', targetIndex: 0 }, { name: 'Placement Portal', targetIndex: 1 }] },
      { name: 'TypeScript', iconKey: 'TypeScript', usage: 'Enforced strict data modeling, typing, and validation layers.', projects: [{ name: 'DevStore', targetIndex: 0 }, { name: 'Kanban Board', targetIndex: 3 }] },
      { name: 'Git & GitHub', iconKey: 'Default', usage: 'Maintained strict version control and branch management.', projects: [{ name: 'Live Chat', targetIndex: 2 }] },
      { name: 'Vercel / Render', iconKey: 'Default', usage: 'Configured automated CI/CD pipelines for cloud deployments.', projects: [{ name: 'Crypto Tracker', targetIndex: 4 }] },
      { name: 'Stripe Integration', iconKey: 'Stripe', usage: 'Engineered secure payment gateways and webhook listeners.', projects: [{ name: 'DevStore', targetIndex: 0 }] },
    ],
  },
  // NEW: AI & Machine Learning category
  {
    category: 'AI & Machine Learning',
    items: [
      { name: 'LLM Integration', iconKey: 'Gemini AI', usage: 'Integrated Gemini AI to build an intelligent portfolio assistant with contextual responses.', projects: [{ name: 'Portfolio', targetIndex: 0 }] },
      { name: 'Prompt Engineering', iconKey: 'LLM APIs', usage: 'Crafted optimized prompts for accurate, context-aware AI responses in production.', projects: [{ name: 'Portfolio', targetIndex: 0 }] },
      { name: 'Python', iconKey: 'Python', usage: 'Building ML pipelines with Pandas, NumPy, and Scikit-learn for data-driven applications.', projects: [{ name: 'Coming Soon', targetIndex: 0 }] },
      { name: 'Data Analysis', iconKey: 'Pandas', usage: 'Exploring datasets with statistical analysis and visualization for model training.', projects: [{ name: 'Coming Soon', targetIndex: 0 }] },
      { name: 'Scikit-learn', iconKey: 'Scikit-learn', usage: 'Training regression, classification, and clustering models for predictive analytics.', projects: [{ name: 'Coming Soon', targetIndex: 0 }] },
    ],
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

const Skills = () => {
  // NEW: State to track which skill is tapped on mobile
  const [openSkill, setOpenSkill] = useState(null);

  const handleProjectClick = (e, targetIndex) => {
    e.preventDefault();
    e.stopPropagation(); // Stops the tap from closing the mobile menu
    
    const sliderSection = document.getElementById('projects-slider');
    if (sliderSection) {
      sliderSection.scrollIntoView({ behavior: 'smooth' });
    }

    window.dispatchEvent(new CustomEvent('slide-to-project', { 
      detail: { index: targetIndex } 
    }));
  };

  // NEW: Mobile tap handler
  const handleSkillTap = (id) => {
    setOpenSkill(openSkill === id ? null : id);
  };

  return (
    <section id="skills" className="py-24 bg-transparent border-t border-white/5 transition-colors duration-300 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400"
          >
            Technical Skills
          </motion.h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        </div>
        
        {/* UPDATED: Changed grid to 2 cols on md and 4 cols on lg for the new AI category */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skillsData.map((skillGroup, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              className="group relative h-full w-full rounded-2xl cursor-default md:cursor-none hover:z-50"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-md transition duration-500 hidden md:block"></div>
              
              <div className="relative flex flex-col h-full bg-[#050b14]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 z-10 transition-transform duration-500 md:group-hover:-translate-y-2 shadow-xl">
                
                <h3 className="text-xl md:text-2xl font-extrabold mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200 drop-shadow-sm border-b border-white/5 pb-4 tracking-wide">
                  {skillGroup.category}
                </h3>
                
                <ul className="flex flex-col gap-5">
                  {skillGroup.items.map((skill, skillIndex) => {
                    const brandColor = techColors[skill.iconKey] || '#3b82f6';
                    const uniqueId = `${index}-${skillIndex}`;
                    const isOpen = openSkill === uniqueId;

                    return (
                    <motion.li 
                      variants={itemVariants}
                      key={skillIndex} 
                      // NEW: Added onClick for mobile expansion
                      onClick={() => handleSkillTap(uniqueId)}
                      className="group/item relative flex flex-col md:flex-row md:items-center gap-2 md:gap-4 cursor-pointer md:cursor-none hover:z-50"
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                          style={{ 
                            backgroundColor: `${brandColor}15`,
                            border: `1px solid ${brandColor}40`, 
                          }}
                        >
                          {techIcons[skill.iconKey] || techIcons.Default}
                        </div>
                        
                        <span className="font-medium text-gray-300 text-base md:text-lg tracking-wide md:group-hover/item:text-white md:group-hover/item:translate-x-1 transition-all duration-300">
                          {skill.name}
                        </span>
                      </div>

                      {/* 
                          NEW RESPONSIVE TOOLTIP LOGIC:
                          Mobile: Renders directly below the text (inline expansion)
                          Desktop: Renders as a floating side-tooltip via group-hover
                      */}
                      <div className={`
                        ${isOpen ? 'block opacity-100 max-h-[500px] mt-3' : 'max-h-0 opacity-0 overflow-hidden md:max-h-none md:overflow-visible'} 
                        md:block md:absolute md:top-1/2 md:-translate-y-1/2 md:z-[100] md:w-[360px] md:py-12 md:pointer-events-none md:group-hover/item:pointer-events-auto
                        transition-all duration-300 ease-in-out
                        ${index === 2 || index === 3 ? 'md:right-full md:pr-4' : 'md:left-full md:pl-4'}
                      `}>
                        
                        <div className={`relative p-5 md:p-6 rounded-xl bg-[#0a101d]/95 backdrop-blur-2xl border border-gray-700 shadow-[0_20px_50px_rgba(0,0,0,0.9)] 
                          md:opacity-0 transition-all duration-300 ease-out
                          ${index === 2 || index === 3 ? 'md:translate-x-4 md:group-hover/item:translate-x-0' : 'md:-translate-x-4 md:group-hover/item:translate-x-0'}
                          md:group-hover/item:opacity-100
                        `}>
                          
                          {/* Desktop Only Little Triangle Pointer */}
                          <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#0a101d] border-gray-700 rotate-45 
                            ${index === 2 || index === 3 ? '-right-1.5 border-t border-r' : '-left-1.5 border-b border-l'}
                          `}></div>
                          
                          <div className="relative z-10">
                            <div className="text-[10px] font-bold text-blue-400 mb-3 uppercase tracking-widest border-b border-gray-700/50 pb-2 flex items-center gap-2">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              Technical Application
                            </div>
                            <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-medium mb-4 md:mb-5">
                              {skill.usage}
                            </p>
                            
                            <div className="flex flex-wrap gap-2.5">
                              {skill.projects.map((proj, pIndex) => (
                                <button 
                                  key={pIndex} 
                                  onClick={(e) => handleProjectClick(e, proj.targetIndex)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-600 border border-blue-500/30 hover:border-blue-400 text-blue-300 hover:text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all duration-200 shadow-sm md:cursor-none active:scale-95"
                                >
                                  {proj.name}
                                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                  </svg>
                                </button>
                              ))}
                            </div>
                          </div>

                        </div>
                      </div>

                    </motion.li>
                    );
                  })}
                </ul>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;