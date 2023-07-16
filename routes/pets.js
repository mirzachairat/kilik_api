var express = require("express");
var petsRoutes = express.Router();
const PetController = require("../controllers/PetController");

petsRoutes.get("/list", PetController.index);
petsRoutes.post("/create", PetController.create);

module.exports = petsRoutes;
