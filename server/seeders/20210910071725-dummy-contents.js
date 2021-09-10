'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'contents',
      [
        {
          wordId: 1,
          wordMean: '자연스러운 만남 추구',
          thumbsup: 10,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordId: 2,
          wordMean: '스스로 불러온 재앙',
          thumbsup: 30,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordId: 3,
          wordMean: '갑자기 분위기 싸해짐',
          thumbsup: 7,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordId: 1,
          wordMean: '자장면에 만두 추가',
          thumbsup: 5,
          userId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordId: 1,
          wordMean: '자신만만 추성훈',
          thumbsup: 20,
          userId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordId: 1,
          wordMean: '자신만만 추사랑',
          thumbsup: 0,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordId: 4,
          wordMean: '번호 달라고 하면 번호줌?',
          thumbsup: 10,
          userId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordId: 5,
          wordMean: '별걸 다 줄인다...',
          thumbsup: 7,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordId: 6,
          wordMean: '애교 빼면 시체',
          thumbsup: 2,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wordId: 7,
          wordMean: '자존심 강한 두 천재의 대결',
          thumbsup: 12,
          userId: 2,
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
