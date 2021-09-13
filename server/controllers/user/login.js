const { user } = require('../../models');
const { generateAccessToken } = require('../tokenFunction/accessToken');
const {
  generateRefreshToken,
  sendRefreshToken,
} = require('../tokenFunction/refreshToken');
const { decryptPwd } = require('../hashing/hashingPwd');

module.exports = {
  post: async (req, res) => {
    // db에 req.body로 들어온 유저 정보가 없다면 invalid user
    const { email, password } = req.body;
    const userInfo = await user.findOne({ where: { email } });
    if (!userInfo) {
      res.status(400).json({ message: 'Invalid User' });
    } else {
      const decryptedPw = decryptPwd(userInfo.dataValues.password);
      console.log('복호화 된 암호 : ', decryptedPw);
      // 유저가 입력한 password와 db에 저장된 password를 복호화하여 일치한지 비교한다
      if (decryptedPw !== password) {
        res.status(400).json({ message: 'Invalid User' });
      }
      // 그 외의 경우는 로그인 성공, accessToken과 userInfo를 return
      else {
        delete userInfo.dataValues.password;
        const accessToken = generateAccessToken(userInfo.dataValues);
        const refreshToken = generateRefreshToken(userInfo.dataValues);
        sendRefreshToken(res, refreshToken);
        res.status(200).json({ accessToken, userInfo });
      }
    }
  },
};
