const { user, content, word, thumbsups } = require('../../models');
const {
  generateAccessToken,
  isAuthorized,
} = require('../tokenFunction/accessToken');
const { refreshAuthorized } = require('../tokenFunction/refreshToken');

module.exports = {
  get: async (req, res) => {
    const { offset, limit } = req.query;
    const wordName = req.query.word;
    console.log(wordName, offset, limit);

    //! 메인 페이지의 검색 Top 3
    if (limit !== 10) {
      const coWordName = await word.findOne({
        where: { wordName: wordName },
      });
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
    // try {
    //   const { wordName } = req.query;
    // const coWordName = await word.findOne({
    //   where: { wordName: wordName },
    // });
    // await coWordName.increment('count');
    // // console.log('확인 : ', coWordName.wordName);
    // const coContents = await content.findAll({
    //   where: { wordId: coWordName.id },
    // });
    // const sortedContents = coContents
    //   .sort((a, b) => b.thumbsup - a.thumbsup)
    //   .slice(0, 3);
    // // console.log('s : ', sortedContents);
    // const returnData = sortedContents.map((el) => {
    //   el.dataValues.wordName = wordName;
    //   return el;
    // });
    // // console.log('r : ', returnData);
    // res.status(200).json({
    //   data: returnData,
    // });
    // } catch (err) {
    //   console.log(err);
    //   res.status(404).json({ message: 'Not Found!' });
    // }
  },

  // get: async (req, res) => {
  //   //! 더보기 페이지의 검색 10개
  //   const accessTokenCheck = isAuthorized(req);
  //   const refreshTokenCheck = refreshAuthorized(req);

  //   if (accessTokenCheck) {
  //     // accessToken이 만료되지 않았을 경우,
  //     // => 바로 요청에 대한 응답 제공
  //     try {
  //       const { wordName } = req.query;
  //       const coWordName = await word.findOne({
  //         where: { wordName: wordName },
  //       });
  //       const coContents = await content.findAll({
  //         where: { wordId: coWordName.id },
  //       });
  //       coContents.sort((a, b) => b.thumbsup - a.thumbsup);
  //       const returnData = coContents.map((el) => {
  //         el.dataValues.wordName = wordName;
  //         return el;
  //       });
  //       // console.log('sorted returnData : ', returnData);
  //       const onlyContentId = coContents.map((el) => el.id);
  //       // console.log('onlyContentId : ', onlyContentId);
  //       const allUserContents = await user_contents.findAll({
  //         attributes: ['id', 'user_Id', 'content_Id', 'createdAt', 'updatedAt'],
  //       });
  //       // console.log('allUserContents : ', allUserContents);
  //       const thumbsupData = {};
  //       for (let i = 0; i < allUserContents.length; i++) {
  //         if (onlyContentId.includes(allUserContents[i].content_Id)) {
  //           if (!(allUserContents[i].content_Id in thumbsupData)) {
  //             const userData = await user.findOne({
  //               where: { id: allUserContents[i].user_Id },
  //             });
  //             thumbsupData[allUserContents[i].content_Id] = [userData.username];
  //           } else {
  //             thumbsupData[allUserContents[i].content_Id].push(
  //               allUserContents[i].user_Id
  //             );
  //           }
  //         }
  //       }
  //       res.status(200).json({
  //         data: returnData,
  //         thumbsupData: thumbsupData,
  //       });
  //     } catch (err) {
  //       console.log(err);
  //       res.status(404).json({ message: 'Not Found!' });
  //     }
  //   } else {
  //     if (refreshTokenCheck) {
  //       // accessToken이 만료되어서 refreshToken을 판별하고,
  //       // refreshToken은 만료되지 않았을 경우,
  //       // => 요청에 대한 응답과 함께 새로 만든 accessToken 발급
  //       delete refreshTokenCheck.exp;
  //       const accessToken = generateAccessToken(refreshTokenCheck);

  //       try {
  //         const { wordName } = req.query;
  //         const coWordName = await word.findOne({
  //           where: { wordName: wordName },
  //         });
  //         const coContents = await content.findAll({
  //           where: { wordId: coWordName.id },
  //         });
  //         coContents.sort((a, b) => b.thumbsup - a.thumbsup);
  //         const returnData = coContents.map((el) => {
  //           el.dataValues.wordName = wordName;
  //           return el;
  //         });
  //         // console.log('sorted returnData : ', returnData);
  //         const onlyContentId = coContents.map((el) => el.id);
  //         // console.log('onlyContentId : ', onlyContentId);
  //         const allUserContents = await user_contents.findAll({
  //           attributes: [
  //             'id',
  //             'user_Id',
  //             'content_Id',
  //             'createdAt',
  //             'updatedAt',
  //           ],
  //         });
  //         // console.log('allUserContents : ', allUserContents);
  //         const thumbsupData = {};
  //         for (let i = 0; i < allUserContents.length; i++) {
  //           if (onlyContentId.includes(allUserContents[i].content_Id)) {
  //             if (!(allUserContents[i].content_Id in thumbsupData)) {
  //               const userData = await user.findOne({
  //                 where: { id: allUserContents[i].user_Id },
  //               });
  //               thumbsupData[allUserContents[i].content_Id] = [
  //                 userData.username,
  //               ];
  //             } else {
  //               thumbsupData[allUserContents[i].content_Id].push(
  //                 allUserContents[i].user_Id
  //               );
  //             }
  //           }
  //         }
  //         res.status(201).json({
  //           accessToken: accessToken,
  //           data: returnData,
  //           thumbsupData: thumbsupData,
  //         });
  //       } catch (err) {
  //         console.log(err);
  //         res.status(404).json({ message: 'Not Found!' });
  //       }
  //     } else {
  //       // accessToken이 만료되어서 refreshToken을 판별하고,
  //       // refreshToken도 만료되었을 경우,
  //       // 클라이언트에게 다시 로그인을 하라는 메시지 응답을 보낸다.
  //       res.status(401).json({ message: 'Send new Login Request' });
  //     }
  //   }
  // },
};
