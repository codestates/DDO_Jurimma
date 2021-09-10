'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const { content, user, user_contents, word } = sequelize.models;

// users 테이블과 contents 테이블 관계
content.belongsTo(user);
user.hasMany(content);

// contents 테이블과 words 테이블 관계
content.belongsTo(word);
word.hasMany(content);

// user_coutents N:M 테이블
content.belongsToMany(user, {
  through: 'user_contents',
  foreignKey: 'id',
});
user.belongsToMany(content, {
  through: 'user_contents',
  foreignKey: 'id',
});
user_contents.belongsTo(user, {
  foreignKey: 'user_Id',
});
user.hasMany(user_contents);
user_contents.belongsTo(content, {
  foreignKey: 'content_Id',
});
content.hasMany(user_contents);

module.exports = db;
