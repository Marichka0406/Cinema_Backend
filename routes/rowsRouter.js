const express = require('express');
const router = express.Router();
const rowController = require('../controllers/rowController');

router.get('/:number', rowController.getRowByNumber); 

module.exports = router;