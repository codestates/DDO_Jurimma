const { user } = require('../../models');
const {
  sendRefreshToken,
  refreshAuthorized,
} = require('../tokenFunction/refreshToken');

module.exports = {
  post: async (req, res) => {
    const refreshTokenCheck = refreshAuthorized(req);
    // refreshToken 만료된 경우 로그인 상태가 아님
    if (!refreshTokenCheck) {
      res.status(401).json({ message: 'You are not loged in!' });
    }
    // 그 외의 경우 accessToken, refreshToken 삭제
    else {
      sendRefreshToken(res, null);
      res.status(200).json({ accessToken: null, message: 'ok' });
    }
  },
};
