const { user } = require('../../models');
const axios = require('axios');
const { generateAccessToken } = require('../tokenFunction/accessToken');
const {
  generateRefreshToken,
  sendRefreshToken,
} = require('../tokenFunction/refreshToken');

module.exports = {
  post: async (req, res) => {
    const { authorizationCode } = req.body;
    const kakaoRedirectUri =
      process.env.REDIRECT_URI || `http://localhost:3000`;
    const kakaoData = await axios({
      method: 'post',
      url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_REST_API}&redirect_uri=${kakaoRedirectUri}&code=${authorizationCode}`,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    console.log('access_token 확인 : ', kakaoData.data);
    const userData = await axios({
      method: 'get',
      url: `https://kapi.kakao.com/v2/user/me?access_token=${kakaoData.data.access_token}`,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    console.log('유저 정보 : ', userData.data.properties);
    console.log('이메일 : ', userData.data.kakao_account.email);
    const userFindDB = await user.findOne({
      where: { email: userData.data.kakao_account.email },
    });
    if (userFindDB) {
      // 유저 정보가 있는 경우 = 이미 카카오를 통해 회원가입이 되어 있는 경우
      const userInfo = userFindDB.dataValues;
      delete userInfo.password;
      delete userInfo.emailAuth;
      delete userInfo.createdAt;
      delete userInfo.updatedAt;
      const accessToken = generateAccessToken(userInfo);
      const refreshToken = generateRefreshToken(userInfo);
      sendRefreshToken(res, refreshToken);
      res.status(200).json({
        accessToken,
        userInfo,
      });
    } else {
      // 유저 정보가 없는 경우 = 새로 회원가입까지 동시 진행해야 하는 경우
      const newUserData = await user.create({
        username: userData.data.properties.nickname,
        email: userData.data.kakao_account.email,
        userPic: userData.data.properties.profile_image,
        emailAuth: true,
      });
      console.log('newUserData : ', newUserData);
      const userInfo = newUserData.dataValues;
      delete userInfo.password;
      delete userInfo.emailAuth;
      delete userInfo.createdAt;
      delete userInfo.updatedAt;
      const accessToken = generateAccessToken(userInfo);
      const refreshToken = generateRefreshToken(userInfo);
      sendRefreshToken(res, refreshToken);
      res.status(201).json({
        accessToken,
        userInfo,
      });
    }
  },
};
