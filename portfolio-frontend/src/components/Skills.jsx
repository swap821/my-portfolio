import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { renderTechIcon, getBrandColor } from './techData';

// ==========================================
// SKILLS DATA WITH PROFICIENCY LEVELS
// ==========================================
const skillsData = [
  {
    category: 'Frontend Development',
    items: [
      { name: 'React.js', iconKey: 'React', level: 'Strong', usage: 'Engineered complex UIs and scalable component architectures.', projects: [{ name: 'DevStore', targetIndex: 0 }, { name: 'Live Chat', targetIndex: 2 }, { name: 'Crypto Tracker', targetIndex: 4 }] },
      { name: 'JavaScript (ES6+)', iconKey: 'JavaScript', level: 'Strong', usage: 'Wrote robust ES6+ logic for real-time data processing and state mutations.', projects: [{ name: 'Crypto Tracker', targetIndex: 4 }, { name: 'Live Chat', targetIndex: 2 }] },
      { name: 'Tailwind CSS', iconKey: 'Tailwind', level: 'Strong', usage: 'Designed responsive, glassmorphic interfaces with utility-first styling.', projects: [{ name: 'Placement Portal', targetIndex: 1 }, { name: 'Kanban Board', targetIndex: 3 }] },
      { name: 'HTML5 & CSS3', iconKey: 'HTML', level: 'Strong', usage: 'Structured semantic DOM trees with advanced keyframe animations.', projects: [{ name: 'All Projects', targetIndex: 0 }] },
      { name: 'Zustand / Redux', iconKey: 'React', level: 'Familiar', usage: 'Implemented lightweight, scalable global state management.', projects: [{ name: 'DevStore', targetIndex: 0 }, { name: 'Kanban Board', targetIndex: 3 }] },
      { name: 'Vite', iconKey: 'Vite', level: 'Familiar', usage: 'Optimized build times and Hot Module Replacement (HMR).', projects: [{ name: 'Kanban Board', targetIndex: 3 }, { name: 'Crypto Tracker', targetIndex: 4 }] },
    ],
  },
  {
    category: 'Backend Architecture',
    items: [
      { name: 'Node.js', iconKey: 'Node.js', level: 'Strong', usage: 'Built scalable backend event loops and API services.', projects: [{ name: 'DevStore', targetIndex: 0 }, { name: 'Live Chat', targetIndex: 2 }] },
      { name: 'Express.js', iconKey: 'Express', level: 'Familiar', usage: 'Developed RESTful routing, error handling, and middleware.', projects: [{ name: 'Placement Portal', targetIndex: 1 }] },
      { name: 'RESTful APIs', iconKey: 'Axios', level: 'Familiar', usage: 'Integrated and debounced external financial data endpoints.', projects: [{ name: 'Crypto Tracker', targetIndex: 4 }] },
      { name: 'JWT Authentication', iconKey: 'Default', level: 'Familiar', usage: 'Secured user sessions and engineered Role-Based Access Control.', projects: [{ name: 'DevStore', targetIndex: 0 }, { name: 'Placement Portal', targetIndex: 1 }] },
      { name: 'WebSockets', iconKey: 'Socket.io', level: 'Familiar', usage: 'Enabled sub-second bi-directional messaging and event broadcasting.', projects: [{ name: 'Live Chat', targetIndex: 2 }] },
    ],
  },
  {
    category: 'Database & Tools',
    items: [
      { name: 'MongoDB', iconKey: 'MongoDB', level: 'Strong', usage: 'Designed NoSQL schemas and complex aggregation pipelines.', projects: [{ name: 'DevStore', targetIndex: 0 }, { name: 'Placement Portal', targetIndex: 1 }] },
      { name: 'TypeScript', iconKey: 'TypeScript', level: 'Familiar', usage: 'Enforced strict data modeling, typing, and validation layers.', projects: [{ name: 'DevStore', targetIndex: 0 }, { name: 'Kanban Board', targetIndex: 3 }] },
      { name: 'Git & GitHub', iconKey: 'Default', level: 'Familiar', usage: 'Maintained strict version control and branch management.', projects: [{ name: 'Live Chat', targetIndex: 2 }] },
      { name: 'Vercel / Render', iconKey: 'Default', level: 'Familiar', usage: 'Configured automated CI/CD pipelines for cloud deployments.', projects: [{ name: 'Crypto Tracker', targetIndex: 4 }] },
      { name: 'Stripe Integration', iconKey: 'Stripe', level: 'Learning', usage: 'Engineered secure payment gateways and webhook listeners.', projects: [{ name: 'DevStore', targetIndex: 0 }] },
    ],
  },
  // NEW: AI & Machine Learning category
  {
    category: 'AI & Machine Learning',
    items: [
      { name: 'Machine Learning', iconKey: 'Scikit-learn', level: 'Strong', usage: 'Trained regression and classification models with scikit-learn and XGBoost.', projects: [{ name: 'ML Student Predictor', targetIndex: 5 }, { name: 'Sentiment App', targetIndex: 6 }] },
      { name: 'Deep Learning', iconKey: 'TensorFlow', level: 'Familiar', usage: 'Built CNN and LSTM neural networks with TensorFlow for CV and NLP tasks.', projects: [{ name: 'Face Emotion', targetIndex: 7 }, { name: 'Sentiment App', targetIndex: 6 }] },
      { name: 'NLP', iconKey: 'NLP', level: 'Strong', usage: 'Implemented TF-IDF, spaCy NER, and sentiment analysis pipelines.', projects: [{ name: 'Sentiment App', targetIndex: 6 }, { name: 'AI Career', targetIndex: 8 }] },
      { name: 'LLM Integration', iconKey: 'Gemini AI', level: 'Learning', usage: 'Integrated Gemini AI with RAG for intelligent interview prep and Q&A.', projects: [{ name: 'AI Career Assistant', targetIndex: 8 }] },
      { name: 'Computer Vision', iconKey: 'OpenCV', level: 'Learning', usage: 'Real-time face detection and emotion recognition with OpenCV and CNN.', projects: [{ name: 'Face Emotion', targetIndex: 7 }] },
      { name: 'Python', iconKey: 'Python', level: 'Strong', usage: 'Full-stack ML development with Flask, Pandas, NumPy, and Matplotlib.', projects: [{ name: 'ML Predictor', targetIndex: 5 }, { name: 'AI Career', targetIndex: 8 }] },
    ],
  }
];

