const { content, word } = require('../../models');
const {
  isAuthorized,
  generateAccessToken,
} = require('../tokenFunction/accessToken');
const { refreshAuthorized } = require('../tokenFunction/refreshToken');

module.exports = {
  get: async (req, res) => {
    try {
      const accIsValid = await isAuthorized(req);
      if (!accIsValid) {
        // accessToken 만료 / refreshToken 만료
        if (!refreshAuthorized(req)) {
          res.status(401).json({ message: 'Send new Login Request' });
        }
        // accessToken 만료 / refreshToken 유효
        else {
          const userData = await refreshAuthorized(req);
          delete userData.password;
          const accessToken = await generateAccessToken(userData);
          const myData = await content.findAll({
            where: { userId: userData.id },
          });
          const userInfo = {
            userId: userData.id,
            email: userData.email,
            username: userData.username,
            userPic: userData.userPic,
            exp: userData.exp,
          };
          const wordName = await word.findOne({ where: { id: myData.wordId } });
          const returnData = myData.map((data) =>
            Object.assign(data.dataValues, wordName)
          );
          res.status(201).json({
            accessToken: accessToken,
            data: returnData,
            userInfo: userInfo,
          });
        }
      } else {
        // accessToken 유효 / refreshToken 유효
        const myData = await content.findAll({
          where: { userId: accIsValid.id },
        });
        const userInfo = {
          userId: accIsValid.id,
          email: accIsValid.email,
          username: accIsValid.username,
          userPic: accIsValid.userPic,
          exp: accIsValid.exp,
        };
        const wordName = await word.findOne({ where: { id: myData.wordId } });
        console.log(wordName);
        const returnData = myData.map((data) =>
          Object.assign(data.dataValues, wordName)
        );
        console.log(returnData);
        res.status(200).json({ data: returnData, userInfo: userInfo });
      }
    } catch (error) {
      // 작성한 글이 없는 경우
      res.status(404).json({ message: 'There is no written contents' });
    }
  },
};
