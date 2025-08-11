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

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "React app URL"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});


// ✅ Allow both local dev and deployed frontend
const allowedOrigins = [
  'http://localhost:3000', // local React
  'https://add-frontend.onrender.com' // deployed frontend
];

app.use(cors());

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chatbot', require('./routes/chatbot'));
app.use('/api/campaign', require('./routes/campaign'));

// ✅ Handle preflight OPTIONS requests
app.options('*', cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




