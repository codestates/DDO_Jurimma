import styled from 'styled-components';
import '../App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import levelDia from '../images/LandingLevelDia.svg';
import levelGold from '../images/LandingLevelGold.svg';
import levelSilver from '../images/LandingLevelSilver.svg';

AOS.init();

const SectionWrap = styled.div`
  width: 100%;
`;

const Section2Box = styled.ul`
  width: 100%;
  > #firstLi {
    margin-top: 80px;
  }
`;

const Section2Li = styled.li`
  width: 100%;
  > #reverse {
    text-align: right;
    @media only screen and (max-width: 1300px) {
      display: flex;
      flex-direction: column-reverse;
    }
  }
`;

const DescriptWrap = styled.div`
  width: 1200px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-top: 200px;
  @media only screen and (max-width: 1300px) {
    width: 100%;
    display: block;
  }
  @media only screen and (max-width: 600px) {
    margin-top: 100px;
  }
`;

const DescripTextBox = styled.div`
  width: 500px;
  height: 525px;
  flex-direction: column;
  float: left;
  @media only screen and (max-width: 1300px) {
    width: 500px;
    height: 500px;
    float: none;
    margin: 0 auto;
  }
  @media only screen and (max-width: 600px) {
    width: 320px;
    height: 470px;
  }
`;

const DescripText = styled.div`
  width: 100%;
  height: 450px;
  @media only screen and (max-width: 1300px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  > h3 {
    font-size: 45px;
    color: #fff;
    padding: 40px 0;
    line-height: 60px;
    @media only screen and (max-width: 1300px) {
      text-align: center;
      font-size: 40px;
    }

    @media only screen and (max-width: 600px) {
      font-size: 30px;
      text-align: center;
    }
  }
  > p {
    font-size: 33px;
    line-height: 50px;
    color: #fff;
    @media only screen and (max-width: 1300px) {
      text-align: center;
      font-size: 28px;
    }
    @media only screen and (max-width: 600px) {
      font-size: 20px;
      text-align: center;
    }
  }
  > button {
    border-radius: 50px;
    height: 50px;
    width: 240px;
    background-color: transparent;
    border: 2px solid #fff;
    color: #fff;
    transition: 0.3s;
    cursor: pointer;
    margin-top: 50px;
    @media only screen and (max-width: 1300px) {
      width: 210px;
    }
    @media only screen and (max-width: 600px) {
      width: 150px;
      height: 40px;
    }
  }
  > button:hover {
    background-color: #fff;
    color: #230638;
    border: 2px solid #fff;
  }
`;

const DescriptGif = styled.div`
  width: 700px;
  height: 525px;
  background-color: #fff;
  border-radius: 40px;
  display: inline-block;
  @media only screen and (max-width: 1300px) {
    display: block;
    width: 536px;
    height: 402px;
    margin: 0 auto;
  }
  @media only screen and (max-width: 600px) {
    width: 320px;
    height: 240px;
    border-radius: 20px;
  }
`;

const LevelWrap = styled.div`
  width: 90%;
  height: 800px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-top: 100px;

  @media only screen and (max-width: 600px) {
    margin-top: 30px;
    height: 600px;
  }
`;

const Levelup = styled.div`
  width: 100%;
  height: 60%;
  > h3 {
    text-align: center;
    font-size: 45px;
    color: #fff;
    @media only screen and (max-width: 1300px) {
      font-size: 40px;
    }
    @media screen and (max-width: 600px) {
      font-size: 25px;
    }
  }
  > p {
    text-align: center;
    color: #fff;
    font-size: 25px;
    padding: 20px 0;
    @media only screen and (max-width: 1300px) {
      font-size: 18px;
    }
    @media screen and (max-width: 479px) {
      font-size: 15px;
    }
  }
  > ul {
    display: flex;
    width: 100%;
    height: 400px;
    margin-top: 50px;
    @media only screen and (max-width: 1300px) {
      height: 300px;
    }
    @media screen and (max-width: 600px) {
      height: 200px;
      margin-top: 10px;
    }
    > li {
      flex: 1 1 auto;
      height: 80%;
      margin-left: 5px;
    }
    > #silverLevel {
      background: url(${levelSilver});
      background-repeat: no-repeat;
      background-position: center;
    }
    > #goldLevel {
      background: url(${levelGold});
      background-repeat: no-repeat;
      background-position: center;
    }
    > #diaLevel {
      background: url(${levelDia});
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  > #descLevel {
    height: 20%;
    width: 100%;
    color: #fff;
    font-size: 30px;
    text-align: center;
    @media screen and (max-width: 600px) {
      font-size: 18px;
    }
  }
`;

