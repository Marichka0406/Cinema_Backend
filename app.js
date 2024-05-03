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
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

sequelize.sync();
app.use(logger);

const authRouter = require('./routes/loginRouter.js');
const moviesRouter = require('./routes/moviesRouter.js');
const screeningsRouter = require('./routes/screeningsRouter.js'); 
const hallRouter = require('./routes/hallRouter.js');
const ticketRouter = require('./routes/ticketRouter.js');
const actorsRouter = require('./routes/actorsRouter.js');
const directorsRouter = require('./routes/directorsRouter.js');
const genresRouter = require('./routes/genresRouter.js');
const statisticRouter = require('./routes/statisticRouter.js');
const pricesRouter = require('./routes/pricesRouter.js');
const rowsRouter = require('./routes/rowsRouter.js');
const datasetRouter = require('./routes/datasetRouter.js');

app.use('/auth', authRouter);
app.use('/movies', moviesRouter);
app.use('/actors', actorsRouter);
app.use('/directors', directorsRouter);
app.use('/genres', genresRouter);
app.use('/screenings', screeningsRouter);
app.use('/hall', hallRouter);
app.use('/tickets', ticketRouter);
app.use('/statistics', statisticRouter);
app.use('/prices', pricesRouter);
app.use('/rows', rowsRouter);
app.use('/dataset', datasetRouter);
 

app.use(errorHandler);

module.exports = app;