const { user } = require('../../models');
require('dotenv').config();

module.exports = {
  // ! 이메일의 인증하기 버튼을 누르면 발생하는 코드
  get: async (req, res) => {
    const URL = process.env.CLIENT_URL || 'http://localhost:3000';
    const { email } = req.params;
    const isAuth = await user.findOne({ where: { email: email } });
    if (isAuth) {
      isAuth.emailAuth = true;
      console.log('emailAuth : ', isAuth.emailAuth);
      await isAuth.save();
      // ! 유저 테이블의 emailAuth를 true로 바꾸고 랜딩페이지로 리디렉트한다.
      res.send(
        `<script>
        alert('회원가입이 완료되었습니다.');location.href='${URL}';</script>`
      );
    } else {
      // ! 유저가 2분이 지나고 이메일 인증을 누른 경우
      res.send(
        `<script>alert('이메일 인증 시간을 초과했습니다.');location.href='${URL}';</script>`
      );
    }
  },
};