const LevelGif = styled.div`
  width: 700px;
  height: 525px;
  background-color: #fff;
  border-radius: 40px;
  margin: 0 auto;
  @media only screen and (max-width: 1300px) {
    display: block;
    width: 536px;
    height: 402px;
  }
  @media only screen and (max-width: 600px) {
    width: 320px;
    height: 240px;
    border-radius: 20px;
  }
`;

function LandingSec2() {
  return (
    <SectionWrap>
      <Section2Box>
        {/* 메인페이지 및 검색기능 설명 */}
        <Section2Li
          id='firstLi'
          data-aos='fade-left'
          data-aos-duration='2000'
          data-aos-offset='300'
        >
          <DescriptWrap>
            <DescripTextBox>
              <DescripText>
                <h3>
                  알쏭달쏭한 줄임말을 <br /> 검색해보자! 🤔
                </h3>
                <p>
                  모르는 줄임말의 뜻도
                  <br />
                  인기 검색단어 TOP 10도
                  <br />
                  실시간으로 알아보자!
                </p>
                <button>바로가기</button>
              </DescripText>
            </DescripTextBox>
            <DescriptGif />
          </DescriptWrap>
        </Section2Li>
        {/* 더보기 페이지 설명 */}
        <Section2Li
          data-aos='fade-right'
          data-aos-duration='2000'
          data-aos-offset='300'
        >
          <DescriptWrap id='reverse'>
            <DescriptGif />
            <DescripTextBox id='descbox2'>
              <DescripText id='desctext'>
                <h3>
                  한 단어에 이렇게 많은 <br /> 뜻이 있다고?! 😯
                </h3>
                <p>
                  단어에 숨겨진 많은 의미를
                  <br />
                  다양하게 찾아보고
                  <br />
                  직접 뜻을 만들어서 공유해보자!
                </p>
                <button>바로가기</button>
              </DescripText>
            </DescripTextBox>
          </DescriptWrap>
        </Section2Li>
        {/* 화면 크기에 따른 반응형 웹 페이지 설명 */}
        <Section2Li
          data-aos='fade-left'
          data-aos-duration='2000'
          data-aos-offset='300'
        >
          <DescriptWrap>
            <DescripTextBox>
              <DescripText>
                <h3>
                  어디서든 즐길 수 있는
                  <br /> JURIMMA! 😎
                </h3>
                <p>
                  컴퓨터, 태블릿, 핸드폰등
                  <br />
                  다양한 화면에서 지원가능!
                  <br />
                  <br />
                  JURIMMA에 오신것을 환영합니다!
                </p>
              </DescripText>
            </DescripTextBox>
            <DescriptGif />
          </DescriptWrap>
        </Section2Li>

        {/* 레벨업에 따른 프로필 변경 */}
        <Section2Li
          data-aos='fade-up'
          data-aos-duration='2000'
          data-aos-offset='300'
        >
          <LevelWrap>
            <Levelup>
              <h3>꾸준한 활동으로 레벨업도 해보자! 👸</h3>
              <p>퀴즈와 나만의 줄임말 뜻을 공유하면 경험치 획득 가능.</p>
              <ul>
                <li
                  id='silverLevel'
                  data-aos='fade-in'
                  data-aos-delay='500'
                ></li>
                <li
                  id='goldLevel'
                  data-aos='fade-in'
                  data-aos-delay='1000'
                ></li>
                <li id='diaLevel' data-aos='fade-in' data-aos-delay='1500'></li>
              </ul>
            </Levelup>
          </LevelWrap>
        </Section2Li>
      </Section2Box>
    </SectionWrap>
  );
}

export default LandingSec2;
