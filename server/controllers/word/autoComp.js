const { word } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const wordName = req.query.query;
    console.log('wordName : ', wordName);
    const authCompWords = await word.findAll({ where: { wordName: wordName } });
    console.log('authCompWords : ', authCompWords);
    const returnData = authCompWords.map((el) => el.wordName);
    console.log('returnData : ', returnData);
    res.status(200).json({
      data: returnData,
    });
  },
};
