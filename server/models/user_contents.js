'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_contents extends Model {
    static associate(models) {}
  }
  user_contents.init(
    {
      user_Id: DataTypes.INTEGER,
      content_Id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'user_contents',
    }
  );
  return user_contents;
};
