import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { techIcons, techColors } from './techData';

/* ──────────────── 9 Real Projects Data ──────────────── */
const projects = [
  {
    title: "DevStore",
    category: "Full-Stack",
    categoryColor: "#3B82F6",
    desc: "Full-stack e-commerce with Stripe payments, Redux cart, and admin dashboard.",
    features: ["Stripe payment integration", "Redux state management", "Admin dashboard", "Order tracking"],
    tech: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    github: "https://github.com/swap821/mini-ecommerce",
    demo: "https://mini-ecommerce-six-gold.vercel.app"
  },
  {
    title: "Placement Portal",
    category: "Full-Stack",
    categoryColor: "#3B82F6",
    desc: "Role-based campus placement system with job drives and application tracking.",
    features: ["RBAC authentication", "MongoDB aggregation", "Job drive management", "Application tracking"],
    tech: ["JavaScript", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/swap821/campus-placement-portal",
    demo: null
  },
  {
    title: "Live Chat App",
    category: "Full-Stack",
    categoryColor: "#3B82F6",
    desc: "Real-time messaging with WebSockets, rooms, and typing indicators.",
    features: ["WebSocket architecture", "Real-time messaging", "Room-based chats", "Typing indicators"],
    tech: ["JavaScript", "Socket.io", "Node.js", "Express"],
    github: "https://github.com/swap821/live-chat-app",
    demo: "https://live-chat-app-five-amber.vercel.app"
  },
  {
    title: "Kanban Board",
    category: "Frontend",
    categoryColor: "#8B5CF6",
    desc: "Drag-and-drop task board with React DnD and state management.",
    features: ["Drag-and-drop UI", "State management", "Task CRUD operations", "Column customization"],
    tech: ["TypeScript", "React", "React DnD", "Tailwind"],
    github: "https://github.com/swap821/kanban-project",
    demo: null
  },
  {
    title: "Crypto Tracker",
    category: "Frontend",
    categoryColor: "#8B5CF6",
    desc: "Live crypto dashboard with API polling, charts, and price alerts.",
    features: ["Live API polling", "Interactive charts", "Price alerts", "Portfolio tracking"],
    tech: ["JavaScript", "React", "Chart.js", "REST API"],
    github: "https://github.com/swap821/crypto-tracker",
    demo: "https://crypto-tracker-five-eosin.vercel.app"
  },
  {
    title: "ML Student Predictor",
    category: "AI/ML",
    categoryColor: "#10B981",
    desc: "ML regression app predicting student scores with 3 model comparison.",
    features: ["3-model training pipeline", "Feature importance analysis", "Score prediction", "Model comparison charts"],
    tech: ["Python", "Scikit-learn", "XGBoost", "Flask", "React"],
    github: "https://github.com/swap821/ml-student-predictor",
    demo: "https://ml-student-predictor.vercel.app"
  },
  {
    title: "Sentiment Analysis",
    category: "AI/ML",
    categoryColor: "#10B981",
    desc: "Dual-model NLP pipeline with TF-IDF + LSTM for text sentiment analysis.",
    features: ["TF-IDF + LSTM dual model", "Real-time text analysis", "Batch CSV processing", "Confidence scoring"],
    tech: ["Python", "TensorFlow", "spaCy", "Flask", "React"],
    github: "https://github.com/swap821/sentiment-analysis-app",
    demo: "https://sentiment-analysis-app.vercel.app"
  },
  {
    title: "Face Emotion Detector",
    category: "AI/ML",
    categoryColor: "#10B981",
    desc: "Real-time CNN-based emotion detection from webcam with 7-class recognition.",
    features: ["7-class CNN emotion model", "Real-time webcam processing", "OpenCV integration", "WebSocket streaming"],
    tech: ["Python", "TensorFlow", "OpenCV", "Flask", "Socket.io"],
    github: "https://github.com/swap821/face-emotion-detector",
    demo: "https://face-emotion-detector.vercel.app"
  },
  {
    title: "AI Career Assistant",
    category: "AI/ML",
    categoryColor: "#10B981",
    desc: "Capstone with RAG interview prep, resume parsing, and job matching.",
    features: ["RAG with AWS Bedrock/Claude", "spaCy NER resume parsing", "Skill gap analysis", "Semantic job matching"],
    tech: ["Python", "AWS Bedrock", "spaCy", "Flask", "React"],
    github: "https://github.com/swap821/ai-career-assistant",
    demo: "https://ai-career-assistant.vercel.app"
  }
];

const categories = ["All", "Full-Stack", "Frontend", "AI/ML"];

const getInitials = (title) => {
  return title.split(/[\s-]+/).map(w => w[0]).join('').substring(0, 2).toUpperCase();
};

const ProjectCard = ({ project, index }) => {
  const initials = getInitials(project.title);
  const hasDemo = project.demo !== null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative"
    >
      {/* Hover glow */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{ background: `linear-gradient(135deg, ${project.categoryColor}40, transparent 60%)` }}
      />

      <div className="relative h-full bg-[#0b1120] border border-gray-800/80 rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:border-gray-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col md:flex-row h-full">
          {/* LEFT: Image / Initials Area */}
          <div
            className="relative w-full md:w-[40%] min-h-[160px] md:min-h-full flex flex-col items-center justify-center p-6 overflow-hidden shrink-0"
            style={{ backgroundColor: `${project.categoryColor}08` }}
          >
            {/* Dot pattern */}
            <div className="absolute inset-0 opacity-[0.08]" style={{
              backgroundImage: `radial-gradient(${project.categoryColor} 1px, transparent 1px)`,
              backgroundSize: '16px 16px'
            }} />
            {/* Grid lines */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `linear-gradient(${project.categoryColor} 1px, transparent 1px), linear-gradient(90deg, ${project.categoryColor} 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />

            {/* Large Initials */}
            <div className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center mb-3 border transition-all duration-300 group-hover:scale-110"
              style={{
                backgroundColor: `${project.categoryColor}15`,
                borderColor: `${project.categoryColor}30`,
                boxShadow: `0 0 30px ${project.categoryColor}10, inset 0 0 20px ${project.categoryColor}05`
              }}
            >
              <span className="text-3xl font-black" style={{ color: project.categoryColor }}>{initials}</span>
            </div>
            <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: `${project.categoryColor}99` }}>{project.category}</span>

            {/* Number */}
            <div className="absolute -top-4 -left-2 text-[6rem] font-black leading-none select-none" style={{ color: `${project.categoryColor}06` }}>
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="flex-1 p-5 md:p-6 flex flex-col">
            {/* Category badge */}
            <span className="self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 border"
              style={{ color: project.categoryColor, backgroundColor: `${project.categoryColor}12`, borderColor: `${project.categoryColor}25` }}>
              {project.category}
            </span>

            <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight">{project.title}</h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.desc}</p>

            {/* Features */}
            <ul className="space-y-1.5 mb-4 flex-grow">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] text-gray-300">
                  <svg className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  <span className="leading-snug">{f}</span>
                </li>
              ))}
            </ul>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border"
                  style={{
                    color: techColors[t] || '#9CA3AF',
                    backgroundColor: `${techColors[t] || '#9CA3AF'}10`,
                    borderColor: `${techColors[t] || '#9CA3AF'}25`
                  }}>
                  {techIcons[t] ? <span className="w-2.5 h-2.5">{techIcons[t]}</span> : null}
                  {t}
                </span>
              ))}
            </div>

            {/* Action buttons - ALWAYS VISIBLE */}
            <div className="flex gap-2.5 pt-3 border-t border-gray-800/60">
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-600 text-white text-[11px] font-bold hover:bg-white/5 hover:border-gray-500 transition-all active:scale-95">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub Repo
              </a>
              <a href={hasDemo ? project.demo : project.github} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-[11px] font-bold transition-all active:scale-95"
                style={{
                  backgroundColor: hasDemo ? project.categoryColor : '#374151',
                  boxShadow: hasDemo ? `0 4px 15px ${project.categoryColor}40` : 'none'
                }}>
                {hasDemo ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    View Code
                  </>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   MAIN PROJECT SLIDER COMPONENT
   ═══════════════════════════════════════════ */
const ProjectSlider = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  // Category counts
  const counts = {
    "All": projects.length,
    "Full-Stack": projects.filter(p => p.category === "Full-Stack").length,
    "Frontend": projects.filter(p => p.category === "Frontend").length,
    "AI/ML": projects.filter(p => p.category === "AI/ML").length,
  };

  return (
    <div id="projects-slider" className="scroll-mt-20">
      {/* ── Filter Tabs ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-center justify-center gap-1 sm:gap-2 mb-10 flex-wrap"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
              activeFilter === cat
                ? 'text-white'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {activeFilter === cat && (
              <motion.div
                layoutId="projectFilterBg"
                className="absolute inset-0 rounded-xl"
                style={{ backgroundColor: activeFilter === 'All' ? '#3B82F6' : activeFilter === 'Full-Stack' ? '#3B82F6' : activeFilter === 'Frontend' ? '#8B5CF6' : '#10B981' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              {cat} <span className="opacity-60">({counts[cat]})</span>
            </span>
          </button>
        ))}
      </motion.div>

      {/* ── Projects Grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 xl:grid-cols-2 gap-5 md:gap-6"
        >
          {filtered.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ── Stats Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 flex items-center justify-center gap-6 md:gap-10 flex-wrap"
      >
        {[
          { label: 'Full-Stack', count: counts['Full-Stack'], color: '#3B82F6' },
          { label: 'Frontend', count: counts['Frontend'], color: '#8B5CF6' },
          { label: 'AI/ML', count: counts['AI/ML'], color: '#10B981' },
        ].map((stat, i) => (
          <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0b1120]/80 border border-gray-800/60">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stat.color, boxShadow: `0 0 8px ${stat.color}60` }} />
            <span className="text-sm font-bold text-white">{stat.count}</span>
            <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProjectSlider;