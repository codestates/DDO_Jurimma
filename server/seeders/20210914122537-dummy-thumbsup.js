'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'thumbsups',
      [
        {
          userId: 1,
          contentId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          contentId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          contentId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          contentId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          contentId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          contentId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          contentId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          contentId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          contentId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          contentId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('thumbsups', null, {});
  },
};
