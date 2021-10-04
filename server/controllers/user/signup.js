const { user } = require('../../models');
const { encryptPwd } = require('../hashing/hashingPwd');
const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {
  post: async (req, res) => {
    // 유효성 검사 및 누락 정보들에 대한 경우는 클라이언트에서 사전 검증
    // email이 중복되는지도 checkEmail.js에서 검증함
    // 회원가입 완료
    const newUserData = req.body;
    const { email, password, username } = newUserData;
    const encryptedPw = encryptPwd(password);
    console.log('encrypted :', encryptedPw);
    // 보낼 메일의 이메일 제목
    const title = 'JURIMMA 회원 가입 인증 메일';
    // 보낼 메일의 본문 텍스트
    const desc = `JURIMMA의 회원이 되어주셔서 굉장히 감사드립니다! 😍 <br/><br/> JURIMMA는 <b>${username}님</b>께서 등록한 줄임말들이 곧 컨텐츠이며, 자산입니다. <br/><br/> <b>${username}님</b>이 알고계신 줄임말들을 등록하여 많은 분들에게 알려주세요! <br/><br/> JURIMMA에 오신 것을 환영하며, 감사드립니다! 😁`;

    // 서버로 GET 요청을 보내기 위한 URL
    const URL = process.env.SERVER_URL || 'http://localhost:4000';

    // 메일 전송하기
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GOOGLE_MAIL,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    // 보낼 메일의 본문 메세지
    const MSG = {
      from: `JURIMMA <${process.env.GOOGLE_MAIL}>`,
      to: `${username}<${email}>`,
      subject: title,
      html: `<div
      style='
      text-align: center; 
      width: 80%; 
      height: 70%;
      margin: 10%;
      margin:auto;
      padding: 20px;
      border: 10px solid #230638;
      border-radius:30px;
      background:linear-gradient(#B4AEE8,#5f1f86);
      color:#fff;
      '>
      <h1>${title}</h1> <br/><h2>안녕하세요. ${username} 님! 만반잘부~👋 </h2> <br/>${desc} <br/><br/><br/>
      <div style='
      width: 100px;
      height: 40px;
      border:5px solid #000;
      line-height:40px;
      font-size:20px;
      padding: 10px 30px;
      text-align: center;
      margin:auto;
      border-radius:30px;
      background-color: rgba(255, 255, 255, 0.8);
      font-weight: bold;'>
      <a href='${URL}/user/${email}/verification'>인증하기</a></div></div>`,
    };

    // ! 메일이 보내진 후의 콜백함수
    transporter.sendMail(MSG, async (err) => {
      if (err) console.log(err);
      else {
        console.log('Email sent: ', email);
      }
      await user.create({
        email,
        password: encryptedPw,
        username,
      });

      // ! 2분이 지나도 이메일 인증 버튼을 누르지 않으면 생성된 유저 정보 삭제
      setTimeout(async () => {
        const isAuth = await user.findOne({ where: { email: email } });
        console.log('emailAuth : ', isAuth.emailAuth);
        if (!isAuth.emailAuth) {
          await user.destroy({ where: { email: email }, force: true });
        }
      }, 60 * 2 * 1000);

      res.status(200).json({ message: 'ok' });
      transporter.close();
    });
  },
};
