// footer 부분
import styled from 'styled-components';

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
`;

function Footer() {
  return (
    <FooterBarWrap>
      <FooterBar></FooterBar>
    </FooterBarWrap>
  );
}

export default Footer;
