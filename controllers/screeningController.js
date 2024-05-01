const { Screening, Movie, Hall } = require('../models/associations.js');

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
  const { date, movieTitle } = req.query;

  try {
    const screening = await Screening.findOne({
      where: {
        date_time: new Date(date),
      },
      include: {
        model: Movie,
        where: {
          title: movieTitle,
        },
      },
    });

    res.json(screening);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while getting screening by date and movie title' });
  }
};

const createScreening = async (req, res) => {
  const { movie_id, hall_id, date_time } = req.body;

  try {
    const newScreening = await Screening.create({ movie_id, hall_id, date_time });
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
    const screening = await Screening.findByPk(id);
    if (!screening) {
      return res.status(404).json({ message: 'Screening not found' });
    }

    screening.movie_id = movie_id;
    screening.hall_id = hall_id;
    screening.date_time = date_time;

    await screening.save();

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

module.exports = {
  getScreeningsByMovieId,
  getScreeningByDateAndMovieTitle,
  createScreening,
  updateScreening,
  deleteScreening,
  getAllScreenings
};