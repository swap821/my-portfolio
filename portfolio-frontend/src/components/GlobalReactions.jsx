import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const ReactionItem = ({ reaction }) => {
  // Calculate random drift exactly once when the emoji mounts.
  // This prevents jittering if the component ever re-renders.
  const [drift] = useState(() => ({
    x: (Math.random() - 0.5) * 80, // Drifts randomly left or right by up to 40px
    y: Math.random() * 50 + 120    // Floats upward randomly between 120px and 170px
  }));

  return (
    // WRAPPER: Handles exact coordinate placement and centering securely
    <div 
      className="absolute pointer-events-none z-[9999]"
      style={{ 
        left: `${reaction.x * 100}vw`, 
        top: `${reaction.y * 100}vh`,
        transform: 'translate(-50%, -50%)' 
      }}
    >
      {/* MOTION COMPONENT: Purely handles the floating animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.2, y: 0, x: 0 }}
        animate={{ 
          opacity: [0, 1, 1, 0], 
          scale: [0.5, 1.5, 1.2],  
          y: -drift.y, 
          x: drift.x        
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-3xl md:text-4xl drop-shadow-xl select-none"
      >
        {reaction.emoji}
      </motion.div>
    </div>
  );
};

const GlobalReactions = ({ reactions }) => {
  return (
    // fixed inset-0 covers the whole screen, pointer-events-none lets clicks pass through
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {reactions.map((reaction) => (
          <ReactionItem key={reaction.id} reaction={reaction} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GlobalReactions;