const { user } = require('../../models');
const {
  isAuthorized,
  generateAccessToken,
} = require('../tokenFunction/accessToken');
const { refreshAuthorized } = require('../tokenFunction/refreshToken');
const aws = require('aws-sdk');

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
  region: 'ap-northeast-2',
});

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
        if (userInfo.dataValues.userPic) {
          const decode = decodeURI(userInfo.dataValues.userPic);
          let path = decode.split('/')[4];
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
        }
        userInfo.userPic = req.file.location;
        await userInfo.save();
        res.status(201).json({ accessToken, userPic: req.file.location });
      }
    }
    // accessToken 유효
    else {
      const userInfo = await user.findOne({ where: { id: accessVerify.id } });
      if (userInfo.dataValues.userPic) {
        const decode = decodeURI(userInfo.dataValues.userPic);
        let path = decode.split('/')[4];
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
      }
      userInfo.userPic = req.file.location;
      await userInfo.save();
      res.status(200).json({ userPic: req.file.location });
    }
  },
};
