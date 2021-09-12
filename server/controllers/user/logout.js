const { isAuthorized } = require('../tokenFunction/accessToken');
const { sendRefreshToken } = require('../tokenFunction/refreshToken');

module.exports = {
  post: async (req, res) => {
    // accessToken 만료된 경우 로그인 상태가 아님
    if (!isAuthorized(req)) {
      res.status(401).json({ message: 'You are not loged in!' });
    }
    // 그 외의 경우 accessToken, refreshToken 삭제
    else {
      sendRefreshToken(res, null);
      res.status(200).json({ accessToken: null, message: 'ok' });
    }
  },
};
