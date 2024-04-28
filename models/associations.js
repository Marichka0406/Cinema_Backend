const Movie = require('./movieModel.js');
const Actor = require('./actorModel.js');
const Director = require('./directorModel.js');
const Genre = require('./genreModel.js');
const MovieActor = require('./movieActorModel.js');
const MovieDirector = require('./movieDirectorModel.js');
const MovieGenre = require('./movieGenreModel.js');
const Screening = require('./screeningModel.js');

// Описуємо зв'язки
Movie.belongsToMany(Actor, { through: MovieActor, foreignKey: 'movie_id' });
Movie.belongsToMany(Director, { through: MovieDirector, foreignKey: 'movie_id' });
Movie.belongsToMany(Genre, { through: MovieGenre, foreignKey: 'movie_id' });
Movie.hasMany(Screening, { as: 'screenings', foreignKey: 'movie_id' });

// Актор може брати участь у багатьох фільмах
Actor.belongsToMany(Movie, { through: MovieActor, foreignKey: 'actor_id' });

// Режисер може брати участь у багатьох фільмах
Director.belongsToMany(Movie, { through: MovieDirector, foreignKey: 'director_id' });

// Жанр може бути присутнім у багатьох фільмах
Genre.belongsToMany(Movie, { through: MovieGenre, foreignKey: 'genre_id' });

Screening.belongsTo(Movie, { foreignKey: "movie_id" });

module.exports = {
  Movie,
  Actor,
  Director,
  Genre,
  MovieActor,
  MovieDirector,
  MovieGenre,
  Screening
};
