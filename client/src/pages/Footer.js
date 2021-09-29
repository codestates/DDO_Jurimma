// footer 부분
import styled from 'styled-components';
import whiteLogo from '../images/main_logoWhite.svg';
import '../App.css';

const FooterBarWrap = styled.footer`
  width: 100%;
  height: 200px;
  background-color: #000;
  box-sizing: border-box;
  margin-top: 150px;
`;

const FooterBar = styled.div`
  width: 90%;
  height: 200px;
  margin: 0 auto;
  display: flex;
  > .footerMenu {
    flex: 1 1 auto;
    margin-left: 10px;
    color: #fff;
    font-family: 'NEXON Lv2 Gothic Bold';
    padding-top: 50px;
    > li {
      > a {
        text-align: left;
        text-decoration: none;
        color: #fff;
      }
    }
  }
`;

function Footer() {
  return (
    <FooterBarWrap>
      <FooterBar>
        <div className='footerMenu'>
          ABOUT US
          <li>
            <a href='https://github.com/codestates/DDO_Jurimma'>HOME</a>
          </li>
          <li>
            <a href='https://github.com/codestates/DDO_Jurimma/wiki'>WIKI</a>
          </li>
        </div>
        <div className='footerMenu'>
          CONTACT
          <li>
            <a href='https://github.com/Youngseo-kangg'>FRONT - 강영서</a>
          </li>
          <li>
            <a href='https://github.com/minjman2659'>BACK - 김민재</a>
          </li>
          <li>
            <a href='https://github.com/mniYUNSU'>BACK - 배윤수</a>
          </li>
          <li>
            <a href='https://github.com/Lee-Na-eun'>FRONT - 이나은</a>
          </li>
        </div>
        <div className='footerMenu'>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</div>
      </FooterBar>
    </FooterBarWrap>
  );
}

export default Footer;
