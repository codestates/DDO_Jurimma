const { user, content, user_contents, word } = require('../../models');
const { isAuthorized } = require('../tokenFunction/accessToken');

module.exports = {
  delete: async (req, res) => {
    const userData = isAuthorized(req);
    // accessToken이 만료된 경우 invalid access token 리턴
    if (!userData) {
      res.status(401).json({ message: 'invalid access token' });
    }
    // 그 외의 경우 ok
    else {
      // user 테이블의 해당 유저의 id로 저장된 레코드 삭제
      await user.destroy({ where: { id: userData.id }, force: true });
      res.status(200).json({ message: 'ok' });
      // content 테이블의 해당 유저의 id로 저장된 레코드 삭제
      await content.destroy({ where: { userId: userData.id }, force: true });
      // user_contents 테이블의 해당 유저의 id로 저장된 레코드 삭제
      await user_contents.destroy({
        where: { user_Id: userData.id },
        force: true,
      });
      // word 테이블은 wordName과 count만 있음.
      // content의 wordId에 해당하는 레코드를 지우면, 다른 유저가 쓴 같은 뜻도 사라지게 되므로 word 테이블은 건들지 않음.
    }
  },
};
