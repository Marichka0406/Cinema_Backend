const { Genre } = require('../models/associations');

const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();

    const responseBody = genres.map((genre) => ({
      id: genre.id,
      name: genre.name,
    }));

    res.status(200).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const getGenreById = async (req, res) => {
  try {
    const genreId = req.params.id;
    console.log(`Getting genre with ID: ${genreId}`);

    if (isNaN(genreId)) {
      return res.status(400).json({
        error: "Invalid genreId. Must be a number.",
      });
    }

    const genre = await Genre.findByPk(genreId);

    if (!genre) {
      return res.status(404).json({
        error: "Genre not found.",
      });
    }
    const responseBody = {
      id: genre.id,
      name: genre.name,
    };

    res.status(200).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const createGenre = async (req, res) => {
  try {
    console.log("Creating a new genre");
    console.log(req.body);
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        error: "Genre name is missing",
      });
    }

    const newGenre = await Genre.create({
      name,
    });

    const responseBody = {
      id: newGenre.id,
      name: newGenre.name,
    };

    res.status(201).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const deleteGenre = async (req, res) => {
  try {
    const genreId = req.params.id;
    const genre = await Genre.findByPk(genreId);
    if (!genre) {
      return res.status(404).json("Genre not found");
    }
    await genre.destroy();
    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error("Error deleting genre:", error);
    return res.status(500).json("Internal Server Error");
  }
};

const updateGenre = async (req, res) => {
  try {
    const genreId = req.params.id;
    const { name } = req.body;

    const genre = await Genre.findByPk(genreId);

    genre.name = name;

    await genre.save();

    return res.status(200).json({
      id: genre.id,
      name: genre.name,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllGenres,
  getGenreById,
  createGenre,
  deleteGenre,
  updateGenre,
};
