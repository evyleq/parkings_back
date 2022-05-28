module.exports = function (app) {
  app.use('/api/v1/parkings', require('../routes/v1/parkings'));
  app.use('/api/v1/logs', require('../routes/v1/logs'));
};
