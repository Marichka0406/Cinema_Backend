const fs = require('fs');
const { Movie, Actor, Director, Genre, MovieActor, MovieDirector, MovieGenre } = require('../models/associations.js');

const changeFile = async (req, res) => {
  try {
    // Читання вмісту файлу
    const rawData = fs.readFileSync('moviesDataSet.json');
    const dataArray = JSON.parse(rawData);

    // Перетворення кожного об'єкта зі старими полями в об'єкт з новими полями
    const updatedDataArray = dataArray.map(data => ({
      title: data.Series_Title,
      releaseDate: data.Released_Year,
      duration: data.Runtime,
      description: data.Overview,
      imageUrl: data.Poster_Link,
      genres: data.Genre ? data.Genre.includes(',') ? data.Genre.split(',').map(genre => genre.trim()) : [data.Genre] : [],
      actors: [data.Star1, data.Star2, data.Star3, data.Star4].filter(Boolean),
      directors: [data.Director].filter(Boolean)
    }));

    // Збереження оновленого масиву об'єктів у файл
    fs.writeFileSync('movies.json', JSON.stringify(updatedDataArray, null, 2));

    return res.status(200).json({ message: 'Файл успішно оновлено' });
  } catch (error) {
    console.error('Помилка: ', error);
    res.status(500).json({ message: 'Помилка' });
  }
};

const createMovies = async (req, res) => {
    try {
      const movies = req.body; // Отримуємо масив об'єктів фільмів з запиту
  
      // Перебираємо кожен фільм з масиву
      for (const movieData of movies) {
        const { title, releaseDate, duration, description, imageUrl, genres, actors, directors } = movieData;
  
        // Перевірка наявності фільму з такою самою назвою у базі даних
      const existingMovie = await Movie.findOne({ where: { title } });
        if (existingMovie) {
          continue; // Якщо фільм вже існує, переходимо до наступного фільму
        }
  
        // Перевірка наявності акторів, жанрів та режисерів у базі даних і їх створення, якщо не існують
        const existingActors = await Promise.all(actors.map(async (actorName) => {
          const [firstName, lastName] = actorName.split(' ');
          const existingActor = await Actor.findOne({ where: { first_name: firstName, last_name: lastName } });
          if (existingActor) {
            return existingActor;
          } else {
            return Actor.create({ first_name: firstName, last_name: lastName });
          }
        }));
        
        const existingDirectors = await Promise.all(directors.map(async (directorName) => {
          const [firstName, lastName] = directorName.split(' ');
          const existingDirector = await Director.findOne({ where: { first_name: firstName, last_name: lastName } });
          if (existingDirector) {
            return existingDirector;
          } else {
            return Director.create({ first_name: firstName, last_name: lastName });
          }
        }));
        
        const existingGenres = await Promise.all(genres.map(async (genreName) => {
          const existingGenre = await Genre.findOne({ where: { name: genreName } });
          if (existingGenre) {
            return existingGenre;
          } else {
            return Genre.create({ name: genreName });
          }
        }));
  
        // Створення нового фільму в базі даних
        const newMovie = await Movie.create({
          title,
          release_date: new Date(releaseDate).toISOString().slice(0, 10),
          duration,
          movie_image: imageUrl,
          description,
        });
  
        // Додавання акторів до фільму у проміжну таблицю MovieActor
        await Promise.all(existingActors.map(async (actor) => {
          await MovieActor.create({
            movie_id: newMovie.id,
            actor_id: actor.id,
          });
        }));
  
        // Додавання режисерів до фільму у проміжну таблицю MovieDirector
        await Promise.all(existingDirectors.map(async (director) => {
          await MovieDirector.create({
            movie_id: newMovie.id,
            director_id: director.id,
          });
        }));
  
        // Додавання жанрів до фільму у проміжну таблицю MovieGenre
        await Promise.all(existingGenres.map(async (genre) => {
          await MovieGenre.create({
            movie_id: newMovie.id,
            genre_id: genre.id,
          });
        }));
      }
  
      res.status(201).json({ message: 'Movies created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while creating movies' });
    }
  };
  



module.exports = { changeFile, createMovies };
