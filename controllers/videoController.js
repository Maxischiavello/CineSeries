const Video = require("../models/Video");

/**
 * Get video by id
 */
const getVideo = async (req, res) => {
  try {
    let video = await Video.findOne({ _id: req.params.id });
    res.status(200).json(video);
  } catch (error) {
    res.status(404).json(error).send("There is no video with this id");
  }
};

/**
 * Get all videos
 */
const getAllVideos = async (req, res) => {
  try {
    const video = await Video.find();
    res.status(200).json(video);
  } catch (error) {
    res.status(422).json({ msg: "Sorry, something went wrong" });
  }
};

/**
 * Create a video
 */
const addVideo = async (req, res) => {
  try {
    let video = await Video.findOne({ _id: req.params.id });

    if (video) {
      return res
        .status(409)
        .json({ msg: "A video already exist with this id" });
    }

    video = new Video(req.body);

    await video.save();

    res.status(201).json({
      msg: `Video created`,
    });
  } catch (error) {
    console.log(error);
    res.status(422).json({ msg: "Sorry, something went wrong" });
  }
};

/**
 * Update video by id
 */
const updateVideo = async (req, res) => {
  try {
    await Video.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ msg: "Video has been updated" });
  } catch (error) {
    res.status(422).json({ msg: "Sorry, something went wrong" });
  }
};

/**
 * Delete video by id
 */
const deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({ msg: "Video has been deleted" });
  } catch (error) {
    res.status(404).json(error).send("There is no video with this id");
  }
};

module.exports = {
  getAllVideos,
  getVideo,
  addVideo,
  updateVideo,
  deleteVideo,
};
