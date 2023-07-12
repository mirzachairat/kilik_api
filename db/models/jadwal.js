'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jadwal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Jadwal.init({
    id_user: DataTypes.INTEGER,
    tanggal: DataTypes.DATE,
    waktu: DataTypes.DATE,
    antrian: DataTypes.INTEGER,
    nama_pet: DataTypes.STRING,
    kondisi_pet: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Jadwal',
  });
  return Jadwal;
};