const express = require('express');
const app = express();
const sequelize = require ('../Cinema_Backend/config/db.js')
const { logger } = require('./middleware/logger.js');
const errorHandler = require('./middleware/errorHandler')

app.use(express.json());
sequelize.sync();
app.use(logger);


app.use(errorHandler);

module.exports = app;