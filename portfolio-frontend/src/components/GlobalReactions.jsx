import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const ReactionItem = ({ reaction }) => {
  const [randomY] = useState(() => Math.random() * 100);
  const [randomX] = useState(() => (Math.random() - 0.5) * 50);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0], 
        scale: [0.5, 1.5, 1],  
        y: -150 - randomY, 
        x: randomX         
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="absolute text-4xl drop-shadow-lg pointer-events-none"
      style={{ 
        left: `${reaction.x * 100}vw`, 
        top: `${reaction.y * 100}vh`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {reaction.emoji}
    </motion.div>
  );
};

const GlobalReactions = ({ reactions }) => {
  return (
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