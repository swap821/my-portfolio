import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ----------------------------------------------------------------------
// 🧠 THE ADVANCED MULTI-INTENT PARSER & RECRUITER BRAIN
// ----------------------------------------------------------------------
const generateLocalResponse = (userInput) => {
  const text = userInput.toLowerCase().replace(/[?,.!]/g, '');

  const knowledgeBase = [
    // --- PROJECT INTENTS (Now with interactive 'action' payloads!) ---
    {
      id: 'devstore',
      keywords: ['devstore', 'ecommerce', 'e-commerce', 'shop', 'stripe', 'payment'],
      response: "'DevStore' is Swapnil's full-stack e-commerce platform. He engineered it with secure JWT sessions and a real-time Stripe webhook sync for payment processing, all backed by Node.js and MongoDB.",
      action: { label: "View DevStore", targetIndex: 0 }
    },
    {
      id: 'portal',
      keywords: ['placement', 'portal', 'campus', 'rbac'],
      response: "His Campus Placement Portal is a Role-Based Access Control (RBAC) system. He optimized the analytics dashboard using advanced MongoDB aggregation pipelines to handle data efficiently.",
      action: { label: "View Placement Portal", targetIndex: 1 }
    },
    {
      id: 'chat',
      keywords: ['chat', 'websocket', 'socket', 'socketio', 'real-time', 'live', 'messaging'],
      response: "For real-time systems, Swapnil built a Live Chat Application using WebSockets (Socket.io). It features instant message delivery and highly optimized React render cycles.",
      action: { label: "View Live Chat App", targetIndex: 2 }
    },
    {
      id: 'kanban',
      keywords: ['kanban', 'board', 'task', 'drag', 'drop', 'dnd'],
      response: "He developed a Kanban Board using React DnD for drag-and-drop task tracking, focusing heavily on complex, immutable state matrix management.",
      action: { label: "View Kanban Board", targetIndex: 3 }
    },
    {
      id: 'crypto',
      keywords: ['crypto', 'tracker', 'bitcoin', 'chartjs', 'api'],
      response: "His Cryptocurrency Tracker is an API-driven dashboard. He implemented debounced REST API polling to fetch live market data safely and used Chart.js for dynamic visualization.",
      action: { label: "View Crypto Tracker", targetIndex: 4 }
    },

    // --- RECRUITER & BEHAVIORAL INTENTS ---
    {
      id: 'about',
      keywords: ['about', 'yourself', 'who', 'background', 'intro', 'pitch'],
      response: "Swapnil is a driven Full-Stack MERN Developer currently in his second year of BCA. He specializes in building agency-grade, highly interactive web applications. He bridges the gap between complex backend architectures and premium frontend user experiences."
    },
    {
      id: 'strengths',
      keywords: ['strength', 'strengths', 'best', 'good at', 'value', 'why hire'],
      response: "Swapnil's core strengths are his adaptability and his full-stack vision. Because he understands both database aggregation (MongoDB) and advanced UI rendering (React/Framer Motion), he builds features that are both visually stunning and highly performant."
    },
    {
      id: 'weaknesses',
      keywords: ['weakness', 'weaknesses', 'challenge', 'struggle', 'improve'],
      response: "As an enthusiastic developer, Swapnil's main challenge is wanting to build everything from scratch! However, he has recently focused on learning when to leverage existing tools and libraries to speed up development cycles."
    },
    {
      id: 'availability',
      keywords: ['available', 'start', 'timeline', 'when', 'internship', 'full-time'],
      response: "Swapnil is actively seeking remote or hybrid internship opportunities. He is highly dedicated and ready to start contributing to a dynamic engineering team immediately."
    },
    {
      id: 'location',
      keywords: ['location', 'where', 'remote', 'relocate', 'relocation', 'india'],
      response: "Swapnil is based in Jamshedpur, Jharkhand, India. He is fully equipped for remote work and is open to discussing relocation for the right opportunity."
    },
    {
      id: 'skills',
      keywords: ['skill', 'skills', 'tech', 'stack', 'technologies', 'react', 'node', 'express', 'mongodb', 'mern'],
      response: "He specializes in the MERN stack (MongoDB, Express, React, Node.js). He is also highly proficient in Tailwind CSS for styling, WebSockets for real-time data, and building scalable API architectures."
    },
    {
      id: 'hire',
      keywords: ['hire', 'contact', 'email', 'reach', 'resume', 'phone', 'call'],
      response: "The best way to reach Swapnil is directly at kumarswapnil82@gmail.com or by calling +91 80925 13413. You can also download his resume directly from the Hero section above!"
    },
    {
      id: 'greeting',
      keywords: ['hi', 'hello', 'hey', 'greetings', 'morning'],
      response: "Hello! Feel free to ask me about Swapnil's tech stack, his availability for internships, or ask me to explain any of his projects (like DevStore or the Live Chat app)!"
    }
  ];

  let matchedIntents = [];

  knowledgeBase.forEach(entry => {
    let score = 0;
    entry.keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(text)) {
        score++;
      }
    });

    if (score > 0) {
      matchedIntents.push({ score, response: entry.response, action: entry.action || null });
    }
  });

  if (matchedIntents.length > 0) {
    matchedIntents.sort((a, b) => b.score - a.score);
    
    let combinedText = matchedIntents[0].response;
    
    // Multi-intent magic
    if (matchedIntents.length > 1 && matchedIntents[0].score >= 1 && matchedIntents[1].score >= 1) {
      combinedText += "\n\nAdditionally, " + matchedIntents[1].response.charAt(0).toLowerCase() + matchedIntents[1].response.slice(1);
    }
    
    // Return an object containing both the text AND the action button data
    return { text: combinedText, action: matchedIntents[0].action || null };
  }

  // Dynamic Fallbacks
  const fallbacks = [
    "That's an interesting question! I am tuned to answer recruiter questions about Swapnil's background, his MERN stack skills, and his 5 main portfolio projects. Try asking about one of those!",
    "I'm still learning! My knowledge is currently focused on Swapnil's web development projects, tech stack, and internship availability. How can I help with those?",
    "Great question! While I don't have the answer to that just yet, I'd love to tell you about Swapnil's real-time Live Chat app or his E-commerce platform. Which sounds better?"
  ];
  
  return { text: fallbacks[Math.floor(Math.random() * fallbacks.length)], action: null };
};
// ----------------------------------------------------------------------


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm Swapnil's Digital Twin. Ask me about his projects, technical skills, or why you should hire him!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestions = ["Tell me about yourself", "Explain DevStore", "Are you looking for internships?"];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- THE MAGIC BRIDGE HANDLER ---
  const handleProjectRedirect = (targetIndex) => {
    setIsOpen(false); // Close the chat first so they can see the animation
    setTimeout(() => {
      const sliderSection = document.getElementById('projects-slider');
      if (sliderSection) {
        sliderSection.scrollIntoView({ behavior: 'smooth' });
      }
      window.dispatchEvent(new CustomEvent('slide-to-project', { 
        detail: { index: targetIndex } 
      }));
    }, 300); // Wait for chat close animation to finish
  };

  const processMessage = (userText) => {
    if (!userText.trim() || isTyping) return;

    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateLocalResponse(userText); 
      // Push both the text and the potential action button into the state
      setMessages(prev => [...prev, { role: 'assistant', text: reply.text, action: reply.action }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSend = (e) => {
    e.preventDefault();
    processMessage(input);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[999] flex items-center gap-2 px-5 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] transition-all border border-blue-400/50 cursor-none"
            aria-label="Open AI Chatbot"
          >
            <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Ask AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[1000] w-[calc(100vw-2rem)] sm:w-[400px] h-[600px] max-h-[85vh] bg-[#0a101d]/95 backdrop-blur-3xl border border-gray-700/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 bg-[#050b14] border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </div>
                <h3 className="text-white font-bold tracking-wide">Swapnil's AI</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors cursor-none p-1"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
              {messages.map((msg, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] flex flex-col gap-2`}>
                    <div className={`px-4 py-3 rounded-2xl text-[13px] sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none shadow-md' 
                        : 'bg-gray-800/80 text-gray-200 border border-gray-700 rounded-tl-none shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                    
                    {/* NEW: Render Action Button if it exists! */}
                    {msg.action && (
                      <button
                        onClick={() => handleProjectRedirect(msg.action.targetIndex)}
                        className="self-start flex items-center gap-2 mt-1 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-none active:scale-95"
                      >
                        {msg.action.label}
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-gray-800/80 border border-gray-700 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5 shadow-sm">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="bg-[#050b14] border-t border-gray-800 flex flex-col">
              <div className="flex gap-2 px-4 pt-3 pb-1 overflow-x-auto custom-scrollbar">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      processMessage(suggestion);
                      inputRef.current?.focus(); 
                    }}
                    disabled={isTyping}
                    className="whitespace-nowrap px-3 py-1.5 text-[11px] font-medium text-blue-300 bg-blue-500/10 border border-blue-500/30 rounded-full hover:bg-blue-500/20 transition-colors cursor-none disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSend} className="flex gap-2 p-4 pt-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-[#0a101d] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all cursor-none"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white rounded-xl transition-colors cursor-none flex items-center justify-center"
                  aria-label="Send message"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { height: 4px; width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 10px; }
      `}</style>
    </>
  );
};

export default Chatbot;