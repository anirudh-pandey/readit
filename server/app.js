const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

const routes = require('./lib/routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(5000, () => console.log('Server has started on port 5000.'));
