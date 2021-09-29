'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {}
  }
  user.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      userPic: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      experience: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      quizDate: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      emailAuth: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isOAuth: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'user',
    }
  );
  return user;
};
