const { user, content, word } = require('../../models');
const {
  isAuthorized,
  generateAccessToken,
} = require('../tokenFunction/accessToken');
const { refreshAuthorized } = require('../tokenFunction/refreshToken');

module.exports = {
  get: async (req, res) => {
    const accIsValid = isAuthorized(req);
    if (!accIsValid) {
      // accessToken 만료 / refreshToken 만료
      if (!refreshAuthorized(req)) {
        res.status(401).json({ message: 'Send new Login Request' });
      }
      // accessToken 만료 / refreshToken 유효
      else {
        const userData = refreshAuthorized(req);
        delete userData.exp;
        const accessToken = generateAccessToken(userData);
        const myData = await content.findAll({
          where: { userId: userData.id },
        });
        const tmpUserInfo = await user.findOne({
          where: { id: userData.id },
        });
        const userInfo = {
          userId: tmpUserInfo.id,
          email: tmpUserInfo.email,
          username: tmpUserInfo.username,
          userPic: tmpUserInfo.userPic,
          experience: tmpUserInfo.experience,
          quizDate: tmpUserInfo.quizDate,
          emailAuth: tmpUserInfo.emailAuth,
        };
        // console.log(userInfo);
        // 작성한 글이 없는 경우
        if (myData.length === 0) {
          res.status(201).json({
            accessToken: accessToken,
            data: myData,
            userInfo: userInfo,
          });
        } else {
          for (let el of myData) {
            const wordName = await word.findOne({
              where: { id: el.wordId },
            });
            el.dataValues.wordName = wordName.dataValues.wordName;
          }
          res.status(201).json({
            accessToken: accessToken,
            data: myData,
            userInfo: userInfo,
          });
        }
      }
    } else {
      // accessToken 유효 / refreshToken 유효
      const myData = await content.findAll({
        where: { userId: accIsValid.id },
      });
      // console.log(myData);
      const tmpUserInfo = await user.findOne({
        where: { id: accIsValid.id },
      });
      const userInfo = {
        userId: tmpUserInfo.id,
        email: tmpUserInfo.email,
        username: tmpUserInfo.username,
        userPic: tmpUserInfo.userPic,
        experience: tmpUserInfo.experience,
        quizDate: tmpUserInfo.quizDate,
        emailAuth: tmpUserInfo.emailAuth,
      };
      // console.log(userInfo);
      // 작성한 글이 없는 경우
      if (myData.length === 0) {
        res.status(200).json({ data: myData, userInfo: userInfo });
      } else {
        for (let el of myData) {
          const wordName = await word.findOne({
            where: { id: el.wordId },
          });
          el.dataValues.wordName = wordName.dataValues.wordName;
        }
        res.status(200).json({ data: myData, userInfo: userInfo });
      }
    }
  },
};
