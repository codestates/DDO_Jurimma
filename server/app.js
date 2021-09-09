const express = require('express');
const app = express();
const logger = require('morgan');
const port = 4000;
const cors = require('cors');
const { sequelize } = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res, next) => {
  res.status(404).send('Not Found!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'Internal Server Error',
    stacktrace: err.toString(),
  });
});

// 데이터베이스 연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(port, () => {
  console.log(`Jurimma app listening at http://localhost:${port} 😘`);
});
