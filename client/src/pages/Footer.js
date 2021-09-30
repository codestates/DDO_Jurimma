// footer 부분
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import swal from 'sweetalert';
import '../App.css';
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';

const FooterBarWrap = styled.footer`
  width: 100%;
  height: auto;
  background-color: #000;
  box-sizing: border-box;
  margin-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterBar = styled.div`
  width: 90%;
  min-height: 200px;
  height: auto;
  display: flex;
  flex-direction: row;
  padding: 30px 0;
  @media only screen and (max-width: 400px) {
    flex-direction: column;
    font-size: 12px;
  }
  > .footerMenu {
    flex: 1 1 auto;
    /* margin-left: 10px; */
    color: #fff;
    font-family: 'NEXON Lv2 Gothic Bold';
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    > .footerTitle {
      color: #fff;
      font-family: 'NEXON Lv2 Gothic Bold';
      padding-bottom: 10px;
    }
    > ul {
      width: 100%;
      min-height: 112px;
    }
    > ul {
      width: 100%;
      min-height: 112px;
    }
    > ul > li {
      padding-bottom: 10px;
      > a {
        text-align: left;
        text-decoration: none;
        color: #fff;
      }
    }
    > #socialMediaList {
      display: flex;
      > ul > li {
        padding-bottom: 0;
        > a {
          display: block;
          width: 46px;
          height: 46px;
          font-size: 46px;
          color: #fff;
        }
      }
      > li {
        width: 46px;
        height: 46px;
        font-size: 46px;
        color: #fff;
      }
    }
  }
  @media only screen and (max-width: 400px) {
    > .footerMenu:nth-child(1) {
      margin-bottom: 20px;
      > ul {
        min-height: 46px;
      }
    }
    > .footerMenu:nth-child(2) {
      margin-bottom: 20px;
      > ul {
        min-height: 92px;
      }
    }
    > .footerMenu:nth-child(3) {
      > ul {
        min-height: 46px;
      }
    }
  }
`;

function Footer() {
  const clickInsta = (event) => {
    event.preventDefault();
    swal({
      title: '아직 준비중입니다.',
      text: '다음 번에 이용해주세요.',
      icon: 'warning',
    });
  };
  return (
    <FooterBarWrap>
      <FooterBar>
        <div className='footerMenu'>
          <div className='footerTitle'>ABOUT US</div>
          <ul>
            <li>
              <a
                target='_blank'
                rel='noreferrer'
                href='https://github.com/codestates/DDO_Jurimma'
              >
                HOME
              </a>
            </li>
            <li>
              <a
                target='_blank'
                rel='noreferrer'
                href='https://github.com/codestates/DDO_Jurimma/wiki'
              >
                WIKI
              </a>
            </li>
          </ul>
        </div>
        <div className='footerMenu'>
          <div className='footerTitle'>CONTACT</div>
          <ul>
            <li>
              <a
                target='_blank'
                rel='noreferrer'
                href='https://github.com/Youngseo-kangg'
              >
                FRONT - 강영서
              </a>
            </li>
            <li>
              <a
                target='_blank'
                rel='noreferrer'
                href='https://github.com/minjman2659'
              >
                BACK - 김민재
              </a>
            </li>
            <li>
              <a
                target='_blank'
                rel='noreferrer'
                href='https://github.com/mniYUNSU'
              >
                BACK - 배윤수
              </a>
            </li>
            <li>
              <a
                target='_blank'
                rel='noreferrer'
                href='https://github.com/Lee-Na-eun'
              >
                FRONT - 이나은
              </a>
            </li>
          </ul>
        </div>
        <div className='footerMenu'>
          <div className='footerTitle'>Social Media</div>
          <ul id='socialMediaList'>
            <li>
              <a
                href='#!'
                target='_blank'
                rel='noreferrer'
                onClick={(event) => clickInsta(event)}
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a
                target='_blank'
                rel='noreferrer'
                href='https://github.com/codestates/DDO_Jurimma'
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
          </ul>
        </div>
      </FooterBar>
    </FooterBarWrap>
  );
}

export default Footer;
