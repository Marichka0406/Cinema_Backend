const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/', ticketController.createTicket); // Маршрут для отримання сеансів за ID фільму
router.get('/:screeningId', ticketController.getTicketsByScreeningId);

module.exports = router;
