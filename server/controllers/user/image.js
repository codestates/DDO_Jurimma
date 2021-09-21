const { user } = require('../../models');
const {
  isAuthorized,
  generateAccessToken,
} = require('../tokenFunction/accessToken');
const { refreshAuthorized } = require('../tokenFunction/refreshToken');
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + '/../../config/s3.json');
const s3 = new aws.S3();

module.exports = {
  post: async (req, res) => {
    const accessVerify = isAuthorized(req);
    // accessToken 만료
    if (!accessVerify) {
      const refreshVerify = refreshAuthorized(req);
      // refreshToken 만료
      if (!refreshVerify) {
        res.status(401).json({ message: 'Send new Login Request' });
      }
      // refreshToken 유효
      else {
        delete refreshVerify.exp;
        const accessToken = generateAccessToken(refreshVerify);
        const userInfo = await user.findOne({
          where: { id: refreshVerify.id },
        });
        let path = userInfo.dataValues.userPic.split('/')[4];
        s3.deleteObject(
          {
            Bucket: 'jurimma.com',
            Key: path,
          },
          (err, data) => {
            if (err) {
              throw err;
            }
            console.log('deleted', data);
          }
        );

        userInfo.userPic = req.file.location;
        await userInfo.save();
        res.status(201).json({ accessToken, userPic: req.file.location });
      }
    }
    // accessToken 유효
    else {
      console.log(req.file.key);
      const userInfo = await user.findOne({ where: { id: accessVerify.id } });
      let path = userInfo.dataValues.userPic.split('/')[4];
      // 기존에 저장되어있던 데이터 s3에서 삭제
      s3.deleteObject(
        {
          Bucket: 'jurimma.com',
          Key: path,
        },
        (err, data) => {
          if (err) {
            throw err;
          }
          console.log('deleted', data);
        }
      );
      userInfo.userPic = req.file.location;
      await userInfo.save();
      res.status(200).json({ userPic: req.file.location });
    }
  },
};
