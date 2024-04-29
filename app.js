const express = require('express');
const cors = require('cors'); 
const app = express();
const bodyParser = require("body-parser");
const sequelize = require('../Cinema_Backend/config/db.js');
const { logger } = require('./middleware/logger.js');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

sequelize.sync();
app.use(logger);

const authRouter = require('./routes/loginRouter.js');
const moviesRouter = require('./routes/moviesRouter.js');
const screeningsRouter = require('./routes/screeningsRouter.js'); 
const hallRouter = require('./routes/hallRouter.js');

app.use('/auth', authRouter);
app.use('/movies', moviesRouter);
app.use('/screenings', screeningsRouter);
app.use('/hall', hallRouter);
 

app.use(errorHandler);

module.exports = app;