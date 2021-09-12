const { user } = require('../../models');
const { encryptPwd } = require('../hashing/hashingPwd');

module.exports = {
  post: async (req, res) => {
    // 유효성 검사 및 누락 정보들에 대한 경우는 클라이언트에서 사전 검증
    // email이 중복되는지도 checkEmail.js에서 검증함
    // 회원가입 완료
    const newUserData = await req.body;
    const { email, password, username } = newUserData;
    const encryptedPw = encryptPwd(password);
    console.log('encrypted :', encryptedPw);
    await user.create({
      email,
      password: encryptedPw,
      username,
    });
    res.status(200).json({ message: 'ok' });
  },
};
