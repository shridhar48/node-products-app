const express = require('express');

const {
  getAllProducts,
  getProductByName,
  getProductById,
  addProduct,
  deleteProductByName,
} = require('../controllers/product.controller');

const productRouter = express.Router();

productRouter.get('/', getAllProducts);

productRouter.get('/getProductByName', getProductByName);

productRouter.get('/getProductById', getProductById);

productRouter.post('/addProduct', addProduct);

productRouter.put('/deleteProductByName', deleteProductByName);

module.exports = productRouter;
