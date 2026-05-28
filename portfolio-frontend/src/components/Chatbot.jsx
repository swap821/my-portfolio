import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm Swapnil's Digital Twin. Ask me about his projects, technical skills, or how to contact him!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Quick-Reply Suggestions for Recruiters
  const suggestions = ["What is your tech stack?", "Explain DevStore", "Are you looking for internships?"];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // --- THE ADVANCED MULTI-INTENT PARSER ---
  const generateLocalResponse = (userInput) => {
    // Normalize input: lowercase and remove basic punctuation for cleaner matching
    const text = userInput.toLowerCase().replace(/[?,.!]/g, '');

    const knowledgeBase = [
      {
        id: 'devstore',
        keywords: ['devstore', 'ecommerce', 'e-commerce', 'shop', 'stripe', 'payment'],
        response: "'DevStore' is Swapnil's full-stack e-commerce platform. He engineered it with secure JWT sessions and a real-time Stripe webhook sync for payment processing, all backed by Node.js and MongoDB."
      },
      {
        id: 'portal',
        keywords: ['placement', 'portal', 'campus', 'rbac'],
        response: "His Campus Placement Portal is a Role-Based Access Control (RBAC) system. He optimized the analytics dashboard using advanced MongoDB aggregation pipelines to handle data efficiently."
      },
      {
        id: 'chat',
        keywords: ['chat', 'websocket', 'socket', 'socketio', 'real-time', 'live'],
        response: "For real-time systems, Swapnil built a Live Chat Application using WebSockets (Socket.io). It features instant message delivery and highly optimized React render cycles."
      },
      {
        id: 'kanban',
        keywords: ['kanban', 'board', 'task', 'drag', 'drop', 'dnd'],
        response: "He developed a Kanban Board using React DnD for drag-and-drop task tracking, focusing heavily on complex, immutable state matrix management."
      },
      {
        id: 'crypto',
        keywords: ['crypto', 'tracker', 'bitcoin', 'chartjs', 'api'],
        response: "His Cryptocurrency Tracker is an API-driven dashboard. He implemented debounced REST API polling to fetch live market data safely and used Chart.js for dynamic visualization."
      },
      {
        id: 'skills',
        keywords: ['skill', 'skills', 'tech', 'stack', 'technologies', 'react', 'node', 'express', 'mongodb', 'mern'],
        response: "Swapnil specializes in the MERN stack (MongoDB, Express, React, Node.js). He is also highly proficient in Tailwind CSS for styling, WebSockets for real-time data, and building scalable API architectures."
      },
      {
        id: 'education',
        keywords: ['education', 'bca', 'degree', 'college', 'university', 'study'],
        response: "Swapnil is currently a second-year BCA (Bachelor of Computer Applications) student, constantly pushing his limits by building production-grade full-stack applications alongside his studies."
      },
      {
        id: 'hire',
        keywords: ['hire', 'intern', 'internship', 'job', 'contact', 'email', 'reach', 'resume'],
        response: "Swapnil is actively seeking internship and junior full-stack roles! The best way to reach him is directly at kumarswapnil82@gmail.com or via LinkedIn. He is ready to bring value to a dynamic engineering team."
      },
      {
        id: 'greeting',
        keywords: ['hi', 'hello', 'hey', 'greetings', 'morning'],
        response: "Hello! Feel free to ask me to break down any of Swapnil's projects (like DevStore), dive into his React skills, or find out his current availability."
      }
    ];

    let matchedIntents = [];

    // Score each category using Regex Word Boundaries (\b) to prevent false partial matches
    knowledgeBase.forEach(entry => {
      let score = 0;
      entry.keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        if (regex.test(text)) {
          score++;
        }
      });

      if (score > 0) {
        matchedIntents.push({ score, response: entry.response });
      }
    });

    // If matches are found, sort them by relevance
    if (matchedIntents.length > 0) {
      matchedIntents.sort((a, b) => b.score - a.score);

      // MULTI-INTENT MAGIC: If the user asked about 2 distinct things, combine the answers!
      if (matchedIntents.length > 1 && matchedIntents[0].score >= 1 && matchedIntents[1].score >= 1) {
        return matchedIntents[0].response + "\n\nAdditionally, " + matchedIntents[1].response.charAt(0).toLowerCase() + matchedIntents[1].response.slice(1);
      }

      // Otherwise, return the absolute best match
      return matchedIntents[0].response;
    }

    // Dynamic Fallback
    return "That's an interesting question! I am specifically tuned to discuss Swapnil's MERN stack skills, his 5 main portfolio projects, and his career goals. Try using one of the suggestion buttons below, or email him at kumarswapnil82@gmail.com!";
  };

  const processMessage = (userText) => {
    if (!userText.trim() || isTyping) return;

    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const reply = generateLocalResponse(userText);
      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSend = (e) => {
    e.preventDefault();
    processMessage(input);
  };

  return (
    <>
      {/* FLOATING AI BUTTON */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[999] flex items-center gap-2 px-5 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] transition-all border border-blue-400/50 cursor-none ${isOpen ? 'hidden' : 'flex'}`}
      >
        <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>Ask AI</span>
      </motion.button>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-[1000] w-[350px] sm:w-[400px] h-[550px] bg-[#0a101d]/95 backdrop-blur-3xl border border-gray-700/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Header */}
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
                className="text-gray-400 hover:text-white transition-colors cursor-none"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
              {messages.map((msg, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-gray-800/80 text-gray-200 border border-gray-700 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-gray-800/80 border border-gray-700 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions & Input Form */}
            <div className="bg-[#050b14] border-t border-gray-800 flex flex-col">
              {/* The Quick-Reply Pills */}
              <div className="flex gap-2 px-4 pt-3 pb-1 overflow-x-auto custom-scrollbar">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => processMessage(suggestion)}
                    disabled={isTyping}
                    className="whitespace-nowrap px-3 py-1.5 text-[11px] font-medium text-blue-300 bg-blue-500/10 border border-blue-500/30 rounded-full hover:bg-blue-500/20 transition-colors cursor-none disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSend} className="flex gap-2 p-4 pt-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-[#0a101d] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all cursor-none"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white rounded-xl transition-colors cursor-none flex items-center justify-center"
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