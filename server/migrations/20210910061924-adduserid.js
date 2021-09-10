'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('contents', 'userId', Sequelize.INTEGER);

    await queryInterface.addColumn('contents', 'wordId', Sequelize.INTEGER);

    await queryInterface.addConstraint('contents', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'userIdFK',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('contents', {
      fields: ['wordId'],
      type: 'foreign key',
      name: 'wordIdFK',
      references: {
        table: 'words',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('contents', 'userIdFK');
    await queryInterface.removeConstraint('contents', 'wordIdFK');
    await queryInterface.removeColumn('contents', 'userId');
    await queryInterface.removeColumn('contents', 'wordId');
  },
};
