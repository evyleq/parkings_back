const express = require('express');
const router = express.Router();
const dataHandler = require('../../controllers/{{version}}/{{name}}');

router.route('/')
    .get(dataHandler.list)
    .post(dataHandler.create);

router.route('/:id')
    .get(dataHandler.one)
    .put(dataHandler.update)
    .delete(dataHandler.delete);


module.exports = router;