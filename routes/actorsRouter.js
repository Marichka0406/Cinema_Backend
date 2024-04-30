const express = require('express');
const router = express.Router();

const actorController = require('../controllers/actorController.js');

router.route('/').get(actorController.getAllActors)


module.exports = router;