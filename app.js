const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors')
const routes = require('./src/routes/index');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h2>Welcome to Ven10 Api</h2>');
});

app.use(routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
