const { user, content, thumbsups } = require('../../models');
const {
  isAuthorized,
  generateAccessToken,
} = require('../tokenFunction/accessToken');
const {
  refreshAuthorized,
  sendRefreshToken,
} = require('../tokenFunction/refreshToken');
const { encryptPwd, decryptPwd } = require('../hashing/hashingPwd');

module.exports = {
  get: async (req, res) => {
    const accessVerify = isAuthorized(req);
    const refreshVerify = refreshAuthorized(req);

    if (accessVerify) {
      const userInfo = await user.findOne({
        where: { id: accessVerify.id },
      });
      delete userInfo.dataValues.password;
      delete userInfo.dataValues.emailAuth;
      delete userInfo.dataValues.createdAt;
      delete userInfo.dataValues.updatedAt;
      res.status(200).json({
        data: userInfo,
      });
    } else {
      if (refreshVerify) {
        delete refreshVerify.exp;
        const accessToken = generateAccessToken(refreshVerify);

        const userInfo = await user.findOne({
          where: { id: refreshVerify.id },
        });
        delete userInfo.dataValues.password;
        delete userInfo.dataValues.emailAuth;
        delete userInfo.dataValues.createdAt;
        delete userInfo.dataValues.updatedAt;
        res.status(201).json({
          accessToken: accessToken,
          data: userInfo,
        });
      } else {
        res.status(401).json({ message: 'Send new Login Request' });
      }
    }
  },

  put: async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
    const accessVerify = isAuthorized(req);

    // accessToken 만료
    if (!accessVerify) {
      const refreshVerify = refreshAuthorized(req);
      // refreshToken 유효한 경우
      if (refreshVerify) {
        delete refreshVerify.exp;
        const accessToken = generateAccessToken(refreshVerify);
        const userInfo = await user.findOne({
          where: { id: refreshVerify.id },
        });
        // 유저가 입력한 oldPassword가 db에 저장된 password와 다른 경우
        if (!userInfo || decryptPwd(userInfo.password) !== oldPassword) {
          res.status(400).json({ message: 'Wrong Password' });
        } else {
          userInfo.username = username;
          userInfo.password = encryptPwd(newPassword);
          await userInfo.save();
          res.status(201).json({
            accessToken: accessToken,
            message: 'ok',
          });
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
        where: { id: accessVerify.id },
      });
      // 유저가 입력한 oldPassword가 db에 저장된 pw 와 다른 경우
      if (!userInfo || decryptPwd(userInfo.password) !== oldPassword) {
        res.status(400).json({ message: 'Wrong Password' });
      } else {
        userInfo.username = username;
        userInfo.password = encryptPwd(newPassword);
        await userInfo.save();
        res.status(200).json({ message: 'ok' });
      }
    }
  },

  delete: async (req, res) => {
    const accessVerify = isAuthorized(req);
    const refreshVerify = refreshAuthorized(req);
    const userId = req.params.id;
    // console.log(userId);
    const userFind = await user.findOne({
      where: { id: userId },
    });
    if (accessVerify || refreshVerify) {
      const userCreatedDate = userFind.createdAt.toLocaleDateString();
      const nowDate = new Date().toLocaleDateString();
      if (userCreatedDate === nowDate) {
        res.status(403).json({ message: 'Forbidden Request' });
      } else {
        // user 테이블의 해당 유저의 id로 저장된 레코드 삭제
        await user.destroy({ where: { id: userId }, force: true });
        // content 테이블의 해당 유저의 id로 저장된 레코드 삭제
        await content.destroy({ where: { userId: userId }, force: true });
        // user_contents 테이블의 해당 유저의 id로 저장된 레코드 삭제
        await thumbsups.destroy({
          where: { userId: userId },
          force: true,
        });
        sendRefreshToken(res, null);
        res.status(200).json({ message: 'ok' });
      }
      // word 테이블은 wordName과 count만 있음.
      // content의 wordId에 해당하는 레코드를 지우면, 다른 유저가 쓴 같은 뜻도 사라지게 되므로 word 테이블은 건들지 않음.
    } else {
      res.status(401).json({ message: 'Send new Login Request' });
    }
  },
};
