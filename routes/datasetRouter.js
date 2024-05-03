const express = require('express');
const router = express.Router();

const datasetController = require('../controllers/datasetCotroller');

router.route('/').get(datasetController.changeFile)
router.route('/').post(datasetController.createMovies)


module.exports = router;