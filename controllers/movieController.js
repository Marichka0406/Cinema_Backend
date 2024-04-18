const Movie = require('../models/movieModel.js');

const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();

        const responseBody = movies.map((movie) => ({
            id: movie.id,
            title: movie.title,
            description: movie.description,
            duration: movie.duration,
            release_date: movie.release_date
        }));

        res.status(200).json(responseBody);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};

const getMovieById = async (req, res) => {
    try {
        const movieId = req.params.id;
        console.log(`Getting movie with ID: ${movieId}`);

        if (isNaN(movieId)) {
            return res.status(400).json({
                error: 'Invalid movieId. Must be a number.'
            });
        }

        const movie = await Movie.findByPk(movieId);

        if (!movie) {
            return res.status(404).json({
                error: 'Movie not found.'
            });
        }
        const responseBody = {
            id: movie.id,
            title: movie.title,
            description: movie.description,
            duration: movie.duration,
            release_date: movie.release_date
        };

        res.status(200).json(responseBody);
    } catch (error) {

        console.error('Error:', error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

const createMovie = async (req, res) => {
    try {
        console.log('Creating a new movie');
        console.log(req.body);
        const { title, description, duration, release_date } = req.body;
        if (!title || !description || !duration || !release_date) {
            return res.status(400).json({
                error: 'One or more required fields are missing'
            });
        }

        const newMovie = await Movie.create({
            title,
            description,
            duration,
            release_date
        });

        const responseBody = {
            id: newMovie.id,
            title: newMovie.title,
            description: newMovie.description,
            duration: newMovie.duration,
            release_date: newMovie.release_date
        };

        res.status(201).json(responseBody);

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await Movie.findByPk(movieId);
        if (!movie) {
            return res.status(404).json('Movie not found');
        }
        await movie.destroy();
        return res.status(204).json('Successfully deleted');
    } catch (error) {
        console.error('Error deleting movie:', error);
        return res.status(500).json('Internal Server Error');
    }

};

const updateMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const { title, description, duration, release_date } = req.body;

        const movie = await Movie.findByPk(movieId);

        movie.title = title;
        movie.description = description;
        movie.duration = duration;
        movie.release_date = release_date;

        await movie.save();

        return res.status(200).json({
            id: movie.id,
            title: movie.title,
            description: movie.description,
            duration: movie.duration,
            release_date: movie.release_date
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    deleteMovie,
    updateMovie
};
