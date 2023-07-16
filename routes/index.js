var express = require("express");
const usersRoutes = require("./users");
const jadwalsRoutes = require("./jadwals");
const petsRoutes = require("./pets");
var router = express.Router();

// Import route files
router.use("/users", usersRoutes);
router.use("/jadwals", jadwalsRoutes);
router.use("/pets", petsRoutes);

module.exports = router;
