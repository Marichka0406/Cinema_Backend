const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController.js');

router.route('/').get(movieController.getAllMovies)


module.exports = router;
