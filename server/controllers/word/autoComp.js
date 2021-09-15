const { word } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const sequelize = require('sequelize');
    const Op = sequelize.Op;
    const wordSplit = req.query.query;
    // console.log('wordSplit : ', wordSplit);
    const authCompWords = await word.findAll({
      where: { wordName: { [Op.like]: wordSplit + '%' } },
    });
    // console.log('authCompWords : ', authCompWords);
    const returnData = authCompWords.map((el) => el.wordName);
    // console.log('returnData : ', returnData);
    res.status(200).json({
      data: returnData,
    });
  },
};
