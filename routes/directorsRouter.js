const express = require('express');
const router = express.Router();

const directorController = require('../controllers/directorController.js');

router.route('/').get(directorController.getAllDirectors)


module.exports = router;