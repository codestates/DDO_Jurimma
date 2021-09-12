const { content, word } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      const { wordName } = req.query;
      const coWordName = await word.findOne({
        where: { wordName: wordName },
      });
      // console.log('확인 : ', coWordName.wordName);
      const coContents = await content.findAll({
        where: { wordId: coWordName.id },
      });
      const sortedContents = coContents
        .sort((a, b) => b.thumbsup - a.thumbsup)
        .slice(0, 3);
      // console.log('s : ', sortedContents);
      const returnData = sortedContents.map((el) => {
        el.dataValues.wordName = wordName;
        return el;
      });
      // console.log('r : ', returnData);
      res.status(200).json({
        data: returnData,
      });
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: 'Not Found!' });
    }
  },
};
