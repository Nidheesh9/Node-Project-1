const config = {
  port: process.env.PORT || 8080,
  jwtSecret: process.env.JWT_SECRET,
  db: {
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
  },
  saltRounds: parseInt(process.env.ROUNDS) || 10,
  nodeEnv: process.env.NODE_ENV,
};

export default config;