// ==========================================
// LEVEL BADGE CONFIG
// ==========================================
const levelConfig = {
  Strong: { 
    label: 'Strong', 
    bg: 'bg-blue-500/15', 
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    barColor: 'from-blue-500 to-blue-400',
    glow: 'shadow-blue-500/20',
  },
  Familiar: { 
    label: 'Familiar', 
    bg: 'bg-amber-500/15', 
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    barColor: 'from-amber-500 to-amber-400',
    glow: 'shadow-amber-500/20',
  },
  Learning: { 
    label: 'Learning', 
    bg: 'bg-emerald-500/15', 
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    barColor: 'from-emerald-500 to-emerald-400',
    glow: 'shadow-emerald-500/20',
  },
};

// ==========================================
// PROFICIENCY BAR WIDTHS (honest fresher levels)
// ==========================================
const proficiencyWidths = {
  Strong: 85,
  Familiar: 65,
  Learning: 40,
};

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.08, delayChildren: 0.1 } 
  }
};

const categoryVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 80, damping: 18 } 
  }
};

const skillCardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 15 } 
  }
};

const iconContainerVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }
  }
};

// ==========================================
// SKILL MINI-CARD COMPONENT
// ==========================================
const SkillMiniCard = ({ skill, categoryIndex, skillIndex }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const brandColor = getBrandColor(skill.iconKey);
  const levelCfg = levelConfig[skill.level];
  const barWidth = proficiencyWidths[skill.level];
  const uniqueId = `${categoryIndex}-${skillIndex}`;

  const handleProjectClick = (e, targetIndex) => {
    e.preventDefault();
    e.stopPropagation();
    const sliderSection = document.getElementById('projects-slider');
    if (sliderSection) {
      sliderSection.scrollIntoView({ behavior: 'smooth' });
    }
    window.dispatchEvent(new CustomEvent('slide-to-project', { 
      detail: { index: targetIndex } 
    }));
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <motion.div
      variants={skillCardVariants}
      className="group relative"
    >
      {/* Glow Effect */}
      <div 
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-40 transition-all duration-500 blur-sm"
        style={{ backgroundColor: brandColor }}
      />
      
      {/* Card */}
      <div 
        className="relative flex flex-col items-center p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:-translate-y-1"
        style={{ 
          backgroundColor: '#0e1018',
          borderColor: `${brandColor}18`,
        }}
        onClick={toggleExpand}
      >
        {/* ====== LARGE ICON ====== */}
        <motion.div
          variants={iconContainerVariants}
          className="relative flex items-center justify-center w-16 h-16 rounded-2xl mb-3 transition-all duration-300 group-hover:scale-110"
          style={{ 
            backgroundColor: `${brandColor}18`,
            border: `1.5px solid ${brandColor}35`,
            boxShadow: `0 0 20px ${brandColor}15, inset 0 0 20px ${brandColor}08`,
          }}
        >
          {/* Pulse ring on hover */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping"
            style={{ backgroundColor: `${brandColor}10` }}
          />
          {/* Icon */}
          <div className="relative z-10" style={{ color: brandColor }}>
            {renderTechIcon(skill.iconKey, 'w-9 h-9')}
          </div>
        </motion.div>

        {/* ====== SKILL NAME ====== */}
        <h4 className="font-semibold text-sm text-gray-200 text-center leading-tight mb-2 group-hover:text-white transition-colors">
          {skill.name}
        </h4>

        {/* ====== PROFICIENCY BAR ====== */}
        <div className="w-full mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${levelCfg.text}`}>
              {levelCfg.label}
            </span>
            <span className="text-[10px] text-gray-500">{barWidth}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-gray-800 overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${levelCfg.barColor}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${barWidth}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* ====== PROJECT COUNT ====== */}
        <div className="flex items-center gap-1 text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          {skill.projects.length} project{skill.projects.length > 1 ? 's' : ''}
          <svg 
            className={`w-3 h-3 ml-0.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* ====== EXPANDABLE PROJECT DETAILS ====== */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pt-3 mt-3 border-t border-white/5">
                {/* Usage description */}
                <p className="text-[11px] text-gray-400 leading-relaxed mb-3">
                  {skill.usage}
                </p>
                
                {/* Project buttons */}
                <div className="flex flex-wrap gap-1.5">
                  {skill.projects.map((proj, pIndex) => (
                    <button 
                      key={pIndex} 
                      onClick={(e) => handleProjectClick(e, proj.targetIndex)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 border"
                      style={{ 
                        backgroundColor: `${brandColor}10`,
                        borderColor: `${brandColor}30`,
                        color: brandColor,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${brandColor}25`;
                        e.currentTarget.style.borderColor = `${brandColor}50`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = `${brandColor}10`;
                        e.currentTarget.style.borderColor = `${brandColor}30`;
                      }}
                    >
                      {proj.name}
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ==========================================
// CATEGORY COLUMN COMPONENT
// ==========================================
const CategoryColumn = ({ skillGroup, index }) => {
  const itemCount = skillGroup.items.length;
  
  return (
    <motion.div 
      variants={categoryVariants}
      className="flex flex-col h-full"
    >
      {/* Category Header */}
      <div className="mb-4 pb-3 border-b border-white/5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 tracking-wide">
            {skillGroup.category}
          </h3>
          <span className="text-[10px] font-bold text-gray-500 bg-gray-800/60 px-2 py-0.5 rounded-full border border-gray-700/50">
            {itemCount}
          </span>
        </div>
      </div>

      {/* Skills Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 gap-3"
      >
        {skillGroup.items.map((skill, skillIndex) => (
          <SkillMiniCard 
            key={skillIndex}
            skill={skill}
            categoryIndex={index}
            skillIndex={skillIndex}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

// ==========================================
// MAIN SKILLS SECTION
// ==========================================
const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-transparent border-t border-white/5 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ====== SECTION HEADER ====== */}
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
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-5"
          >
            Click any skill card to see the projects where it was used. 
            Honest proficiency levels for a fresher developer.
          </motion.p>
          
          {/* Legend */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            {Object.entries(levelConfig).map(([key, cfg]) => (
              <div key={key} className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${cfg.bg} ${cfg.border}`}>
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${cfg.barColor}`} />
                <span className={`text-[11px] font-bold ${cfg.text}`}>{cfg.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] mt-6"
          />
        </div>
        
        {/* ====== CATEGORIES GRID ====== */}
        {/* 4 columns on xl, 2 on md, 1 on mobile */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-6"
        >
          {skillsData.map((skillGroup, index) => (
            <CategoryColumn 
              key={index} 
              skillGroup={skillGroup} 
              index={index}
            />
          ))}
        </motion.div>

        {/* ====== BOTTOM STATS BAR ====== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Technologies', value: '22+', color: '#61DAFB' },
            { label: 'Strong Skills', value: '8', color: '#3B82F6' },
            { label: 'Projects Built', value: '9', color: '#F59E0B' },
            { label: 'Categories', value: '4', color: '#10B981' },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center p-4 rounded-xl border border-white/5 bg-[#0e1018]/60 backdrop-blur-sm"
            >
              <span className="text-2xl font-extrabold" style={{ color: stat.color }}>{stat.value}</span>
              <span className="text-xs text-gray-500 font-medium mt-1">{stat.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
