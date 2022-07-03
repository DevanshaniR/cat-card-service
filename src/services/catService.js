const blend = require("@mapbox/blend");
const { writeFile } = require("fs");
const log4js = require("log4js");

let log = log4js.getLogger("cat_card_service");
const Model = require("../models/model");

const BLEND_WIDTH = 400;
const BLEND_HEIGHT = 500;

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

blendImages = async function (image_list) {
  try {
    log.info("initiated :: blend");
    const image_data = await Model.find(
      { image_text: { $in: image_list } },
      { _id: false, __v: false }
    ).select(["image", "width", "height"]);
    return await bindImages(image_data);
  } catch (e) {
    log.info("Error while blend image :: Exception", e);
    throw Error("Error while blend image");
  }
};

bindImages = async function (image_data) {
  let blend_data = [];
  for (let i = 0; i < image_data.length; i++) {
    const image_object = image_data[i];
    let blend_object = {};
    blend_object.buffer = Buffer.from(image_object.image, "binary");
    blend_object.x = i * image_object.width;
    blend_object.y = 0;
    blend_data.push(blend_object);
  }
  blend(
    blend_data,
    {
      width: BLEND_WIDTH * 2,
      height: BLEND_HEIGHT,
      format: "jpeg",
    },
    function (err, data) {
      const fileOut = join(process.cwd(), `/cat-card.jpg`);
      writeFile(fileOut, data, "binary", (err) => {
        if (err) {
          log.info("blend and save failed", err);
          return false;
        }
        log.info("blend and save success");
        return true;
      });
    }
  );
};

module.exports = {
  saveImages,
  blendImages,
};
