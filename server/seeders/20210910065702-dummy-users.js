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
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
