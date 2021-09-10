'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class word extends Model {
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
  return word;
};
