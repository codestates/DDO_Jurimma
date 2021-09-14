const { user, content, word, user_contents } = require('../../models');
const {
  isAuthorized,
  generateAccessToken,
} = require('../tokenFunction/accessToken');
const { refreshAuthorized } = require('../tokenFunction/refreshToken');

module.exports = {
  get: async (req, res) => {
    const accIsValid = isAuthorized(req);
    if (!accIsValid) {
      // accessToken 만료 / refreshToken 만료
      if (!refreshAuthorized(req)) {
        res.status(401).json({ message: 'Send new Login Request' });
      }
      // accessToken 만료 / refreshToken 유효
      else {
        const userData = refreshAuthorized(req);
        delete userData.exp;
        const accessToken = generateAccessToken(userData);
        const myData = await content.findAll({
          where: { userId: userData.id },
        });
        const tmpUserInfo = await user.findOne({
          where: { id: userData.id },
        });
        const userInfo = {
          userId: tmpUserInfo.id,
          email: tmpUserInfo.email,
          username: tmpUserInfo.username,
          userPic: tmpUserInfo.userPic,
          experience: tmpUserInfo.experience,
          quizDate: tmpUserInfo.quizDate,
          emailAuth: tmpUserInfo.emailAuth,
        };
        // console.log(userInfo);
        // 작성한 글이 없는 경우
        if (myData.length === 0) {
          res.status(201).json({
            accessToken: accessToken,
            data: myData,
            userInfo: userInfo,
          });
        } else {
          for (let el of myData) {
            const wordName = await word.findOne({
              where: { id: el.wordId },
            });
            el.dataValues.wordName = wordName.dataValues.wordName;
          }
          res.status(201).json({
            accessToken: accessToken,
            data: myData,
            userInfo: userInfo,
          });
        }
      }
    } else {
      // accessToken 유효 / refreshToken 유효
      const myData = await content.findAll({
        where: { userId: accIsValid.id },
      });
      // console.log(myData);
      const tmpUserInfo = await user.findOne({
        where: { id: accIsValid.id },
      });
      const userInfo = {
        userId: tmpUserInfo.id,
        email: tmpUserInfo.email,
        username: tmpUserInfo.username,
        userPic: tmpUserInfo.userPic,
        experience: tmpUserInfo.experience,
        quizDate: tmpUserInfo.quizDate,
        emailAuth: tmpUserInfo.emailAuth,
      };
      // console.log(userInfo);
      // 작성한 글이 없는 경우
      if (myData.length === 0) {
        res.status(200).json({ data: myData, userInfo: userInfo });
      } else {
        for (let el of myData) {
          const wordName = await word.findOne({
            where: { id: el.wordId },
          });
          el.dataValues.wordName = wordName.dataValues.wordName;
        }
        res.status(200).json({ data: myData, userInfo: userInfo });
      }
    }
  },

  post: async (req, res) => {
    const accessTokenCheck = isAuthorized(req);
    const refreshTokenCheck = refreshAuthorized(req);

    if (accessTokenCheck) {
      // accessToken이 만료되지 않았을 경우,
      // => 바로 요청에 대한 응답 제공
      const { experience, userId, wordName, wordMean } = req.body;
      const [newOrFind, created] = await word.findOrCreate({
        where: { wordName: wordName },
        defaults: { count: 0 },
      });
      await content.create({
        wordId: newOrFind.id,
        wordMean: wordMean,
        thumbsup: 0,
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

        const { experience, userId, wordName, wordMean } = req.body;
        const [newOrFind, created] = await word.findOrCreate({
          where: { wordName: wordName },
          defaults: { count: 0 },
        });
        await content.create({
          wordId: newOrFind.id,
          wordMean: wordMean,
          thumbsup: 0,
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
        // accessToken이 만료되어서 refreshToken을 판별하고,
        // refreshToken도 만료되었을 경우,
        // 클라이언트에게 다시 로그인을 하라는 메시지 응답을 보낸다.
        res.status(401).json({ message: 'Send new Login Request' });
      }
    }
  },

  patch: async (req, res) => {
    const accessTokenCheck = isAuthorized(req);
    const refreshTokenCheck = refreshAuthorized(req);

    if (accessTokenCheck) {
      // accessToken이 만료되지 않았을 경우,
      // => 바로 요청에 대한 응답 제공
      const { contentId, wordMean } = req.body;
      const oldContent = await content.findOne({
        where: { id: contentId },
      });
      // console.log('oldContent : ', oldContent);
      oldContent.wordMean = wordMean;
      await oldContent.save();
      const allMyContents = await content.findAll({
        where: { userId: accessTokenCheck.id },
      });
      // console.log('allMyContents 1 : ', allMyContents);
      for (let el of allMyContents) {
        // console.log('el.wordId : ', el.wordId);
        const matchingWord = await word.findOne({
          where: { id: el.wordId },
        });
        // console.log('matchingWord : ', matchingWord.dataValues.wordName);
        el.dataValues.wordName = matchingWord.dataValues.wordName;
      }
      // console.log('allMyContents 2 : ', allMyContents);
      res.status(200).json({ data: allMyContents });
    } else {
      // accessToken이 만료되어서 refreshToken을 판별하고,
      // refreshToken은 만료되지 않았을 경우,
      // => 요청에 대한 응답과 함께 새로 만든 accessToken 발급
      if (refreshTokenCheck) {
        delete refreshTokenCheck.exp;
        const accessToken = generateAccessToken(refreshTokenCheck);

        const { contentId, wordMean } = req.body;
        const oldContent = await content.findOne({
          where: { id: contentId },
        });
        oldContent.wordMean = wordMean;
        await oldContent.save();
        const allMyContents = await content.findAll({
          where: { userId: refreshTokenCheck.id },
        });
        // console.log('allMyContents 1 : ', allMyContents);
        for (let el of allMyContents) {
          // console.log('el.wordId : ', el.wordId);
          const matchingWord = await word.findOne({
            where: { id: el.wordId },
          });
          // console.log('matchingWord : ', matchingWord.dataValues.wordName);
          el.dataValues.wordName = matchingWord.dataValues.wordName;
        }
        // console.log('allMyContents 2 : ', allMyContents);
        res.status(201).json({
          accessToken: accessToken,
          data: allMyContents,
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

    if (accessTokenCheck) {
      // accessToken이 만료되지 않았을 경우,
      // => 바로 요청에 대한 응답 제공
      const { contentId } = req.body;
      const deletedContent = await content.findOne({
        where: { id: contentId },
      });
      await content.destroy({
        where: { id: contentId },
        force: true,
      });
      await user_contents.destroy({
        where: { content_Id: contentId },
        force: true,
      });
      // console.log('deletedContent : ', deletedContent.wordId);
      const findSameWordId = await content.findAll({
        where: { wordId: deletedContent.wordId },
      });
      // console.log('findSameWordId : ', findSameWordId);
      if (findSameWordId.length === 0) {
        await word.destroy({
          where: { id: deletedContent.wordId },
          force: true,
        });
      }
      const allMyContents = await content.findAll({
        where: { userId: accessTokenCheck.id },
      });
      // console.log('allMyContents 1 : ', allMyContents);
      for (let el of allMyContents) {
        // console.log('el.wordId : ', el.wordId);
        const matchingWord = await word.findOne({
          where: { id: el.wordId },
        });
        // console.log('matchingWord : ', matchingWord.dataValues.wordName);
        el.dataValues.wordName = matchingWord.dataValues.wordName;
      }
      // console.log('allMyContents 2 : ', allMyContents);
      res.status(200).json({ data: allMyContents });
    } else {
      // accessToken이 만료되어서 refreshToken을 판별하고,
      // refreshToken은 만료되지 않았을 경우,
      // => 요청에 대한 응답과 함께 새로 만든 accessToken 발급
      if (refreshTokenCheck) {
        delete refreshTokenCheck.exp;
        const accessToken = generateAccessToken(refreshTokenCheck);

        const { contentId } = req.body;
        const deletedContent = await content.findOne({
          where: { id: contentId },
        });
        await content.destroy({
          where: { id: contentId },
          force: true,
        });
        await user_contents.destroy({
          where: { content_Id: contentId },
          force: true,
        });
        // console.log('deletedContent : ', deletedContent.wordId);
        const findSameWordId = await content.findAll({
          where: { wordId: deletedContent.wordId },
        });
        // console.log('findSameWordId : ', findSameWordId);
        if (findSameWordId.length === 0) {
          await word.destroy({
            where: { id: deletedContent.wordId },
            force: true,
          });
        }
        const allMyContents = await content.findAll({
          where: { userId: refreshTokenCheck.id },
        });
        // console.log('allMyContents 1 : ', allMyContents);
        for (let el of allMyContents) {
          // console.log('el.wordId : ', el.wordId);
          const matchingWord = await word.findOne({
            where: { id: el.wordId },
          });
          // console.log('matchingWord : ', matchingWord.dataValues.wordName);
          el.dataValues.wordName = matchingWord.dataValues.wordName;
        }
        // console.log('allMyContents 2 : ', allMyContents);
        res.status(201).json({
          accessToken: accessToken,
          data: allMyContents,
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
