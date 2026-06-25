import process from 'process';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();

// SECURITY FIX: Restrict CORS to your Vercel domain only
// For local dev, add: origin: ['https://swapnil-kumar-portfolio016.vercel.app', 'http://localhost:5173']
const ALLOWED_ORIGINS = [
  'https://swapnil-kumar-portfolio016.vercel.app',
  'https://swapnil-kumar-portfolio.vercel.app',
  // Add localhost for development
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.indexOf(origin) === -1) {
      return callback(new Error('CORS policy: Origin not allowed'), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST'],
  credentials: true
}));

const server = http.createServer(app);

// Initialize Socket.io with CORS allowed
const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGINS,
    methods: ['GET', 'POST'],
    credentials: true
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