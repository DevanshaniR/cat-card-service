const log4js = require("log4js");

let log = log4js.getLogger("cat_card_service");

const CatService = require("../services/catService");

// SAVE SAMPLE IMAGES
const saveImage = async (req, res, next) => {
  try {
    const dataToSave = await CatService.saveImages(req.body);
    log.info("image data update success");
    res.status(200).json(dataToSave);
  } catch (error) {
    log.error("image data update exception", error.message);
    res.status(400).json({ message: error.message });
  }
};

// BLEND IMAGES
// images which needs to blend taken in the request body as an array and fetch the matching images from DB
// so we can get rid from multiple API calls to fetch images with custom texts

const blendImages = async (req, res, next) => {
  try {
    const image_list = req.body.image_list;
    const isSaved = await CatService.blendImages(image_list);
    log.info("image data blend success");
    res.status(200).json({ success: isSaved, message: "saved successfully" });
  } catch (error) {
    log.error("blend image update exception", error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  saveImage,
  blendImages,
};
