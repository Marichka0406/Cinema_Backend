const { Movie, Actor, Director, Genre, MovieActor, MovieDirector, MovieGenre, Screening, Ticket, Price} = require('../models/associations.js');

const getAllMovieTitles = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      attributes: ['id', 'title'],
    });

    const movieData = movies.map(movie => ({
      id: movie.id,
      title: movie.title
    }));

    res.json(movieData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while getting movie titles' });
  }
};

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

    // Знайти фільм за його ID
    const movieToDelete = await Movie.findByPk(id);
    if (!movieToDelete) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Знайдемо всі пов'язані записи у таблицях, що мають зв'язок з фільмами
    await Promise.all([
      MovieDirector.destroy({ where: { movie_id: id } }),
      MovieGenre.destroy({ where: { movie_id: id } }),
      MovieActor.destroy({ where: { movie_id: id } }),
    ]);

    // Пройтися по всіх сеансах фільму та видалити всі пов'язані квитки
    const screenings = await Screening.findAll({ where: { movie_id: id } });
    await Promise.all(screenings.map(async (screening) => {
      await Ticket.destroy({ where: { screening_id: screening.id } });
      await Price.destroy({ where: { screening_id: screening.id } });
    }));
 
    // Потім видалити всі сеанси
    await Screening.destroy({ where: { movie_id: id } });

    // Видалити сам фільм
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
  deleteMovie,
  getAllMovieTitles
};

