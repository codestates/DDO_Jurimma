'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'contents',
      [
        {
          wordMean: '자연스러운 만남 추구',
          userId: 1,
          wordId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordMean: '스스로 불러온 재앙',
          userId: 1,
          wordId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordMean: '자존심 강한 두 천재의 대결',
          userId: 2,
          wordId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordMean: '갑자기 분위기 싸해짐',
          userId: 3,
          wordId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordMean: '자장면에 만두 추가',
          userId: 1,
          wordId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordMean: '자신만만 추성훈',
          userId: 2,
          wordId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordMean: '자신만만 추사랑',
          userId: 2,
          wordId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordMean: '번호 달라고 하면 번호줌?',
          userId: 3,
          wordId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordMean: '별걸 다 줄인다...',
          userId: 1,
          wordId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordMean: '애교 빼면 시체',
          userId: 3,
          wordId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('contents', null, {});
  },
};
