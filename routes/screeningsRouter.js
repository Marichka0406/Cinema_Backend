const express = require('express');
const router = express.Router();
const screeningController = require('../controllers/screeningController');

// Маршрут для отримання всіх сеансів з відповідними об'єктами фільму та залу
router.get('/', screeningController.getAllScreenings);

// Маршрут для отримання сеансів за ID фільму
router.get('/:movieId', screeningController.getScreeningsByMovieId);

// Маршрут для створення нового сеансу
router.post('/', screeningController.createScreening);

// Маршрут для оновлення інформації про сеанс
router.put('/:id', screeningController.updateScreening);

// Маршрут для видалення сеансу
router.delete('/:id', screeningController.deleteScreening);

module.exports = router;
