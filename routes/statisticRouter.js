const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/staticticsController')

router.get('/', statisticsController.getTicketCountForLastMonth);

router.get('/ticket-count-per-movie', statisticsController.getTicketCountPerMovie);

router.get('/ticket-counts-by-time-of-day', statisticsController.getTicketCountsByTimeOfDay);

router.get('/total-revenue-last-month', statisticsController.getTotalRevenueLastMonth);

module.exports = router;
