'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class thumbsup extends Model {
    static associate(models) {}
  }
  thumbsup.init(
    {
      user_Id: DataTypes.INTEGER,
      content_Id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'thumbsup',
    }
  );
  return thumbsup;
};
