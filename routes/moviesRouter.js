const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController.js');

router.route('/').get(movieController.getAllMovies).post(movieController.createMovie)
router.route('/:id').delete(movieController.deleteMovie).put(movieController.updateMovie)
router.get('/titles', movieController.getAllMovieTitles);

module.exports = router;
