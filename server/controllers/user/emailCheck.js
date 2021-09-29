const { user } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const { email } = req.query;
    const emailCheck = await user.findOne({ where: { email: email } });
    // db에 저장된 user email 정보가 겹치는지 확인해야한다
    // user 테이블의 email들 중 하나라도 겹치면 409 error
    if (emailCheck) {
      res.status(409).json({ message: 'Already Existed' });
    }
    // 그 외는 ok
    else {
      res.status(200).json({ message: 'ok' });
    }
  },
};
