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

// ✅ Allow both local dev and deployed frontend
const allowedOrigins = [
  'http://localhost:3000', // local React
  'https://add-frontend.onrender.com' // deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chatbot', require('./routes/chatbot'));
app.use('/api/campaign', require('./routes/campaign'));

// ✅ Handle preflight OPTIONS requests
app.options('*', cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


