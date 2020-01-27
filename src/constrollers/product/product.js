const { Pool } = require('pg');
const pool = new Pool;

// Create product controller
const createProduct = async (req, res) => {
  const { name, description, price, category, image, color } = req.body;
  name = name.trim()
  description.trim()
  price.trim()
  category.trim()
  image.trim()
  color.trim()
  if (!name || !description || !price || !category || !image || !color) {
    return res.status(400).send({
      error: true,
      message: 'All fields are required'
    });
  }

  if (typeof price !== Number) {
    return res.status(400).send({
      error: true,
      message: 'Price must be a valid number'
    });
  }

  const insertQuery = 'INSERT INTO products(name, description, price, category, image, color) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
  const values = [name, description, price, category, image, color]

  try {
    const result = await pool.query(insertQuery, values);
    if (result) {
      return res.status(201).send({
        error: false,
        message: 'Product successfully created',
        data: result
      });
    }
  } catch (error) {
    return res.status(500).send({
      error: true,
      message: 'Ooops! something went wrong. Try again later'
    });
  }
}

// Get all products
const getAllProducts = async (req, res) => {
  const getAllProductsQuery = `SELECT id, name, price FROM products`;
  try {
    const products = pool.query(getQuery);
    return res.status(200).send({
      error: false,
      message: 'Below are all the products',
      data: products
    });
  } catch (error) {
    return res.status(500).send({
      error: true,
      message: 'Ooops! something went wrong. Try again later'
    });
  }
}

// Get a single product
const getSingleProduct = async () => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({
      error: true,
      message: 'Product id is required'
    });
  }
  const getSingleProductQuery = `SELECT * FROM products WHERE id = $1`;
  const values = [id];

  try {
    const product = await pool.query(getSingleProductQuery, values);
    if (product.length === 0) {
      return res.status(404).send({
        error: true,
        message: 'Product not found'
      });
    }

    return res.status(200).send({
      error: false,
      message: 'Below is the product',
      data: product
    });
  } catch (error) {
    return res.status(500).send({
      error: true,
      message: 'Ooops! something went wrong. Try again later'
    });
  }

}

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct
}
