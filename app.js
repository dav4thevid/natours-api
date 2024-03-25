const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
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

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getATour);
// app.post("/api/v1/tours", postATour);
// app.patch("/api/v1/tours/:id", updateATour);
// app.delete("/api/v1/tours/:id", deleteATour);

app.route("/api/v1/tours").get(getAllTours).post(postATour);
app
  .route("/api/v1/tours/:id")
  .get(getATour)
  .patch(updateATour)
  .delete(deleteATour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}... `);
});
