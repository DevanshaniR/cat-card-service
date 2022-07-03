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

module.exports = {
  saveImage,
};
