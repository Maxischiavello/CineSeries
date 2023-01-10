const Movie = require("../models/Movie");

/**
 * Get movie by id
 */
const getMovie = async (req, res) => {
  try {
    let movie = await Movie.findOne({ _id: req.params.id });
    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json(error).send("There is no movie with this id");
  }
};

/**
 * Get all movies
 */
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(422).json({ msg: "Sorry, something went wrong" });
  }
};

/**
 * Create a movie
 */
const addMovie = async (req, res) => {
  try {
    let movie = await Movie.findOne({ _id: req.params.id });

    if (movie) {
      return res
        .status(409)
        .json({ msg: "A movie already exist with this id" });
    }

    movie = new Movie(req.body);

    await movie.save();

    res.status(201).json({
      msg: `Movie created`,
    });
  } catch (error) {
    console.log(error);
    res.status(422).json({ msg: "Sorry, something went wrong" });
  }
};

/**
 * Update movie by id
 */
const updateMovie = async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ msg: "Movie has been updated" });
  } catch (error) {
    res.status(422).json({ msg: "Sorry, something went wrong" });
  }
};

/**
 * Delete movie by id
 */
const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({ msg: "Movie has been deleted" });
  } catch (error) {
    res.status(404).json(error).send("There is no movie with this id");
  }
};

module.exports = {
  getAllMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
