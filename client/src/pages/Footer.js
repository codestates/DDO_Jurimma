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

const FooterBar = styled.ul`
  width: 90%;
  height: 200px;
  margin: 0 auto;
  display: flex;
  > li {
    flex: 1 1 auto;
    margin-left: 10px;
    color: #fff;
    font-family: 'NEXON Lv2 Gothic Bold';
    text-align: center;
    padding-top: 50px;
    :nth-child(1) {
      margin-left: 0;
      flex: 0.07 1 auto;
      padding-top: 30px;
    }
    > #footerLogo {
      width: 90px;
      height: 90px;
      background: url(${whiteLogo});
    }
    > h3 {
      width: 100px;
      text-align: center;
      color: #fff;
      font-family: 'NEXON Lv2 Gothic Bold';
      padding-top: 10px;
    }
  }
`;

function Footer() {
  return (
    <FooterBarWrap>
      <FooterBar>
        <li>
          <div id='footerLogo'></div>
          <h3>JURIMMA</h3>
        </li>
        <li>ABOUT US</li>
        <li>CONTACT</li>
      </FooterBar>
    </FooterBarWrap>
  );
}

export default Footer;
