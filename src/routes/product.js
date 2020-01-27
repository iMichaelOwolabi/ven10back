const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  getLastAddedProduct } = require('../controllers/product/product');

// Products route
router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/last', getLastAddedProduct);
router.get('/products/:id', getSingleProduct);

module.exports = router;
