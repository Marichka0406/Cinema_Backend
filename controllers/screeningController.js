const { Screening } = require('../models/associations.js');

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

module.exports = {
  getScreeningsByMovieId,
};