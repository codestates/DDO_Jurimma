const { user } = require('../../models');
const {
  isAuthorized,
  generateAccessToken,
} = require('../tokenFunction/accessToken');
const { refreshAuthorized } = require('../tokenFunction/refreshToken');

module.exports = {
  patch: (req, res) => {
    res.send('This is user/image');
  },
};
