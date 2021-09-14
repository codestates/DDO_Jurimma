'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'thumbsup',
      [
        {
          user_Id: 1,
          content_Id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_Id: 1,
          content_Id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_Id: 2,
          content_Id: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_Id: 3,
          content_Id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_Id: 1,
          content_Id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_Id: 1,
          content_Id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_Id: 2,
          content_Id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_Id: 1,
          content_Id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_Id: 1,
          content_Id: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_Id: 3,
          content_Id: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('thumbsup', null, {});
  },
};
