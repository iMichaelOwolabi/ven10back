const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct } = require('../controllers/product/product');

// Products route
router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getSingleProduct);

module.exports = router;
