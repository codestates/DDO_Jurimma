const { user, content, word } = require('../../models');
const {
  generateAccessToken,
  isAuthorized,
} = require('../tokenFunction/accessToken');
const { refreshAuthorized } = require('../tokenFunction/refreshToken');

module.exports = {
  post: async (req, res) => {
    const accessTokenCheck = isAuthorized(req);
    const refreshTokenCheck = refreshAuthorized(req);

    if (accessTokenCheck) {
      // accessToken이 만료되지 않았을 경우,
      // => 바로 요청에 대한 응답 제공
      const { experience, userId, wordName, wordMean } = req.body;
      const [newOrFind, created] = await word.findOrCreate({
        where: { wordName: wordName },
        defaults: { count: 0 },
      });
      await content.create({
        wordId: newOrFind.id,
        wordMean: wordMean,
        thumbsup: 0,
        userId: userId,
      });
      const userInfo = await user.findOne({
        where: { id: userId },
      });
      userInfo.experience = experience;
      await userInfo.save();
      res.status(200).json({ message: 'ok' });
    } else {
      // accessToken이 만료되어서 refreshToken을 판별하고,
      // refreshToken은 만료되지 않았을 경우,
      // => 요청에 대한 응답과 함께 새로 만든 accessToken 발급
      if (refreshTokenCheck) {
        delete refreshTokenCheck.exp;
        const accessToken = generateAccessToken(refreshTokenCheck);

        const { experience, userId, wordName, wordMean } = req.body;
        const [newOrFind, created] = await word.findOrCreate({
          where: { wordName: wordName },
          defaults: { count: 0 },
        });
        await content.create({
          wordId: newOrFind.id,
          wordMean: wordMean,
          thumbsup: 0,
          userId: userId,
        });
        const userInfo = await user.findOne({
          where: { id: userId },
        });
        userInfo.experience = experience;
        await userInfo.save();
        res.status(201).json({
          accessToken: accessToken,
          message: 'ok',
        });
      } else {
        // accessToken이 만료되어서 refreshToken을 판별하고,
        // refreshToken도 만료되었을 경우,
        // 클라이언트에게 다시 로그인을 하라는 메시지 응답을 보낸다.
        res.status(401).json({ message: 'Send new Login Request' });
      }
    }
  },
};
