require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/index');

// MongoDB options
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
};

// Connect To Database
let connectMongo = function () {
  return mongoose.connect(config.database, options, function (err) {
    if (err) {
      console.error(
        'Failed to connect to mongo on startup - retrying in 5 sec',
        err,
      );
      setTimeout(connectMongo, 5000);
    }
  });
};

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

connectMongo();

const app = express();

// Cors
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');

  if (req.method.toUpperCase() == 'OPTIONS') {
    res.status(200).send('OK');
  } else next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
require('./api/api_v1')(app);

// 500 Error
app.use(function (err, req, res, next) {
  if (err) {
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message || err });
    return;
  }
  next();
});

// Start Server
app.listen(config.port, () => {
  console.log('Server start at port ' + config.port);
});
