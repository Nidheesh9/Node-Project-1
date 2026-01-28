import "dotenv/config";
import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";
import router from "./routes/index.js";
import "./models/index.js";
import config from "./config/index.js";
import errorHandleMiddleware from "./middlewares/errorHandleMiddleware.js";
import logger from "./config/logger.js";
import morgan from "morgan";

const app = express();

app.use(
  cors({
    origin: "http://localhost:8081",
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.json({ message: "Welcome to my application." });
});

// DB connection
sequelize
  .authenticate()
  .then(() => logger.info("DB connected"))
  .catch((err) => logger.error("DB error:", err));

// create tables (DEV ONLY)
await sequelize.sync();

app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);

app.use("/api", router);
app.use(errorHandleMiddleware);

app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}.`);
});
