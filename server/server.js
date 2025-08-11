// // server/server.js
// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require("cors");
// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware to parse JSON
// app.use(express.json());
// app.use(cors());
// // API routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/chatbot', require('./routes/chatbot'));
// app.use('/api/campaign', require('./routes/campaign'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// server/server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());
const corsOptions = {
  origin: [
    'https://add-frontend.onrender.com',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Update the CORS headers middleware
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://add-frontend.onrender.com',
    'http://localhost:3000'
  ];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).json({
      body: "OK"
    });
  }
  
  next();
});


// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chatbot', require('./routes/chatbot'));
app.use('/api/campaign', require('./routes/campaign'));

// ✅ Handle preflight OPTIONS requests
app.options('*', cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






