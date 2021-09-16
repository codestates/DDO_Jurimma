import styled from 'styled-components';
import LandingSec1 from '../components/LandingSec1';
import LandingSec2 from '../components/LandingSec2';
import LandingQuiz from '../components/LandingQuiz';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const LandingPageWrap = styled.div`
  height: 100%; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  box-sizing: border-box;
  background-repeat: no-repeat;
`;

function LandingPage() {
  useEffect(() => {
    let timer = function () {
      console.log('작동중!');
    };
    clearInterval(timer);
  }, []);

  return (
    <>
      <LandingPageWrap>
        <LandingSec1 />
        <LandingSec2 />
        <LandingQuiz />
      </LandingPageWrap>
    </>
  );
}

export default LandingPage;
