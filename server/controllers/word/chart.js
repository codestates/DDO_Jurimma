const { word } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const allWords = await word.findAll();
    const returnData = allWords.sort((a, b) => b.count - a.count).slice(0, 10);
    res.status(200).json({
      data: returnData,
    });
  },
};
