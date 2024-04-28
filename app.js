const express = require('express');
const cors = require('cors'); 
const app = express()
const sequelize = require ('../Cinema_Backend/config/db.js')
const { logger } = require('./middleware/logger.js')
const errorHandler = require('./middleware/errorHandler')

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
  }));
sequelize.sync()
app.use(logger)


const moviesRouter = require('./routes/moviesRouter.js');
app.use('/movies', moviesRouter);

app.use(errorHandler)

module.exports = app