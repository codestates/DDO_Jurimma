'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class thumbsups extends Model {
    static associate(models) {}
  }
  thumbsups.init(
    {
      userId: DataTypes.INTEGER,
      contentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'thumbsups',
    }
  );
  return thumbsups;
};
