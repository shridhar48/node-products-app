const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const productRouter = require('./routes/product.route');

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/api/products', productRouter);

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

const connectToMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit if MongoDB connection fails
  }
};

// Start the app only after MongoDB is connected
const startApp = async () => {
  await connectToMongoDB(); // Ensure MongoDB is connected first
  console.log('App is ready to handle requests.');
};

// Call the startApp function to ensure everything is connected before starting
startApp();

// Export the app handler for serverless-offline to use
module.exports.handler = app;
