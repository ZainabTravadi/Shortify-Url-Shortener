const express = require("express");
const cors = require("cors");

const urlRoutes = require("./routes/url.routes");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// routes
app.use("/", urlRoutes);

module.exports = app; // 🔥 EXPORT THE APP ITSELF
