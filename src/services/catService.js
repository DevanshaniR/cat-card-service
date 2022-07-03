const log4js = require("log4js");

let log = log4js.getLogger("cat_card_service");
const Model = require("../models/model");

saveImages = async function (request_body) {
  try {
    log.info("Initiated to save images");
    const data = new Model({
      image: request_body.image,
      image_text: request_body.image_text,
      width: request_body.width,
      height: request_body.height,
    });
    const dataToSave = await data.save();
    return dataToSave;
  } catch (e) {
    log.info("Error while save image :: Exception", e);
    throw Error("Error while save image");
  }
};

module.exports = {
  saveImages,
};
