'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'words',
      [
        {
          wordName: '자만추',
          count: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordName: '스불재',
          count: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordName: '자강두천',
          count: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordName: '갑분싸',
          count: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordName: '번달번줌',
          count: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordName: '별다줄',
          count: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordName: '애빼시',
          count: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('words', null, {});
  },
};
