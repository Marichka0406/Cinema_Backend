const express = require('express');
const router = express.Router();
const { getHallInfoByScreeningId } = require('../controllers/hallController');

router.get('/:screeningId', getHallInfoByScreeningId);

module.exports = router;