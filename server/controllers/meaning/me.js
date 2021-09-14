const { user, content, word, thumbsups } = require('../../models');
const {
  isAuthorized,
  generateAccessToken,
} = require('../tokenFunction/accessToken');
const { refreshAuthorized } = require('../tokenFunction/refreshToken');

module.exports = {
  get: async (req, res) => {
    const accessTokenCheck = isAuthorized(req);
    const refreshTokenCheck = refreshAuthorized(req);
    if (!accessTokenCheck) {
      // accessToken 만료 / refreshToken 만료
      if (!refreshTokenCheck) {
        res.status(401).json({ message: 'Send new Login Request' });
      }
      // accessToken 만료 / refreshToken 유효
      else {
        delete refreshTokenCheck.exp;
        const accessToken = generateAccessToken(refreshTokenCheck);
        const myData = await content.findAll({
          attributes: ['id', 'wordMean', 'userId', 'wordId'],
          where: { userId: refreshTokenCheck.id },
        });
        //! 내가 쓴 글이 아무것도 존재하지 않는 경우
        if (!myData) {
          res.status(201).json({ accessToken, data: [] });
        }
        //! 내가 쓴 글이 존재하는 경우
        else {
          const contentsId = myData.map((el) => el.dataValues);
          const thumbsupData = [];
          const wordNameRes = [];
          for (let i = 0; i < contentsId.length; i++) {
            let thumbsupContent = await thumbsups.findAll({
              attributes: ['userId', 'contentId'],
              where: { contentId: contentsId[i].id },
            });
            const thumbsupResult = thumbsupContent.map((el) => el.dataValues);
            thumbsupData.push(thumbsupResult);
            const coWordName = await word.findOne({
              attributes: ['wordName'],
              where: { id: contentsId[i].wordId },
            });
            wordNameRes.push(coWordName);
            console.log('coWordName : ', coWordName);
            console.log('thumbsupResult : ', thumbsupResult);
          }

          console.log('contentsId : ', contentsId);
          console.log('thumbsupData : ', thumbsupData);
          console.log('wordNameRes : ', wordNameRes);

          const returnData = contentsId.map((el) => {
            el.wordName = '';
            return el;
          });
          for (let i = 0; i < returnData.length; i++) {
            returnData[i].wordName = wordNameRes[i];
          }
          for (let i = 0; i < returnData.length; i++) {
            returnData[i].thumbsup = thumbsupData[i];
          }
          console.log('returnData : ', returnData);
          console.log(returnData[3].thumbsup);
          res.status(201).json({ accessToken, data: returnData });
        }
      }
    }
    // ! accessToken 존재 (200)
    else {
      const myData = await content.findAll({
        attributes: ['id', 'wordMean', 'userId', 'wordId'],
        where: { userId: accessTokenCheck.id },
      });
      //! 내가 쓴 글이 아무것도 존재하지 않는 경우
      if (!myData) {
        res.status(200).json({ data: [] });
      }
      //! 내가 쓴 글이 존재하는 경우
      else {
        const contentsId = myData.map((el) => el.dataValues);
        const thumbsupData = [];
        const wordNameRes = [];
        for (let i = 0; i < contentsId.length; i++) {
          let thumbsupContent = await thumbsups.findAll({
            attributes: ['userId', 'contentId'],
            where: { contentId: contentsId[i].id },
          });
          const thumbsupResult = thumbsupContent.map((el) => el.dataValues);
          thumbsupData.push(thumbsupResult);
          const coWordName = await word.findOne({
            attributes: ['wordName'],
            where: { id: contentsId[i].wordId },
          });
          wordNameRes.push(coWordName.dataValues.wordName);
          // console.log('coWordName : ', coWordName);
          // console.log('thumbsupResult : ', thumbsupResult);
        }

        // console.log('contentsId : ', contentsId);
        // console.log('thumbsupData : ', thumbsupData);
        console.log('wordNameRes : ', wordNameRes);

        const returnData = contentsId.map((el) => {
          el.wordName = '';
          return el;
        });
        for (let i = 0; i < returnData.length; i++) {
          returnData[i].wordName = wordNameRes[i];
        }
        for (let i = 0; i < returnData.length; i++) {
          returnData[i].thumbsup = thumbsupData[i];
        }
        console.log('returnData : ', returnData);
        // console.log(returnData[3].thumbsup);
        res.status(200).json({ data: returnData });
      }
    }
  },

  post: async (req, res) => {
    const accessTokenCheck = isAuthorized(req);
    const refreshTokenCheck = refreshAuthorized(req);
    const { experience, wordName, wordMean } = req.body;

    if (accessTokenCheck) {
      // accessToken이 만료되지 않았을 경우,
      // => 바로 요청에 대한 응답 제공
      const userId = accessTokenCheck.id;
      const [newOrFind, created] = await word.findOrCreate({
        where: { wordName: wordName },
        defaults: { count: 0 },
      });
      await content.create({
        wordId: newOrFind.id,
        wordMean: wordMean,
        userId: userId,
      });
      const userInfo = await user.findOne({
        where: { id: userId },
      });
      userInfo.experience = experience;
      await userInfo.save();
      res.status(200).json({ message: 'ok' });
    } else {
      // accessToken이 만료되어서 refreshToken을 판별하고,
      // refreshToken은 만료되지 않았을 경우,
      // => 요청에 대한 응답과 함께 새로 만든 accessToken 발급
      if (refreshTokenCheck) {
        delete refreshTokenCheck.exp;
        const accessToken = generateAccessToken(refreshTokenCheck);
        const userId = refreshTokenCheck.id;
        const [newOrFind, created] = await word.findOrCreate({
          where: { wordName: wordName },
          defaults: { count: 0 },
        });
        await content.create({
          wordId: newOrFind.id,
          wordMean: wordMean,
          userId: userId,
        });
        const userInfo = await user.findOne({
          where: { id: userId },
        });
        userInfo.experience = experience;
        await userInfo.save();
        res.status(201).json({
          accessToken: accessToken,
          message: 'ok',
        });
      } else {
        res.status(401).json({ message: 'Send new Login Request' });
      }
    }
  },

  patch: async (req, res) => {
    const accessTokenCheck = isAuthorized(req);
    const refreshTokenCheck = refreshAuthorized(req);
    const contentId = Number(req.query['content-id']);
    const { wordMean } = req.body;
    if (accessTokenCheck) {
      // accessToken이 만료되지 않았을 경우,
      // => 바로 요청에 대한 응답 제공
      const oldContent = await content.findOne({
        where: { id: contentId },
      });
      console.log('oldContent : ', oldContent);
      oldContent.wordMean = wordMean;
      await oldContent.save();
      res.status(200).json({ message: 'ok' });
    } else {
      // accessToken이 만료되어서 refreshToken을 판별하고,
      // refreshToken은 만료되지 않았을 경우,
      // => 요청에 대한 응답과 함께 새로 만든 accessToken 발급
      if (refreshTokenCheck) {
        delete refreshTokenCheck.exp;
        const accessToken = generateAccessToken(refreshTokenCheck);
        const oldContent = await content.findOne({
          where: { id: contentId },
        });
        oldContent.wordMean = wordMean;
        await oldContent.save();
        res.status(201).json({
          accessToken: accessToken,
          message: 'ok',
        });
      } else {
        // accessToken이 만료되어서 refreshToken을 판별하고,
        // refreshToken도 만료되었을 경우,
        // 클라이언트에게 다시 로그인을 하라는 메시지 응답을 보낸다.
        res.status(401).json({ message: 'Send new Login Request' });
      }
    }
  },

  delete: async (req, res) => {
    const accessTokenCheck = isAuthorized(req);
    const refreshTokenCheck = refreshAuthorized(req);
    const contentId = Number(req.query['content-id']);
    if (accessTokenCheck) {
      // accessToken이 만료되지 않았을 경우,
      // => 바로 요청에 대한 응답 제공
      const deletedContent = await content.findOne({
        where: { id: contentId },
      });
      await content.destroy({
        where: { id: contentId },
        force: true,
      });
      await thumbsups.destroy({
        where: { contentId: contentId },
        force: true,
      });
      const findSameWordId = await content.findAll({
        where: { wordId: deletedContent.wordId },
      });
      if (findSameWordId.length === 0) {
        await word.destroy({
          where: { id: deletedContent.wordId },
          force: true,
        });
      }

      res.status(200).json({ message: 'ok' });
    } else {
      // accessToken이 만료되어서 refreshToken을 판별하고,
      // refreshToken은 만료되지 않았을 경우,
      // => 요청에 대한 응답과 함께 새로 만든 accessToken 발급
      if (refreshTokenCheck) {
        delete refreshTokenCheck.exp;
        const accessToken = generateAccessToken(refreshTokenCheck);
        const deletedContent = await content.findOne({
          where: { id: contentId },
        });
        await content.destroy({
          where: { id: contentId },
          force: true,
        });
        await thumbsups.destroy({
          where: { contentId: contentId },
          force: true,
        });
        const findSameWordId = await content.findAll({
          where: { wordId: deletedContent.wordId },
        });
        if (findSameWordId.length === 0) {
          await word.destroy({
            where: { id: deletedContent.wordId },
            force: true,
          });
        }
        res.status(201).json({
          accessToken: accessToken,
          message: 'ok',
        });
      } else {
        // accessToken이 만료되어서 refreshToken을 판별하고,
        // refreshToken도 만료되었을 경우,
        // 클라이언트에게 다시 로그인을 하라는 메시지 응답을 보낸다.
        res.status(401).json({ message: 'Send new Login Request' });
      }
    }
  },
};