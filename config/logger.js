import winston from "winston";
import config from "./index.js";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  transports: [
    // Log errors to error.log
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    // Log everything to combined.log
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
});

// Show logs in console during development
if (config.nodeEnv !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export default logger;
