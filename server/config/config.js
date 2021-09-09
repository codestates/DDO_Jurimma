require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'db_jurimma',
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DATABASE_PORT || 3306,
  },
  test: {
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'db_jurimma',
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DATABASE_PORT || 3306,
  },
  production: {
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'db_jurimma',
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DATABASE_PORT || 3306,
  },
};
