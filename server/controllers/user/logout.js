const { sendRefreshToken } = require('../tokenFunction/refreshToken');

module.exports = {
  get: async (req, res) => {
    sendRefreshToken(res, null);
    res.status(200).json({ accessToken: null, message: 'ok' });
  },
};
