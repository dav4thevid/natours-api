const express = require("express");

const app = express();

const tourRouter = require("./routes/tourRoutes");
const usersRouter = require("./routes/userRoutes");

//MIDDLEWARES
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", usersRouter);

//STARTING SERVER

module.exports = app;
