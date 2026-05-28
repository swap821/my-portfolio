import process from 'process';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);

// Initialize Socket.io with CORS allowed
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST']
  }
});

// Store active users globally
const activeUsers = {};

io.on('connection', (socket) => {
  console.log(`New recruiter/visitor connected: ${socket.id}`);

  // Assign random starting position and color
  activeUsers[socket.id] = { x: 0, y: 0, color: generateRandomColor() };
  io.emit('users-update', activeUsers);

  // Listen for cursor movements
  socket.on('cursor-move', (position) => {
    if (activeUsers[socket.id]) {
      activeUsers[socket.id] = { ...activeUsers[socket.id], ...position };
      socket.broadcast.emit('users-update', activeUsers);
    }
  });

  // Listen for global reactions
  socket.on('send-reaction', (reactionData) => {
    console.log("SERVER RECEIVED REACTION:", reactionData.emoji);
    io.emit('receive-reaction', {
      id: Date.now() + Math.random(), 
      emoji: reactionData.emoji,
      x: reactionData.x,
      y: reactionData.y
    });
  });

  // Handle disconnects
  socket.on('disconnect', () => {
    console.log(`Visitor disconnected: ${socket.id}`);
    delete activeUsers[socket.id];
    io.emit('users-update', activeUsers);
  });
});

function generateRandomColor() {
  const colors = ['#60a5fa', '#c084fc', '#f472b6', '#34d399', '#fbbf24'];
  return colors[Math.floor(Math.random() * colors.length)];
}

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Live Portfolio Brain running on port ${PORT}`);
});