const { user } = require('../../models');
const {
  isAuthorized,
  generateAccessToken,
} = require('../tokenFunction/accessToken');
const { refreshAuthorized } = require('../tokenFunction/refreshToken');

module.exports = {
  patch: async (req, res) => {
    const { experience, quizDate } = req.body;
    const accessVerify = isAuthorized(req);
    // accessToken 만료
    if (!accessVerify) {
      const refreshVerify = refreshAuthorized(req);
      // refreshToken 만료
      if (!refreshVerify) {
        res.status(401).json({ message: 'Send new Login Request' });
      }
      // refreshToken 유효
      else {
        delete refreshVerify.exp;
        const accessToken = generateAccessToken(refreshVerify);
        const userInfo = await user.findOne({
          where: { id: refreshVerify.id },
        });
        userInfo.experience = experience;
        userInfo.quizDate = quizDate;
        await userInfo.save();
        res.status(201).json({ accessToken, message: 'ok' });
      }
    }
    // accessToken 유효
    else {
      const userInfo = await user.findOne({ where: { id: accessVerify.id } });
      userInfo.experience = experience;
      userInfo.quizDate = quizDate;
      await userInfo.save();
      res.status(200).json({ message: 'ok' });
    }
  },
};
