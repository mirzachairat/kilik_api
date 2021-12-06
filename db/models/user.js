"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    }
    User.init(
        {
            full_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [5, 80],
                        msg: "Full Name must have between 5 and 80 characters",
                    },
                },
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isAlpha: {
                        args: true,
                        msg: "Username must be an alpha character",
                    },
                    len: {
                        args: [5, 20],
                        msg: "Username must have between 5 and 10 characters",
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        args: true,
                        msg: "Email must be valid",
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
