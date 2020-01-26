const { Pool } = require('pg')
require('dotenv').config();

const connectionString = process.env.DATABASE_URL

try {
  const pool = new Pool({
    connectionString,
  })
  pool.on('connect', () => {
    console.log('Database connected')
  })

  // Create the products table
  pool.query(
    `CREATE TABLE IF NOT EXISTS
    products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(128) NOT NULL,
      description VARCHAR(250) NOT NULL,
      price NUMERIC NOT NULL,
      category VARCHAR(250) NOT NULL,
      image VARCHAR(250) NOT NULL,
      color VARCHAR(250) NOT NULL
    )`
  )
} catch (error) {
    console.log(error)
}
