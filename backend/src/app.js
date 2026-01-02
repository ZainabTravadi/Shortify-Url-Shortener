const express = require("express");
const cors = require("cors");

const urlRoutes = require("./routes/url.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", urlRoutes);

module.exports = app;
