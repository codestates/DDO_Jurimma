'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wordCount extends Model {
    static associate(models) {}
  }
  wordCount.init(
    {
      wordName: DataTypes.STRING,
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'wordCount',
    }
  );
  return words;
};
