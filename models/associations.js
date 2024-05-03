const Movie = require('./movieModel.js');
const Actor = require('./actorModel.js');
const Director = require('./directorModel.js');
const Genre = require('./genreModel.js');
const MovieActor = require('./movieActorModel.js');
const MovieDirector = require('./movieDirectorModel.js');
const MovieGenre = require('./movieGenreModel.js');
const Screening = require('./screeningModel.js');
const User = require('./userModel.js');
const UserRole = require('./userRoleModel.js');
const Ticket = require('./ticketModel.js');
const Seat = require('./seatModel.js');
const Row = require('./rowModel.js');
const Hall = require('./hallModel.js');
const Price = require('./priceModel.js');

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

// Кожний сеанс пов'язаний з фільмом
Screening.belongsTo(Movie, { foreignKey: "movie_id" });
Screening.belongsTo(Hall, { foreignKey: "hall_id" });
Screening.hasMany(Price, { foreignKey: 'screening_id' });

// Тикет пов'язаний з сеансом і місцем
Ticket.belongsTo(Screening, { foreignKey: 'screening_id' });
Ticket.belongsTo(Seat, { foreignKey: 'seat_id' });

// Місце пов'язане з рядом і залом
Hall.hasMany(Row, { foreignKey: 'hall_id' });
Seat.belongsTo(Row, { foreignKey: 'row_id' });
Row.belongsTo(Hall, { foreignKey: 'hall_id' });

// Ціна пов'язана з рядом і сеансом
Price.belongsTo(Row, { foreignKey: 'row_id' });
Price.belongsTo(Screening, { foreignKey: 'screening_id' });

// Користувач пов'язаний з ролями користувачів
User.belongsTo(UserRole, { foreignKey: 'user_role_id' });
UserRole.hasMany(User, { foreignKey: 'user_role_id' });

module.exports = {
  Movie,
  Actor,
  Director,
  Genre,
  MovieActor,
  MovieDirector,
  MovieGenre,
  Screening,
  User,
  UserRole,
  Ticket,
  Seat,
  Row,
  Hall,
  Price
};
