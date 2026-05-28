import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:4000';

export const useLiveCursors = () => {
  const socketRef = useRef(null);
  const [activeUsers, setActiveUsers] = useState({});
  const [reactions, setReactions] = useState([]);
  const [localCursor, setLocalCursor] = useState(null); 

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    socket.on('users-update', (users) => {
      const others = { ...users };
      // Remove YOURSELF from the "Guest" list
      if (socket.id && others[socket.id]) {
        delete others[socket.id];
      }
      setActiveUsers(others);
    });

    socket.on('receive-reaction', (reaction) => {
      setReactions((prev) => [...prev, reaction]);
      setTimeout(() => {
        setReactions((prev) => prev.filter((r) => r.id !== reaction.id));
      }, 3000); 
    });

    let lastEmitTime = 0;
    const throttleDelay = 30; // Fast 30ms throttle for smooth multiplayer

    const handleMouseMove = (e) => {
      const position = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };

      setLocalCursor(position); // Instant local update

      const now = Date.now();
      if (now - lastEmitTime > throttleDelay) {
        if (socketRef.current) {
          socketRef.current.emit('cursor-move', position);
          lastEmitTime = now;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      socket.disconnect(); 
    };
  }, []);

  const sendReaction = (emoji, x, y) => {
    if (socketRef.current) {
      socketRef.current.emit('send-reaction', { emoji, x, y });
    }
  };

  return { socket: socketRef, activeUsers, reactions, sendReaction, localCursor };
};