const express = require('express');
const router = express.Router();
const dataHandler = require('../../controllers/v1/parkings');
const multer = require('../../middlewares/multer');

router.route('/').get(dataHandler.list).post(dataHandler.create);

router
  .route('/:id')
  .get(dataHandler.one)
  .put(dataHandler.update)
  .delete(dataHandler.delete);

router
  .route('/:id/current')
  .post(multer.array('image', 1), dataHandler.current);

module.exports = router;
