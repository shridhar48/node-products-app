const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const productRouter = require('./routes/product.route');

const app = express();
app.use(express.json());

app.use('/api/products', productRouter);

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

const createServer = () => {
  app.listen(3000, () => {
    console.log('Server created');
  });
};

const connsectToMongoDB = () => {
  const mongoURI = process.env.MONGODB_URI;

  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log('Connected to mongo db!');
      createServer();
    })
    .catch((error) => {
      console.log('connection failed!!');
    });
};

connsectToMongoDB();
