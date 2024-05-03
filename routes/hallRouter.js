const express = require('express');
const router = express.Router();
const hallController = require('../controllers/hallController');

router.get('/:screeningId', hallController.getHallInfoByScreeningId);
router.get('/:hallNumber', hallController.getHallByNumber);

module.exports = router;