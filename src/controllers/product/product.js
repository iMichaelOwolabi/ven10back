const { Pool } = require('pg');
const validateInput = require('../../utils/validate');

const connectionString = process.env.DATABASE_URL

  const pool = new Pool({
    connectionString,
  });
  
// Create product
const createProduct = async (req, res) => {

  let { name, description, price, category, image, color } = req.body;
  const isEmpty = validateInput.isEmpty(name, description, price, category, image, color);

  if (isEmpty) {
    return res.status(400).send({
      error: true,
      message: 'All fields are required'
    });
  }
  
  if (typeof price !== 'number') {
    return res.status(400).send({
      error: true,
      message: 'Price must be a valid number'
    });
  }

  // Sanitize data before saving into the database
  name = name.trim();
  description = description.trim();
  price = parseFloat(price, 10);
  category = category.trim();
  image = image.trim();
  color = color.trim();

  const insertQuery = 'INSERT INTO products(name, description, price, category, image, color) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
  const values = [name, description, price, category, image, color];

  try {
    const result = await pool.query(insertQuery, values);
    if (result) {
      return res.status(201).send({
        error: false,
        message: 'Product successfully created',
        data: result.rows
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
    const products = await pool.query(getAllProductsQuery);
    return res.status(200).send({
      error: false,
      message: 'Below are all the products',
      data: products.rows
    });
  } catch (error) {
    return res.status(500).send({
      error: true,
      message: 'Ooops! something went wrong. Try again later'
    });
  }
}

// Get a single product
const getSingleProduct = async (req, res) => {
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
    if (product.rows.length === 0) {
      return res.status(404).send({
        error: true,
        message: 'Product not found'
      });
    }

    return res.status(200).send({
      error: false,
      message: 'Below is the product',
      data: product.rows
    });
  } catch (error) {
    return res.status(500).send({
      error: true,
      message: 'Ooops! something went wrong. Try again later'
    });
  }
}

  // Get a single product
const getLastAddedProduct = async (req, res) => {
  
  const getLastProductQuery = `SELECT * FROM products ORDER BY id DESC LIMIT 1`;

  try {
    const lastAddedroduct = await pool.query(getLastProductQuery);

    return res.status(200).send({
      error: false,
      message: 'Recently added product',
      data: lastAddedroduct.rows
    });
  } catch (error) {
    return res.status(500).send({
      error: true,
      message: 'Ooops! something went wrong. Try again later0000000',
      error
    });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  getLastAddedProduct
}
