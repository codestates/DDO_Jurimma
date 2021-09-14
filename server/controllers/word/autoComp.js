const { word } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const allWords = await word.findAll();
    // console.log('allWords : ', allWords);
    const returnData = allWords.map((el) => el.wordName);
    // console.log('returnData : ', returnData);
    res.status(200).json({
      data: returnData,
    });
  },
};
