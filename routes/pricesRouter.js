const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');

// Маршрут для створення ціни
router.post('/', priceController.createPrice);

// Маршрут для оновлення ціни за ідентифікатором
router.put('/:id', priceController.updatePrice);

// Маршрут для видалення ціни за ідентифікатором
router.delete('/:id', priceController.deletePrice);

// Маршрут для отримання всіх цін
router.get('/', priceController.getAllPrices);

module.exports = router;
