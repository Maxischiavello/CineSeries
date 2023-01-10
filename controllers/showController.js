const Show = require("../models/Show");

/**
 * Get show by id
 */
const getShow = async (req, res) => {
  try {
    let show = await Show.findOne({ _id: req.params.id });
    res.status(200).json(show);
  } catch (error) {
    res.status(404).json(error).send("There is no show with this id");
  }
};

/**
 * Get all shows
 */
const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find();
    res.status(200).json(shows);
  } catch (error) {
    res.status(422).json({ msg: "Sorry, something went wrong" });
  }
};

/**
 * Create a show
 */
const addShow = async (req, res) => {
  try {
    let show = await Show.findOne({ _id: req.params.id });

    if (show) {
      return res.status(409).json({ msg: "A show already exist with this id" });
    }

    show = new Show(req.body);

    await show.save();

    res.status(201).json({
      msg: `Show created`,
    });
  } catch (error) {
    console.log(error);
    res.status(422).json({ msg: "Sorry, something went wrong" });
  }
};

/**
 * Update show by id
 */
const updateShow = async (req, res) => {
  try {
    await Show.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ msg: "Show has been updated" });
  } catch (error) {
    res.status(422).json({ msg: "Sorry, something went wrong" });
  }
};

/**
 * Delete show by id
 */
const deleteShow = async (req, res) => {
  try {
    await Show.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({ msg: "Show has been deleted" });
  } catch (error) {
    res.status(404).json(error).send("There is no show with this id");
  }
};

module.exports = {
  getAllShows,
  getShow,
  addShow,
  updateShow,
  deleteShow,
};
