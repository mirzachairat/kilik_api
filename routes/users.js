var express = require("express");
var usersRoutes = express.Router();
const UserController = require("../controllers/UserController");

usersRoutes.get("/", UserController.index);
usersRoutes.post("/", UserController.create);
usersRoutes.patch("/:id", UserController.update);
usersRoutes.delete("/:id", UserController.delete);

module.exports = usersRoutes;
