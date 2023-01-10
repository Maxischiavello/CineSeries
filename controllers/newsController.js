const News = require("../models/News");

/**
 * Get news by id
 */
const getNews = async (req, res) => {
  try {
    let news = await News.findOne({ _id: req.params.id });
    res.status(200).json(news);
  } catch (error) {
    res.status(404).json(error).send("There is no news with this id");
  }
};

/**
 * Get all news
 */
const getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (error) {
    res.status(422).json({ msg: "Sorry, something went wrong" });
  }
};

/**
 * Create news
 */
const addNews = async (req, res) => {
  try {
    let news = await News.findOne({ _id: req.params.id });

    if (news) {
      return res.status(409).json({ msg: "News already exist with this id" });
    }

    news = new News(req.body);

    await news.save();

    res.status(201).json({
      msg: `News created`,
    });
  } catch (error) {
    console.log(error);
    res.status(422).json({ msg: "Sorry, something went wrong" });
  }
};

/**
 * Update news by id
 */
const updateNews = async (req, res) => {
  try {
    await News.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ msg: "News has been updated" });
  } catch (error) {
    res.status(422).json({ msg: "Sorry, something went wrong" });
  }
};

/**
 * Delete news by id
 */
const deleteNews = async (req, res) => {
  try {
    await News.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({ msg: "News has been deleted" });
  } catch (error) {
    res.status(404).json(error).send("There is no news with this id");
  }
};

module.exports = {
  getAllNews,
  getNews,
  addNews,
  updateNews,
  deleteNews,
};
