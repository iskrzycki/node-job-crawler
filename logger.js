const { createLogger, format, transports, config } = require("winston");
const { combine, timestamp, simple, printf } = format;
const moment = require("moment");

const myFormat = printf(({ level, message, timestamp }) => {
  return `${moment()
    .format("YYYY-MM-DD HH:mm:ss")
    .trim(timestamp)} [${level.toUpperCase()}] ${message}`;
});

const logger = createLogger({
  levels: config.npm.levels,
  format: combine(timestamp(), simple(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "winston.log" }),
  ],
});

exports.logger = logger;
