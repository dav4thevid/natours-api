const mongoose = require("mongoose");
const app = require("./app");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);


mongoose
  .connect(DB, {
    useNewUrlParser: false,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => console.log("DB connection was succesfull"));
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}... `);
});
