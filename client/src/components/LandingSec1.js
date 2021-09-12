import styled, { keyframes } from 'styled-components';
import '../App.css';
import TypingEffect from 'react-typing-effect';

const SectionWrap = styled.div`
  width: 100%;
  height: 100vh;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const typing = keyframes`
    from { width: 0 }
    to { width: 100% }
`;

const blinkCaret = keyframes`
    from, to { border-color: transparent }
    50% { border-color: #230638 }
`;

const IntroMessageBox = styled.div`
  width: max(55vw, 300px);
  height: max(25vw, 300px);
  > h1 {
    margin-top: 50px;
    font-size: max(9vw, 50px);
    text-align: center;
    color: #fff;
  }
  > #introWrap {
    display: flex;
    justify-content: center;
    height: max(5vw, 50px);
    font-size: max(2.8vw, 15px);
    font-family: 'NEXON Lv2 Gothic';
    border-radius: 50px;
    background-color: #fff;
    margin-top: 25px;
    > #intro {
      display: flex;
      align-items: center;
    }
    > #intro p {
      color: #230638;
      line-height: max(3vw, 30px);
      font-family: monospace;
      height: max(3vw, 30px);
      overflow: hidden;
      border-right: 0.15em solid orange;
      white-space: nowrap;
      margin: 0 auto;
      letter-spacing: 0.16em;
      text-align: center;
      animation: ${typing} 3s steps(21), ${blinkCaret} 0.5s step-end infinite;
    }
  }
`;

// > div {
//     width: 100%;
//     height: max(5vw, 50px);
//     margin: 0 auto;
//     background-color: white;
//     margin-top: 25px;
//     border-radius: 100px;
//     line-height: max(5vw, 50px);
//     font-size: max(2.8vw, 20px);
//     font-family: 'NEXON Lv2 Gothic';
//   }

function LandingSec1() {
  return (
    <SectionWrap>
      <IntroMessageBox>
        <h1>JURIMMA</h1>
        <div id='introWrap'>
          <div id='intro'>
            <p>세상의 모든 줄임말을 담다.</p>
          </div>
        </div>
      </IntroMessageBox>
    </SectionWrap>
  );
}

export default LandingSec1;
