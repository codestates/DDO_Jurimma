import styled from 'styled-components';
import LandingQuiz from '../components/LandingQuiz';

const LandingPageWrap = styled.div`
  height: 3000px; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  border: 1px solid red;
  box-sizing: border-box;
  margin-top: 80px;
  background-image: linear-gradient(#5f1f86, #230638, #000000);
  background-repeat: no-repeat;
`;

function LandingPage() {
  return (
    <LandingPageWrap>
      this is landing page
      <LandingQuiz />
    </LandingPageWrap>
  );
}

export default LandingPage;
