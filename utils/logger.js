const winston = require('winston');
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.align()
      )
    })
  ]
});

module.exports = logger;
