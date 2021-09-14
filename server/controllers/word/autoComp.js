const { word } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const sequelize = require('sequelize');
    const Op = sequelize.Op;
    const wordName = req.query.query;
    console.log('wordName : ', wordName);
    const authCompWords = await word.findAll({
      where: { wordName: { [Op.like]: wordName + '%' } },
    });
    console.log('authCompWords : ', authCompWords);
    const returnData = authCompWords.map((el) => el.wordName);
    console.log('returnData : ', returnData);
    res.status(200).json({
      data: returnData,
    });
  },
};
