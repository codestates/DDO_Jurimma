const { word } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const sequelize = require('sequelize');
    const Op = sequelize.Op;
    const wordSplit = req.query.query;
    const authCompWords = await word.findAll({
      where: { wordName: { [Op.like]: wordSplit + '%' } },
    });
    const returnData = authCompWords.map((el) => el.wordName);
    res.status(200).json({
      data: returnData,
    });
  },
};
