'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class content extends Model {
    static associate(models) {}
  }
  content.init(
    {
      wordMean: DataTypes.STRING,
      thumbsup: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'content',
    }
  );
  return content;
};
