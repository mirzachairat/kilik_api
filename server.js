const express = require("express");
require("dotenv").config();
const { sequelize } = require("./db/models/index.js");
const router = require("./routes/index");
const app = express();

//Setting
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/v1", router);

//Starting server
app.listen(PORT, function () {
  console.log(`La app ha arrancado en http://localhost:${PORT}`);

  //Database connection
  sequelize.sync({ force: true, logging: console.log }).then(() => {
    console.log("Drop and re-sync db.");
  });
});
