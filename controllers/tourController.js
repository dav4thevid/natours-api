const Tour = require("./../models/tourModels");

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getATour = (req, res) => {
  const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);

  // res.status(200).json({
  //   status: "Success",
  //   data: {
  //     tour,
  //   },
  // });
};

exports.postATour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err
    })
  }
};

exports.updateATour = (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Updated Succesfully",
  });
};

exports.deleteATour = (req, res) => {
  res.status(204).json({
    status: "Success",
    data: null,
  });
};
