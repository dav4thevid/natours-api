const express = require("express");
const fs = require("fs");

const app = express();

//MIDDLEWARES
app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//ROUTES HANDLERS

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getATour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "Failed",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "Success",
    data: {
      tour,
    },
  });
};

const postATour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateATour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "Failed",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "Success",
    message: "Updated Succesfully",
  });
};

const deleteATour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "Failed",
      message: "Invalid ID",
    });
  }
  res.status(204).json({
    status: "Success",
    data: null,
  });
};

getAllUsers = (req, res) => {
  res.status(500).json({
    message: "This request is not found",
    error: "Error",
  });
};

getAUser = (req, res) => {
  res.status(500).json({
    message: "This request is not found",
    error: "Error",
  });
};

createAUser = (req, res) => {
  res.status(500).json({
    message: "This request is not found",
    error: "Error",
  });
};

updateAUser = (req, res) => {
  res.status(500).json({
    message: "This request is not found",
    error: "Error",
  });
};

deleteAUser = (req, res) => {
  res.status(500).json({
    message: "This request is not found",
    error: "Error",
  });
};

// ROUTES

app.route("/api/v1/tours").get(getAllTours).post(postATour);
app
  .route("/api/v1/tours/:id")
  .get(getATour)
  .patch(updateATour)
  .delete(deleteATour);

app.route("/api/v1/users").get(getAllUsers).post(createAUser);

app
  .route("/api/v1/users/:id")
  .get(getAUser)
  .patch(updateAUser)
  .delete(deleteAUser);

//STARTING SERVER

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}... `);
});
