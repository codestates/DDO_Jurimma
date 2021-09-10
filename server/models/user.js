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
      userPic: DataTypes.STRING,
      exp: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'user',
    }
  );
  return users;
};
