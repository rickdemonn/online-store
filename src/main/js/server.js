const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const categories = require('../../../categories.json');
const products = require('../../../products.json');
const comments = require('../../../comments.json');

app.listen(port, () => {
 console.log('We live on ' + port);
});

app.use(cors());

app.get('/categories', (req, res) => {
    res.send(categories);
});

app.get('/products', (req, res) => {
    res.send(products);
});

app.get('/comments', (req, res) => {
    res.send(comments);
});