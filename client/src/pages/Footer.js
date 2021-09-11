// footer 부분
import styled from 'styled-components';

const FooterBar = styled.footer`
  width: 100%;
  height: max(133.39px, 20vh);
  border: 1px solid red;
  box-sizing: border-box;
`;

function Footer() {
  return <FooterBar>this is footer</FooterBar>;
}

export default Footer;
