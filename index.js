const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json);
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/index.route"))

const { URL, PORT } = process.env;

async function start() {
  try {
    await mongoose.connect(URL);
    app.listen(PORT, () => {
      console.log("Server has been PORT " + PORT);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
