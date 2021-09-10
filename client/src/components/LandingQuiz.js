// 랜딩페이지에서 맛보기로 제공될 퀴즈
import styled from 'styled-components';

const LandingQuizWrap = styled.div`
  width: 100%; // 콘텐츠 전체 길이 생각해서 후에 수정해주기
  border: 1px solid red;
  box-sizing: border-box;
`;

function LandingQuiz() {
  return <LandingQuizWrap>this is LandingQuiz</LandingQuizWrap>;
}

export default LandingQuiz;
