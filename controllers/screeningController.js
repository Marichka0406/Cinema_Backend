
const { Screening, Movie, Hall, Price, Seat, Row, Ticket } = require('../models/associations.js');
const sequelize = require('../config/db.js');
const moment = require('moment');
const { Sequelize } = require('sequelize');

const getScreeningsByMovieId = async (req, res) => {
  const { movieId } = req.params;

  try {
    const screenings = await Screening.findAll({
      where: { movie_id: movieId },
    });

    res.json(screenings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while getting screenings by movie ID' });
  }
};

const getScreeningByDateAndMovieTitle = async (req, res) => {
  const { date, movieTitle } = req.body;
  
  try {
    // Перевірка, чи отримані коректні дані
    const parsedDate = new Date(date).toISOString()
   
    // Пошук за датою та назвою фільму
    const screening = await Screening.findOne({
      where: {
        date_time: parsedDate,
      },
      include: {
        model: Movie,
        where: {
          title: movieTitle,
        },
      },
    });

    // Перевірка на знайдення запису
    if (!screening) {
      return res.status(404).json({ message: 'Screening not found' });
    }

    // Відправлення знайденого запису
    res.json(screening);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while getting screening by date and movie title' });
  }
};

const createScreening = async (req, res) => {
  const { movie_id, hall_id, date_time } = req.body;

  try {
    // Створення нового сеансу
    const newScreening = await Screening.create({ movie_id, hall_id, date_time });

    // Отримання всіх рядів у залі
    const rows = await Row.findAll({ where: { hall_id } });

    // Створення ціни за замовчуванням для кожного ряду
    const prices = rows.map((row) => ({
      screening_id: newScreening.id,
      row_id: row.id,
      value: 0, // Встановіть значення ціни за замовчуванням
    }));

    // Створення цін за замовчуванням для всіх рядів у залі
    await Price.bulkCreate(prices);

    res.status(201).json(newScreening);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while creating screening' });
  }
};


const updateScreening = async (req, res) => {
  const { id } = req.params;
  const { movie_id, hall_id, date_time } = req.body;

  try {
    const screening = await Screening.findByPk(id, {
      include: [{ model: Price }],
    });
    if (!screening) {
      return res.status(404).json({ message: 'Screening not found' });
    }

    // Видалення всіх цін, які посилаються на старий фільм
    await Price.destroy({ where: { screening_id: screening.id } });

    // Оновлення даних сеансу
    screening.movie_id = movie_id;
    screening.hall_id = hall_id;
    screening.date_time = date_time;

    // Збереження оновленого сеансу
    await screening.save();

    // Отримання всіх рядів у залі
    const rows = await Row.findAll({ where: { hall_id } });

    // Створення ціни за замовчуванням для кожного ряду
    const prices = rows.map((row) => ({
      screening_id: screening.id,
      row_id: row.id,
      price: 0, // Встановіть значення ціни за замовчуванням
    }));

    // Створення цін за замовчуванням для всіх рядів у залі
    await Price.bulkCreate(prices);

    res.json(screening);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while updating screening' });
  }
};



const deleteScreening = async (req, res) => {
  const { id } = req.params;

  try {
    const screening = await Screening.findByPk(id);
    if (!screening) {
      return res.status(404).json({ message: 'Screening not found' });
    }

    await Ticket.destroy({ where: { screening_id: screening.id } });
    await Price.destroy({ where: { screening_id: screening.id } });

    await screening.destroy();

    res.json({ message: 'Screening deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while deleting screening' });
  }
};

const getAllScreenings = async (req, res) => {
  try {
    const screenings = await Screening.findAll({
      include: [
        {
          model: Movie,
          attributes: ['id', 'title'],
        },
        {
          model: Hall,
          attributes: ['id', 'name'],
        },
      ],
    });

    res.json(screenings);
  } catch (error) {
    console.error('Error fetching screenings:', error);
    res.status(500).json({ message: 'Error fetching screenings' });
  }
};

const getScreeningDatesByMovieTitle = async (req, res) => {
  const { movieTitle } = req.body; 

  try {
    const screenings = await Screening.findAll({
      attributes: ['id', 'date_time'], 
      include: {
        model: Movie,
        where: {
          title: movieTitle,
        },
      },
    });

    const screeningDates = screenings.map(screening => ({
      id: screening.id,
      date: screening.date_time,
    }));

    res.json(screeningDates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while getting screening dates by movie title' });
  }
};

module.exports = {
  getScreeningsByMovieId,
  getScreeningByDateAndMovieTitle,
  createScreening,
  updateScreening,
  deleteScreening,
  getAllScreenings,
  getScreeningDatesByMovieTitle
};