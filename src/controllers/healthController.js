const log4js = require("log4js");
let log = log4js.getLogger("cat_card_service");

const health = (req, res, next) => {
  log.info("Application is up and running");
  res.status(200).json({
    environment: process.env.NODE_ENV,
    currentTimestamp: Date.now(),
    message: "Application is up and running",
  });
};

module.exports = {
  health,
};
