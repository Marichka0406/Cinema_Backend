const { Director } = require('../models/associations.js');

const getAllDirectors = async (req, res) => {
  try {
    const directors = await Director.findAll();

    const responseBody = directors.map((director) => ({
      id: director.id,
      first_name: director.first_name,
      last_name: director.last_name,
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

const getDirectorById = async (req, res) => {
  try {
    const directorId = req.params.id;
    console.log(`Getting director with ID: ${directorId}`);

    if (isNaN(directorId)) {
      return res.status(400).json({
        error: "Invalid directorId. Must be a number.",
      });
    }

    const director = await Director.findByPk(directorId);

    if (!director) {
      return res.status(404).json({
        error: "Director not found.",
      });
    }
    const responseBody = {
      id: director.id,
      first_name: director.first_name,
      last_name: director.last_name,
    };

    res.status(200).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const createDirector = async (req, res) => {
  try {
    console.log("Creating a new director");
    console.log(req.body);
    const { first_name, last_name } = req.body;
    if (!first_name || !last_name) {
      return res.status(400).json({
        error: "Something is missing",
      });
    }

    const newDirector = await Director.create({
      first_name,
      last_name,
    });

    const responseBody = {
      id: newDirector.id,
      first_name: newDirector.first_name,
      last_name: newDirector.last_name,
    };

    res.status(201).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const deleteDirector = async (req, res) => {
  try {
    const directorId = req.params.id;
    const director = await Director.findByPk(directorId);
    if (!director) {
      return res.status(404).json("Director not found");
    }
    await director.destroy();
    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error("Error deleting director:", error);
    return res.status(500).json("Internal Server Error");
  }
};

const updateDirector = async (req, res) => {
  try {
    const directorId = req.params.id;
    const { first_name, last_name } = req.body;

    const director = await Director.findByPk(directorId);

    director.first_name = first_name;
    director.last_name = last_name;

    await director.save();

    return res.status(200).json({
      id: director.id,
      first_name: director.first_name,
      last_name: director.last_name,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllDirectors,
  getDirectorById,
  createDirector,
  deleteDirector,
  updateDirector,
};
