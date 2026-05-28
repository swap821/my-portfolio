import { motion } from 'framer-motion';
import { useLiveCursors } from '../hooks/useLiveCursors';

const LiveCursors = () => {
  const { socket, activeUsers } = useLiveCursors();

  return (
    // This div sits invisibly on top of the whole site
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {Object.entries(activeUsers).map(([id, user]) => {
        // Don't render a ghost cursor for the local user!
        if (socket && id === socket.id) return null;

        // Convert the percentage back into raw pixels for rendering
        const xPos = user.x * window.innerWidth;
        const yPos = user.y * window.innerHeight;

        return (
          <motion.div
            key={id}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1, 
              x: xPos, 
              y: yPos 
            }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 300,
              mass: 0.5 
            }}
            className="absolute top-0 left-0 flex flex-col items-center"
            style={{ 
              // Offset slightly so the tip of the arrow is at the exact mouse point
              marginLeft: '-10px', 
              marginTop: '-10px' 
            }}
          >
            {/* The SVG Cursor Shape */}
            <svg
              width="24"
              height="36"
              viewBox="0 0 24 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-md"
            >
              <path
                d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                fill={user.color}
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
            
            {/* The User Tag */}
            <div 
              className="px-2 py-1 mt-1 text-xs font-bold text-white rounded-md shadow-lg backdrop-blur-sm bg-opacity-80"
              style={{ backgroundColor: user.color }}
            >
              Guest {id.substring(0, 4)}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default LiveCursors;