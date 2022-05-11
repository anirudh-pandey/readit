const express = require('express'),
app = express();
 

const consumerController = require('../controllers/consumer-controller');

app.post('/', consumerController.registerConsumer);
app.get('/:id', consumerController.printKey);

module.exports = app;