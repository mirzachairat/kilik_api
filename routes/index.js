var express = require("express");
const usersRoutes = require("./users");
var router = express.Router();

// Import route files
router.use("/users", usersRoutes);

module.exports = router;
