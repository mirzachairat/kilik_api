# Instaltion and cofiguration NodeJS and express sequalize(postgres)

### Install Library

</br>

```
npm i express sequelize pg dotenv
```

```
npm i nodemon sequelize-cli -D
```
**.env** => setting environment ./config/config.js

```

DB_USERNAME=usuario
DB_PASSWORD=password
DB_DATABASE=db_name
DB_HOST=localhost
DB_DIALECT=postgres

PORT=3001

**.sequelizerc** => migration config (config.js, models, seeders, migrations)

```

const path = require('path');

module.exports = {
  'config': path.resolve('config', 'config.js'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations')
};

```

</br>
</br>

**server.js** => set server configurated

```

const express = require("express");
require("dotenv").config();
const {sequelize} = require("./db/models/index.js")
//const router = require("./routes");
const app = express();

//Setting
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
//app.use("/api", router);
app.get("/", (req, res) => {
  res.send({msg: "Hola mundo"});
})

//Starting server
app.listen(PORT, function () {
  console.log(`La app ha arrancado en http://localhost:${PORT}`);

  //Database connection
  sequelize.sync({force: true, logging: console.log}).then(() => {
    console.log("Drop and re-sync db.");
  });
});

require("dotenv").config();

module.exports = {
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_DATABASE || "db_test",
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "3002",
};

</br>

```

"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require("../../config/config.js");
const db = {};

let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  define: {
    timestamps: false,
    underscored: true,
  },
});

// checks the database connectivity
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to the DB has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;

```
