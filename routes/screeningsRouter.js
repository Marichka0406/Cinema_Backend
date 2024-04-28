const express = require('express');
const router = express.Router();
const screeningController = require('../controllers/screeningController');

router.get('/:movieId', screeningController.getScreeningsByMovieId); // Маршрут для отримання сеансів за ID фільму

module.exports = router;
