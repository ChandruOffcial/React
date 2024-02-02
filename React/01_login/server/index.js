const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// Midelware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("db is connected");
    app.listen(PORT, () => console.log(`Server is Online ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = 8000;

app.use("/", require("./routes/authRoute"));
