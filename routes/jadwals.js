var express = require("express");
var jadwalsRoutes = express.Router();
const JadwalController = require("../controllers/JadwalController");

jadwalsRoutes.get("/list", JadwalController.index);
jadwalsRoutes.post("/create", JadwalController.create);

module.exports = jadwalsRoutes;
