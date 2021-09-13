import styled from 'styled-components';
import '../App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
  @media screen and (min-width: 480px) and (max-width: 1249px) {
    margin-top: 300px;
  }
  @media screen and (max-width: 479px) {
    margin-top: 300px;
  }
`;

const DescriptWrap = styled.div`
  width: 70%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  > #descbox2 {
    text-align: right;
    > .buttonWrap {
      justify-content: flex-end;
    }
  }
`;

const DescripTextBox = styled.div`
  width: 450px;
  height: 50%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  > .buttonWrap {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    > button {
      border-radius: 60px;
      background-color: transparent;
      border: 2px solid #fff;
      color: #fff;
      transition: 0.3s;
      cursor: pointer;
    }
    > button:hover {
      background-color: #fff;
      color: #230638;
      border: 2px solid #fff;
    }
    @media screen and (min-width: 1250px) {
      > button {
        width: 240px;
        height: 60px;
        font-size: 18px;
      }
    }
    @media screen and (min-width: 480px) and (max-width: 1249px) {
      > button {
        width: 200px;
        height: 50px;
        font-size: 15px;
      }
    }
    @media screen and (max-width: 479px) {
      > button {
        width: 160px;
        height: 40px;
        font-size: 12px;
      }
    }
  }
`;

const DescripText = styled.div`
  width: 100%;
  margin: 0 auto;
  flex: 1 1 auto;
  @media screen and (min-width: 1250px) {
    > h3 {
      font-size: 45px;
      color: #fff;
      padding: 40px 0;
      line-height: 60px;
    }
    > p {
      font-size: 35px;
      line-height: 50px;
      color: #fff;
    }
  }
  @media screen and (min-width: 480px) and (max-width: 1249px) {
    > h3 {
      font-size: 40px;
      line-height: 50px;
      padding: 40px 0;
      color: #fff;
    }
    > p {
      font-size: 30px;
      line-height: 45px;
      color: #fff;
    }
  }
  @media screen and (max-width: 479px) {
    > h3 {
      font-size: 28px;
      line-height: 38px;
      padding: 30px 0;
      color: #fff;
    }
    > p {
      font-size: 23px;
      line-height: 35px;
      color: #fff;
    }
  }
`;

const DescriptGif = styled.div`
  width: 500px;
  height: 50%;
  flex: 1 1 auto;
  background-color: #fff;
  border-radius: 40px;
  margin-top: 50px;
  @media screen and (min-width: 480px) and (max-width: 1249px) {
    height: 400px;
  }
`;

const Levelup = styled.div`
  width: 80%;
  height: 60%;
  background-color: white;
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
                  다양한 줄임말의 뜻을 <br /> 검색해보자!
                </h3>
                <p>
                  가나다라마바사아
                  <br />
                  가나다라마바사
                  <br />
                  가나다라마바사아자
                </p>
              </DescripText>
              <div className='buttonWrap'>
                <button>바로가기</button>
              </div>
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
          <DescriptWrap>
            <DescriptGif />
            <DescripTextBox id='descbox2'>
              <DescripText>
                <h3>
                  다양한 줄임말의 뜻을 <br /> 검색해보자!
                </h3>
                <p>
                  가나다라마바사아
                  <br />
                  가나다라마바사
                  <br />
                  가나다라마바사아자
                </p>
              </DescripText>
              <div className='buttonWrap'>
                <button>바로가기</button>
              </div>
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
                  다양한 줄임말의 뜻을 <br /> 검색해보자!
                </h3>
                <p>
                  가나다라마바사아
                  <br />
                  가나다라마바사
                  <br />
                  가나다라마바사아자
                </p>
              </DescripText>
              <div className='buttonWrap'>
                <button>바로가기</button>
              </div>
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
          <DescriptWrap>
            <Levelup></Levelup>
          </DescriptWrap>
        </Section2Li>
      </Section2Box>
    </SectionWrap>
  );
}

export default LandingSec2;
