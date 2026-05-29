import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';

// 🛑 Replace with your actual live Render URL!
const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const socket = io(SOCKET_URL, { autoConnect: false });

const FloatingEmojiItem = ({ item }) => {
  const [randomX] = useState(() => (Math.random() - 0.5) * 15);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.2, y: 0, x: randomX }}
      animate={{ 
        opacity: [0, 1, 1, 0], 
        scale: [0.5, 1, 1, 0.5], 
        y: [0, -100, -140, -160]
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      // Spawns slightly higher now to clear the badges
      className="absolute bottom-full mb-2 text-2xl drop-shadow-xl select-none pointer-events-none z-0"
    >
      {item.emoji}
    </motion.div>
  );
};

const GlobalReactions = () => {
  const [reactions, setReactions] = useState([]);
  const [counts, setCounts] = useState({});

  const itEmojis = ['🚀', '💡', '⚡', '☕'];

  // --- INTEGRATED SOCKET.IO LOGIC ---
  useEffect(() => {
    socket.connect();

    socket.on('initial-counts', (data) => {
      const dbCounts = {};
      data.forEach(item => {
        dbCounts[item.emoji] = item.count;
      });
      setCounts(dbCounts);
    });

    socket.on('receive-reaction', (data) => {
      const id = Date.now() + Math.random();
      setReactions((prev) => [...prev, { id, emoji: data.emoji }]);
      
      setCounts((prev) => ({
        ...prev,
        [data.emoji]: (prev[data.emoji] || 0) + 1
      }));

      setTimeout(() => {
        setReactions((prev) => prev.filter((item) => item.id !== id));
      }, 1500);
    });

    return () => {
      socket.disconnect();
      socket.off('initial-counts');
      socket.off('receive-reaction');
    };
  }, []);

  // --- UNIFIED CLICK HANDLER ---
  const handleReaction = useCallback((emoji) => {
    const id = Date.now() + Math.random();
    setReactions((prev) => [...prev, { id, emoji }]);

    setCounts((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1
    }));

    socket.emit('send-reaction', { emoji });

    setTimeout(() => {
      setReactions((prev) => prev.filter((item) => item.id !== id));
    }, 1500);
  }, []);

  return (
    // WRAPPER: Aligned to items-start so the badges line up neatly on the left
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[9999] flex flex-col items-start pointer-events-none">
      
      {/* Floating Animation Container */}
      <div className="relative w-full flex justify-start pl-8">
        <AnimatePresence>
          {reactions.map((item) => (
            <FloatingEmojiItem key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </div>

      {/* DISCORD-STYLE BADGES WRAPPER: No background pill, just a flex row with gap */}
      <div className="pointer-events-auto relative z-10 flex flex-wrap items-center gap-2 mt-2">
        {itEmojis.map((emoji, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.preventDefault();
              handleReaction(emoji);
            }}
            // EXACT DISCORD STYLING: Horizontal layout, dark slate background, side-by-side text
            className="flex items-center justify-center gap-1.5 px-2.5 py-1 bg-[#2b2d31]/90 hover:bg-[#313338] border border-[#1e1f22]/50 hover:border-gray-500 rounded-lg transition-colors outline-none select-none cursor-pointer md:cursor-none touch-manipulation shadow-sm backdrop-blur-sm"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {/* Emoji */}
            <span className="text-[1.1rem] leading-none">{emoji}</span>
            {/* Number Counter */}
            <span className="text-[13px] font-bold text-[#b5bac1] mt-[1px]">
              {counts[emoji] || 0}
            </span>
          </button>
        ))}
      </div>
      
    </div>
  );
};

export default GlobalReactions;