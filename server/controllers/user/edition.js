const { user } = require('../../models');
const {
  isAuthorized,
  generateAccessToken,
} = require('../tokenFunction/accessToken');
const { refreshAuthorized } = require('../tokenFunction/refreshToken');
const { encryptPwd, decryptPwd } = require('../hashing/hashingPwd');

module.exports = {
  patch: async (req, res) => {
    const { userPic, username, oldPassword, newPassword } = req.body;
    const accessVerify = await isAuthorized(req);

    // accessToken 만료
    if (!accessVerify) {
      const refreshVerify = await refreshAuthorized(req);
      // refreshToken 유효한 경우
      if (refreshVerify) {
        delete refreshVerify.exp;
        const accessToken = await generateAccessToken(refreshVerify);
        const userInfo = await user.findOne({
          where: { email: refreshVerify.email },
        });
        // 유저가 입력한 oldPassword가 db에 저장된 password와 다른 경우
        if (!userInfo || decryptPwd(userInfo.password) !== oldPassword) {
          res.status(400).json({ message: 'Wrong Password' });
        } else {
          userInfo.username = username;
          userInfo.password = encryptPwd(newPassword);
          userInfo.userPic = userPic;
          await userInfo.save();
          delete userInfo.dataValues.password;
          delete userInfo.dataValues.isLogin;
          res.status(201).json({ accessToken, userInfo });
        }
      }
      // refreshToken 만료
      else {
        res.status(401).json({ message: 'Send new Login Request' });
      }
    }
    // accessToken 유효
    else {
      const userInfo = await user.findOne({
        where: { email: accessVerify.email },
      });
      // 유저가 입력한 oldPassword가 db에 저장된 pw 와 다른 경우
      if (!userInfo || decryptPwd(userInfo.password) !== oldPassword) {
        res.status(404).json({ message: 'Wrong Password' });
      } else {
        userInfo.username = username;
        userInfo.password = encryptPwd(newPassword);
        userInfo.userPic = userPic;
        await userInfo.save();
        delete userInfo.dataValues.password;
        delete userInfo.dataValues.isLogin;
        res.status(200).json({ userInfo });
      }
    }
  },
};
