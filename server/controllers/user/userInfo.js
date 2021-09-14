const { user, content, thumbsup } = require('../../models');
const {
  isAuthorized,
  generateAccessToken,
} = require('../tokenFunction/accessToken');
const { refreshAuthorized } = require('../tokenFunction/refreshToken');
const { encryptPwd, decryptPwd } = require('../hashing/hashingPwd');

module.exports = {
  get: async (req, res) => {
    res.send('this is get/user');
  },

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
        res.status(200).json({ userInfo });
      }
    }
  },

  delete: async (req, res) => {
    const userData = refreshAuthorized(req);
    // user 테이블의 해당 유저의 id로 저장된 레코드 삭제
    await user.destroy({ where: { id: userData.id }, force: true });
    // content 테이블의 해당 유저의 id로 저장된 레코드 삭제
    await content.destroy({ where: { userId: userData.id }, force: true });
    // user_contents 테이블의 해당 유저의 id로 저장된 레코드 삭제
    await thumbsup.destroy({
      where: { user_Id: userData.id },
      force: true,
    });
    res.status(200).json({ message: 'ok' });
    // word 테이블은 wordName과 count만 있음.
    // content의 wordId에 해당하는 레코드를 지우면, 다른 유저가 쓴 같은 뜻도 사라지게 되므로 word 테이블은 건들지 않음.
  },
};
