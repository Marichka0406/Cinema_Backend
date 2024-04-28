const { Movie, Actor, Director, Genre, MovieActor, MovieDirector, MovieGenre } = require('../models/associations.js');

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      include: [
        {
          model: Actor,
          through: MovieActor,
          as: 'actors',
        },
        {
          model: Director,
          through: MovieDirector,
          as: 'directors',
        },
        {
          model: Genre,
          through: MovieGenre,
          as: 'genres',
        },
      ],
    });

    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while getting movies' });
  }
};

module.exports = {
  getAllMovies,
};
