const { Movie, Actor, Director, Genre, MovieActor, MovieDirector, MovieGenre, Screening} = require('../models/associations.js');

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
        {
          model: Screening, 
          as: 'screenings', 
        }
      ],
    });

    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while getting movies' });
  }
};

const createMovie = async (req, res) => {
  try {
    const { title, releaseDate, duration, description, imageUrl, genres, actors, directors } = req.body;

    // Створення нового фільму в базі даних
    const newMovie = await Movie.create({
      title,
      release_date:releaseDate,
      duration,
      movie_image:imageUrl,
      description:description
    });

    // Додавання акторів до фільму у проміжну таблицю MovieActor
    await Promise.all(actors.map(async (actorId) => {
      await MovieActor.create({
        movie_id: newMovie.id,
        actor_id: actorId,
      });
    }));

    // Додавання режисерів до фільму у проміжну таблицю MovieDirector
    await Promise.all(directors.map(async (directorId) => {
      await MovieDirector.create({
        movie_id: newMovie.id,
        director_id: directorId,
      });
    }));

    // Додавання жанрів до фільму у проміжну таблицю MovieGenre
    await Promise.all(genres.map(async (genreId) => {
      await MovieGenre.create({
        movie_id: newMovie.id,
        genre_id: genreId,
      });
    }));

    res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while creating movie' });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, releaseDate, duration, description, imageUrl, genres, actors, directors } = req.body;

    // Оновлення фільму за його ідентифікатором
    const updatedMovie = await Movie.findByPk(id);
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Оновлення основних властивостей фільму
    updatedMovie.title = title;
    updatedMovie.release_date = releaseDate;
    updatedMovie.duration = duration;
    updatedMovie.movie_image = imageUrl;
    updatedMovie.description = description;

    // Збереження змін у фільмі
    await updatedMovie.save();

    // Оновлення зв'язків з акторами
    await MovieActor.destroy({ where: { movie_id: id } });
    await Promise.all(actors.map(async (actorId) => {
      await MovieActor.create({
        movie_id: updatedMovie.id,
        actor_id: actorId,
      });
    }));

    // Оновлення зв'язків з режисерами
    await MovieDirector.destroy({ where: { movie_id: id } });
    await Promise.all(directors.map(async (directorId) => {
      await MovieDirector.create({
        movie_id: updatedMovie.id,
        director_id: directorId,
      });
    }));

    // Оновлення зв'язків з жанрами
    await MovieGenre.destroy({ where: { movie_id: id } });
    await Promise.all(genres.map(async (genreId) => {
      await MovieGenre.create({
        movie_id: updatedMovie.id,
        genre_id: genreId,
      });
    }));

    res.status(200).json({ message: 'Movie updated successfully', movie: updatedMovie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while updating movie' });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movieToDelete = await Movie.findByPk(id);
    if (!movieToDelete) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    await movieToDelete.destroy();
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while deleting movie' });
  }
};

module.exports = {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie
};

