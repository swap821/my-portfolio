import { useLiveCursors } from './hooks/useLiveCursors';
import GlobalReactions from './components/GlobalReactions';
import Background3D from './components/Background3D';
import Navbar from './components/Navbar';

// Content Components
import Hero from './components/Hero';
import Skills from './components/Skills';
import ProjectSlider from './components/ProjectSlider'; // <-- UPGRADED COMPONENT
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  const { socket, activeUsers, reactions, sendReaction, localCursor } = useLiveCursors();

  const handleReactionClick = (e, emoji) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    if (socket && socket.current) {
        sendReaction(emoji, x, y);
    }
  };

  return (
    // UPGRADE: Added bg-[#030712], scroll-smooth, and premium selection highlights
    <div className="relative w-full min-h-screen bg-transparent text-white overflow-x-hidden md:cursor-none selection:bg-blue-500/30 selection:text-blue-100 scroll-smooth">   
  
      
      {/* LAYER 0: The 3D Background */}
      <Background3D />

      {/* LAYER 1: Global Reactions (Popups) */}
      <GlobalReactions reactions={reactions} />

      {/* LAYER 1.5: Top Navigation & Social Icons */}
      <Navbar />

      {/* --- LAYER 2.1: YOUR PERSONAL SHADOW CURSOR (Premium Ring) --- */}
      {localCursor && (
        <>
          {/* hidden md:block ensures this custom cursor disappears entirely on mobile screens */}
          <div 
            className="hidden md:block fixed pointer-events-none z-[10000] w-12 h-12 rounded-full border border-blue-500/40 bg-blue-500/10 backdrop-blur-[2px] transition-all duration-150 ease-out"
            style={{ 
              left: `${localCursor.x * 100}vw`, 
              top: `${localCursor.y * 100}vh`,
              transform: 'translate(-50%, -50%)',
            }}
          />
          <div 
            className="hidden md:block fixed pointer-events-none z-[10001] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{ 
              left: `${localCursor.x * 100}vw`, 
              top: `${localCursor.y * 100}vh`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </>
      )}

      {/* --- LAYER 2.2: GUEST CURSORS (Networked) --- */}
      {Object.entries(activeUsers).map(([id, user]) => (
        <div 
          key={id}
          className="fixed pointer-events-none z-[9999] text-xs px-2 py-1 rounded-full text-white font-bold whitespace-nowrap shadow-lg"
          style={{ 
            left: `${user.x * 100}vw`, 
            top: `${user.y * 100}vh`,
            backgroundColor: user.color || '#3b82f6', // Switched fallback to Tailwind blue-500
            transition: 'left 0.05s linear, top 0.05s linear' 
          }}
        >
          Guest {id.slice(0, 4)}
        </div>
      ))}

      {/* LAYER 3: Main Website Content */}
      <main className="relative z-10 w-full min-h-screen bg-transparent">
        {/* Wrapped components in anchor divs for Navbar routing */}
        <div id="hero"><Hero /></div>
        <div id="skills"><Skills /></div>
        
        {/* UPGRADED SECTION: 3D Swiper Slider Integration */}
        <div id="projects" className="py-20 w-full">
          <h2 className="text-center text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight relative z-10">
            Featured <span className="text-blue-500">Projects</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto px-4 relative z-10">
            Swipe through some of my favorite recent builds, featuring modern web architectures and real-time integrations.
          </p>
          <ProjectSlider />
        </div>

        <div id="about"><About /></div>
        <div id="contact"><Contact /></div>
      </main>

      {/* LAYER 4: Footer */}
      <Footer />

      {/* LAYER 5: Floating Digital Twin AI */}
      <Chatbot />

      {/* LAYER 6: Reaction Bar */}
      {/* UPGRADE: Moved to bottom-6 left-6 to balance the screen with the AI Chatbot on the right */}
      <div className="fixed bottom-6 left-6 z-[200] flex gap-2 p-2 bg-gray-900/60 backdrop-blur-md rounded-full border border-gray-700/50 shadow-2xl hover:cursor-auto">
        {['🔥', '👏', '🚀'].map((emoji) => (
          <button
            key={emoji}
            onClick={(e) => handleReactionClick(e, emoji)}
            className="pointer-events-auto w-12 h-12 flex items-center justify-center text-2xl hover:bg-white/10 rounded-full transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            {emoji}
          </button>
        ))}
      </div>
      
    </div>
  );
}

export default App;