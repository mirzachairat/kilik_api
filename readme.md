# Instrucción para inicializar proyecto en NodeJS con express y sequalize(postgres)

## Comandos

</br></br>

### Creación de App

</br>

```
mkdir "nombre_App"
```

```
cd nombre_App
```

```
npm init -y
```

</br></br>

### Instalación de librerías y dependencias

</br>

```
npm i express sequelize pg dotenv
```

```
npm i nodemon sequelize-cli -D
```

</br></br>

### Creación de estructura de proyecto y archivos adicionales

</br>

Crea las carpetas migrations, models,seeders, config

```
npx sequelize-cli init
```

Luego de ello, se deberán de reubicar las carpetas siguientes dentro de una nueva carpeta db

<img src="db-img.png" alt="db-img"/>

</br>
Se crean 3 archivos adicionales en la raíz del proyecto

</br>

```
touch .env .sequelizerc server.js
```

</br>
</br>
**.env** => Sirve para crear las variables de entorno que se utilizarán en el ./config/config.js

```

DB_USERNAME=usuario
DB_PASSWORD=password
DB_DATABASE=db_name
DB_HOST=localhost
DB_DIALECT=postgres

PORT=3001

//En este ejemplo usamos el puerto 3001, pero se debe verificar que no este usado por otro aplicativo

```

</br>
</br>

**.sequelizerc** => Sirve para indicar a sequelize la ubicación (path) de nuestras archivos y carpetas (config.js, models, seeders, migrations)

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

**server.js** => Es el archivo de inicialización del servidor

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

```
</br>
</br>
Nos dirigimos a la carpeta config y renombramos el archivo que sequelize-cli creo por nosotros. El nuevo nombre tendra una extensión .js que nos permitirá ejecutar sentencias de javascript (config.js)

</br>
Aquí se hará el llamado a las correspondientes variables de entorno.

</br>

```

require("dotenv").config();

module.exports = {
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_DATABASE || "db_test",
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "3002",
};

```
</br>
Finalmente, si ingresamos a la carpeta model, se encontrará el archivo index.js creado por sequealize-cli y que sirve tanto para realizar la configuración y conexión de la BD, así como, para vincular los modelos a la misma.

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