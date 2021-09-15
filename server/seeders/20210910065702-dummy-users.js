'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          username: '권지용',
          email: 'gdragon@gmail.com',
          password: 'gdragon8888',
          userPic: '',
          experience: 50,
          quizDate: '',
          emailAuth: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: '동영배',
          email: 'TY@gmail.com',
          password: 'TY12345123!',
          userPic: '',
          experience: 30,
          quizDate: '',
          emailAuth: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: '구교환',
          email: 'exchange@gmail.com',
          password: 'exchange8282',
          userPic: '',
          experience: 10,
          quizDate: '',
          emailAuth: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
