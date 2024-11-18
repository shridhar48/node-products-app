const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const serverless = require('serverless-http'); // Import serverless-http
require('dotenv').config();

const productRouter = require('./routes/product.route');

const app = express();

// Middleware to ensure MongoDB connection
let isConnected = false; // Track MongoDB connection status

const connectToMongoDB = async () => {
  if (isConnected) return;
  try {
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI);
    isConnected = true;
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw new Error('Database connection failed');
  }
};

app.use((req, res, next) => {
  console.log('Raw request headers:', req.headers);
  console.log('Raw request url:', req.url);
  console.log('Original request url:', req.originalUrl);
  next();
});

// MongoDB connection middleware (this must be placed before any route handling)
app.use(async (req, res, next) => {
  try {
    if (!isConnected) {
      console.log('Connecting to MongoDB... :', req.url);
      await connectToMongoDB();
    }
    console.log('MongoDB connected, processing request...', req.originalUrl);
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('MongoDB connection error:', error);
    res.status(500).send('Database connection error');
  }
});

// Body parser middleware (to parse incoming JSON bodies)
app.use(bodyParser.json());

// Register product router after MongoDB connection middleware
app.use('/api/products', productRouter);

// Export the app for serverless (AWS Lambda)
// module.exports.handler = serverless(app);
module.exports.handler = app;
