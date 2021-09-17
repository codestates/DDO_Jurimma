const { user } = require('../../models');
const { generateAccessToken } = require('../tokenFunction/accessToken');
const {
  generateRefreshToken,
  sendRefreshToken,
} = require('../tokenFunction/refreshToken');
const { OAuth2Client } = require('google-auth-library');

require('dotenv').config();

module.exports = {
  post: async (req, res) => {
    const { authorizationCode } = req.body;
    if (!authorizationCode) {
      res.status(400).json({ message: 'authorizationCode does not exist' });
    }
    // ! 유저 정보 가져오기
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirect_url =
      process.env.CLIENT_REDIRECT_URL || `http://localhost:3000`;
    const googleClient = new OAuth2Client(
      googleClientId,
      googleClientSecret,
      redirect_url
    );
    let code;
    try {
      code = await googleClient.getToken(authorizationCode);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'authorizationCode does not exist' });
    }

    const idToken = code.tokens.id_token;
    const ticket = await googleClient.verifyIdToken({ idToken });
    const googleUserInfo = ticket.getPayload();
    const googleEmail = googleUserInfo.email;
    const googleName = googleUserInfo.name;
    const googleUserPic = googleUserInfo.picture;

    // ! db에 유저의 이메일과 동일한 이메일있는지 검색
    const userUsingEmail = await user.findOne({
      where: { email: googleEmail },
    });
    // ! 없으면 가입
    if (!userUsingEmail) {
      await user.create({
        email: googleEmail,
        username: googleName,
        userPic: googleUserPic,
        emailAuth: 1,
      });
      res.status(201).json({ message: 'Signup Complete' });
    }

    // ! 있으면 로그인
    else {
      delete userUsingEmail.dataValues.password;
      delete userUsingEmail.dataValues.emailAuth;
      delete userUsingEmail.dataValues.createdAt;
      delete userUsingEmail.dataValues.updatedAt;
      console.log('유저 정보 : ', userUsingEmail.dataValues);
      const accessToken = generateAccessToken(userUsingEmail.dataValues);
      const refreshToken = generateRefreshToken(userUsingEmail.dataValues);
      sendRefreshToken(res, refreshToken);
      res.status(200).json({ accessToken, userInfo: userUsingEmail });
    }
  },
};
