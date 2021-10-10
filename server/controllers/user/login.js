const { user } = require('../../models');
const { generateAccessToken } = require('../tokenFunction/accessToken');
const {
  generateRefreshToken,
  sendRefreshToken,
} = require('../tokenFunction/refreshToken');
const { decryptPwd, comparePwd } = require('../hashing/hashingPwd');

module.exports = {
  post: async (req, res) => {
    // db에 req.body로 들어온 유저 정보가 없다면 invalid user
    const { email, password } = req.body;
    const userInfo = await user.findOne({ where: { email: email } });
    if (!userInfo) {
      res.status(400).json({ message: 'Invalid User' });
    } else {
      if (userInfo.dataValues.isOAuth) {
        res.status(400).json({ message: 'You Already Signed up' });
      }
      const decryptedPw = decryptPwd(password);
      console.log('복호화 된 암호 : ', decryptedPw);
      // 유저가 입력한 password와 db에 저장된 password를 일치하는지 비교한다
      if (!comparePwd(decryptedPw, userInfo.dataValues.password)) {
        res.status(400).json({ message: 'Invalid User' });
      }
      // 이메일 인증을 안 한 경우
      else if (userInfo.emailAuth === false) {
        res.status(409).json({ message: 'Not Authorized Email' });
      }
      // 그 외의 경우는 로그인 성공, accessToken과 userInfo를 return
      else {
        delete userInfo.dataValues.password;
        delete userInfo.dataValues.emailAuth;
        delete userInfo.dataValues.createdAt;
        delete userInfo.dataValues.updatedAt;
        console.log('유저 정보 : ', userInfo.dataValues);
        const accessToken = generateAccessToken(userInfo.dataValues);
        const refreshToken = generateRefreshToken(userInfo.dataValues);
        sendRefreshToken(res, refreshToken);
        res.status(200).json({ accessToken, userInfo });
      }
    }
  },
};
