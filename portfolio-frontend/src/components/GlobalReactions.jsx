import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';

const ReactionItem = ({ reaction }) => {
  const [drift] = useState(() => ({
    x: (Math.random() - 0.5) * 60, 
    y: Math.random() * 60 + 100 
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.2, y: 0, x: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0], 
        scale: [0.5, 1.2, 1],  
        y: -drift.y, 
        x: drift.x        
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      // Spawns perfectly above the new built-in buttons
      className="absolute bottom-full mb-4 text-2xl md:text-3xl drop-shadow-xl select-none pointer-events-none z-0"
    >
      {reaction.emoji}
    </motion.div>
  );
};

const GlobalReactions = () => {
  // State is now managed locally inside this file
  const [reactions, setReactions] = useState([]);

  const handleReaction = useCallback((emoji) => {
    const id = Date.now() + Math.random();
    setReactions((prev) => [...prev, { id, emoji }]);

    // Auto-cleanup memory
    setTimeout(() => {
      setReactions((prev) => prev.filter((item) => item.id !== id));
    }, 1500);
  }, []);

  // NEW: The professional IT Emoji Array
  const itEmojis = ['🚀', '💡', '⚡', '☕'];

  return (
    // Fixed to bottom left. pointer-events-none stops the invisible box from blocking clicks on your site
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[9999] flex flex-col items-center pointer-events-none">
      
      {/* Floating Animation Container */}
      <div className="relative w-full flex justify-center">
        <AnimatePresence>
          {reactions.map((reaction) => (
            <ReactionItem key={reaction.id} reaction={reaction} />
          ))}
        </AnimatePresence>
      </div>

      {/* The Clickable Buttons - pointer-events-auto turns clicks back on for just the pill */}
      <div className="pointer-events-auto relative z-10 flex items-center gap-1 md:gap-2 p-1.5 md:p-2 bg-[#050b14]/90 backdrop-blur-md border border-gray-800 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        {itEmojis.map((emoji, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.preventDefault();
              handleReaction(emoji);
            }}
            className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center text-lg md:text-xl rounded-full hover:bg-white/10 active:scale-75 transition-all outline-none select-none cursor-pointer md:cursor-none touch-manipulation"
            style={{ WebkitTapHighlightColor: 'transparent' }}
            aria-label={`React with ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>
      
    </div>
  );
};

export default GlobalReactions;