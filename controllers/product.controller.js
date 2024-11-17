const Product = require('../models/product.model');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ deleted: false });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const getProductByName = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Product name is required' });
    }

    const product = await Product.findOne({ name, deleted: false });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error('Error finding product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Product id is required' });
    }

    const product = await Product.findOne({ _id: id, deleted: false });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error('Error finding product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addProduct = async (req, res) => {
  const product = req.body;
  console.log('Received request to add product :', product);
  if (product?.name && product?.quantity && product?.price) {
    try {
      const product = await Product.create(req.body);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error?.message });
    }
  } else {
    res.status(400).json({ message: 'Invalid input!' });
  }
};

const deleteProductByName = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Product name is required' });
    }

    // Find the product by name and update the `deleted` field to `true`
    const updatedProduct = await Product.findOneAndUpdate(
      { name },
      { deleted: true },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res
      .status(200)
      .json({ message: 'Product marked as deleted', product: updatedProduct });
  } catch (err) {
    console.error('Error marking product as deleted:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllProducts,
  getProductByName,
  getProductById,
  addProduct,
  deleteProductByName,
};
