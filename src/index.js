const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const initMongoose = require("./config/mongooseConfig");
const middlewares = require("./services/middlewares");
const router = require("./router");
const errorHandler = require("./services/errors/errorHandler");

const PORT = process.env.PORT || 5000;

// create .env file with MONGODB_USERNAME, MONGODB_PASSWORD and SECRET in src/
if (process.env.NODE_ENV === "development") dotenv.config({ path: "src/.env" });

const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./public")));
//CORS
app.use((req, res, next) => {
  process.env.NODE_ENV === "production"
    ? res.setHeader("Access-Control-Allow-Origin", `${process.env.HOST}`)
    : res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, token");
  next();
});
app.use(middlewares.auth);
app.use(router);
app.use(errorHandler);

initMongoose()
  .then(() =>
    app.listen(PORT, () =>
      console.log(`env = ${process.env.NODE_ENV} and listening on ${PORT}...`)
    )
  )
  .catch((error) => console.log("mongoose error:" + error));
