'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          username: '배윤수',
          email: 'ownsgks@gmail.com',
          password: 'yunsu12345',
          userPic: '',
          experience: 10,
          quizDate: '',
          isLogin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: '김민재',
          email: 'minjman2659@gmail.com',
          password: 'minjman2659123',
          userPic: '',
          experience: 20,
          quizDate: '',
          isLogin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: '이나은',
          email: 'naeun@gmail.com',
          password: 'naunendjfiasdf',
          userPic: '',
          experience: 30,
          quizDate: '',
          isLogin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: '강영서',
          email: 'kangg@gmail.com',
          password: 'kangggg123',
          userPic: '',
          experience: 40,
          quizDate: '',
          isLogin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: '권지용',
          email: 'gdragon@gmail.com',
          password: 'gdragon8888',
          userPic: '',
          experience: 50,
          quizDate: '',
          isLogin: false,
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
