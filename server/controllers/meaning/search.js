const { content, word, thumbsups } = require('../../models');
const {
  generateAccessToken,
  isAuthorized,
} = require('../tokenFunction/accessToken');
const { refreshAuthorized } = require('../tokenFunction/refreshToken');

module.exports = {
  get: async (req, res) => {
    const wordName = req.query.word;
    const offset = Number(req.query.offset);
    const limit = Number(req.query.limit);

    console.log(wordName, offset, limit);

    //! 메인 페이지의 검색 Top 3
    if (limit === 3) {
      const coWordName = await word.findOne({
        where: { wordName: wordName },
      });
      //! 검색 결과가 아무것도 존재하지 않는 경우
      if (!coWordName) {
        res.status(404).json({ message: 'Not Found!' });
      }
      //! 검색 결과가 존재하는 경우
      else {
        await coWordName.increment('count');
        const coContents = await content.findAll({
          attributes: ['id', 'wordMean', 'userId', 'wordId'],
          where: { wordId: coWordName.id },
        });
        const contentsId = coContents.map((el) => el.dataValues);
        const thumbsupData = [];
        for (let i = 0; i < contentsId.length; i++) {
          let thumbsupContent = await thumbsups.findAll({
            attributes: ['userId', 'contentId'],
            where: { contentId: contentsId[i].id },
          });
          const thumbsupResult = thumbsupContent.map((el) => el.dataValues);
          thumbsupData.push(thumbsupResult);
          console.log('thumbsupResult : ', thumbsupResult);
        }

        console.log('contentsId : ', contentsId);
        console.log('thumbsupData : ', thumbsupData);

        const returnData = contentsId.map((el) => {
          el.wordName = wordName;
          return el;
        });
        for (let i = 0; i < returnData.length; i++) {
          returnData[i].thumbsup = thumbsupData[i];
        }
        console.log('returnData : ', returnData);
        console.log(returnData[3].thumbsup);
        const sortedResult = returnData
          .sort((a, b) => b.thumbsup.length - a.thumbsup.length)
          .slice(0, 3);
        console.log('sortedResult : ', sortedResult);
        console.log('sortedResultThumbsup : ', sortedResult[0].thumbsup);
        res.status(200).json({ data: sortedResult });
      }
    }

    //! 메인 페이지의 검색 Top 3
    else {
      console.log(wordName, offset, limit);
      console.log(offset + limit);
      const accessTokenCheck = isAuthorized(req);
      const refreshTokenCheck = refreshAuthorized(req);
      // ! accessToken이 만료되지 않았을 경우,
      // ! => 바로 요청에 대한 응답 제공
      if (accessTokenCheck) {
        const coWordName = await word.findOne({
          where: { wordName: wordName },
        });
        //! 검색 결과가 아무것도 존재하지 않는 경우
        if (!coWordName) {
          res.status(404).json({ message: 'Not Found!' });
        }
        //! 검색 결과가 존재하는 경우
        else {
          await coWordName.increment('count');
          const coContents = await content.findAll({
            attributes: ['id', 'wordMean', 'userId', 'wordId'],
            where: { wordId: coWordName.id },
          });
          const contentsId = coContents.map((el) => el.dataValues);
          const thumbsupData = [];
          for (let i = 0; i < contentsId.length; i++) {
            let thumbsupContent = await thumbsups.findAll({
              attributes: ['userId', 'contentId'],
              where: { contentId: contentsId[i].id },
            });
            const thumbsupResult = thumbsupContent.map((el) => el.dataValues);
            thumbsupData.push(thumbsupResult);
            console.log('thumbsupResult : ', thumbsupResult);
          }

          console.log('contentsId : ', contentsId);
          console.log('thumbsupData : ', thumbsupData);

          const returnData = contentsId.map((el) => {
            el.wordName = wordName;
            return el;
          });
          for (let i = 0; i < returnData.length; i++) {
            returnData[i].thumbsup = thumbsupData[i];
          }
          console.log('returnData : ', returnData);
          console.log(returnData[3].thumbsup);
          const sortedResult = returnData
            .sort((a, b) => b.thumbsup.length - a.thumbsup.length)
            .slice(offset, offset + limit);
          console.log('sortedResult : ', sortedResult);
          res.status(200).json({ data: sortedResult });
        }
      } else {
        // ! access 만료 / refresh 유효 (201)
        if (refreshTokenCheck) {
          delete refreshTokenCheck.exp;
          const accessToken = generateAccessToken(refreshTokenCheck);
          const coWordName = await word.findOne({
            where: { wordName: wordName },
          });
          //! 검색 결과가 아무것도 존재하지 않는 경우
          if (!coWordName) {
            res.status(404).json({ message: 'Not Found!' });
          }
          //! 검색 결과가 존재하는 경우
          else {
            await coWordName.increment('count');
            const coContents = await content.findAll({
              attributes: ['id', 'wordMean', 'userId', 'wordId'],
              where: { wordId: coWordName.id },
            });
            const contentsId = coContents.map((el) => el.dataValues);
            const thumbsupData = [];
            for (let i = 0; i < contentsId.length; i++) {
              let thumbsupContent = await thumbsups.findAll({
                attributes: ['userId', 'contentId'],
                where: { contentId: contentsId[i].id },
              });
              const thumbsupResult = thumbsupContent.map((el) => el.dataValues);
              thumbsupData.push(thumbsupResult);
              console.log('thumbsupResult : ', thumbsupResult);
            }

            console.log('contentsId : ', contentsId);
            console.log('thumbsupData : ', thumbsupData);

            const returnData = contentsId.map((el) => {
              el.wordName = wordName;
              return el;
            });
            for (let i = 0; i < returnData.length; i++) {
              returnData[i].thumbsup = thumbsupData[i];
            }
            console.log('returnData : ', returnData);
            console.log(returnData[3].thumbsup);
            const sortedResult = returnData
              .sort((a, b) => b.thumbsup.length - a.thumbsup.length)
              .slice(offset, offset + limit);
            console.log('sortedResult : ', sortedResult);
            res.status(201).json({ accessToken, data: sortedResult });
          }
        }
        // ! access 만료 / refresh 만료 (401)
        else {
          res.status(401).json({ message: 'Send new Login Request' });
        }
      }
    }
  },
};
