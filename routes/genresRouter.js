const express = require('express');
const router = express.Router();

const genreController = require('../controllers/genreController.js');

router.route('/').get(genreController.getAllGenres)


module.exports = router;