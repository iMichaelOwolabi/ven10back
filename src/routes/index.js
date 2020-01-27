const express = require('express');
const router = express.Router();
const product = require('./product')

router.use('/', product);

router.use('*', (req, res) => {
  res.status(404).send({
    error: true,
    message: 'page not found',
  });
});

module.exports = router;
