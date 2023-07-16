'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Pet.init({
    id_user: DataTypes.INTEGER,
    nama_pet: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING,
    tgl_lahir: DataTypes.DATE,
    berat: DataTypes.INTEGER,
    spesies: DataTypes.STRING,
    ras: DataTypes.STRING,
    warna: DataTypes.STRING,
    vaksin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pet',
  });
  return Pet;
};